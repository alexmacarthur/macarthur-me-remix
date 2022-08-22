import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { POSTS_PER_PAGE } from "~/constants";
import { extractUrl, stripMarkdown } from "~/markdown.server";
import { generateExcerpt } from "~/utils";
import StaticAssetService from "./staticAsset.server";

interface MdBlock {
  type: string;
  parent: string;
  children: MdBlock[];
}

class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getSingleBlogPost(slug: string): Promise<{
    post: BlogPost;
    markdown: string;
  }> {
    let post;

    const database = process.env.NOTION_DATABASE_ID ?? "";

    const response = await this.client.databases.query({
      database_id: database,
      page_size: 1,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    if (!response.results[0]) {
      throw "Post not found!";
    }

    const page = response.results[0];
    post = await this.pageToPostTransformer(page);

    return {
      post,
      markdown: await this.getMarkdown(page.id),
    };
  }

  async getMarkdown(pageId: string) {
    let mdBlocks = (await this.n2m.pageToMarkdown(
      pageId
    )) as unknown as MdBlock[];

    mdBlocks = await this.uploadImages(mdBlocks);

    return this.n2m.toMarkdownString(mdBlocks as any);
  }

  async uploadImages(mdBlocks: MdBlock[]): Promise<MdBlock[]> {
    let uploadPromises: Promise<any>[] = [];
    let updatedBlocks = mdBlocks.map((block) => {
      if (block.type === "image") {
        let url = extractUrl(block.parent);

        if (!url) return block;

        let key = this.extractKey(url);

        // if (process.env.NODE_ENV === "production") {
        uploadPromises.push(StaticAssetService.put(url, key));

        block.parent = block.parent.replace(
          /!\[(.*?)\]\((.*)\)/,
          `![$1](${process.env.SITE_URL}/proxied-image/${key})`
        );
        // }
      }

      return block;
    });

    await Promise.all(uploadPromises);

    return updatedBlocks;
  }

  async getPublishedBlogPosts(start_cursor?: string): Promise<{
    posts: BlogPost[];
    nextCursor: string | null;
    hasMore;
  }> {
    const database = process.env.NOTION_DATABASE_ID ?? "";

    const response = await this.client.databases.query({
      database_id: database,
      page_size: POSTS_PER_PAGE,
      start_cursor: start_cursor || undefined,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const { next_cursor, has_more } = response;
    const posts = await Promise.all(
      response.results.map((res) => this.pageToPostTransformer(res))
    );

    return {
      posts,
      nextCursor: next_cursor,
      hasMore: has_more,
    };
  }

  private extractKey(imageUrl: string): string {
    const url = new URL(imageUrl);
    const parts = url.pathname.split("/");

    // The unique ID in the URL of a Notion image URL, right before the file name.
    // Example: a68eaeba-1926-4e41-83db-bc2ea878bc8f
    return parts[parts.length - 2];
  }

  private async pageToPostTransformer(page: any): Promise<BlogPost> {
    let cover = page.cover;

    switch (cover?.type) {
      case "file":
        cover = page.cover.file;
        break;
      case "external":
        cover = page.cover.external.url;
        break;
      default:
        cover = "";
    }

    const properties: NotionProperties = {
      title: {
        property: page.properties.Name,
        type: "title",
      },
      date: {
        property: page.properties.Date,
        type: "date",
      },
      lastUpdated: {
        property: page.properties["Last Updated"],
        type: "date",
      },
      externalUrl: {
        property: page.properties["External URL"],
        type: "rich_text",
      },
      subtitle: {
        property: page.properties["Subtitle"],
        type: "rich_text",
      },
      slug: {
        property: page.properties.Slug,
        type: "rich_text",
      },
    };

    const postProperties = {
      title: "",
      date: "",
      lastUpdate: "",
      externalUr: "",
      slug: "",
    };

    const promises = Object.entries(properties).map(async ([name, value]) => {
      const { property, type } = value;

      return new Promise(async (resolve): Promise<any> => {
        const response = await this.client.pages.properties.retrieve({
          page_id: page.id,
          property_id: property.id,
        });

        if (response.type === "date") {
          postProperties[name] = response.date?.start;
          return resolve(properties[name]);
        }

        const result = response["results"][0];
        postProperties[name] = result?.[type]?.plain_text;
        return resolve(postProperties[name]);
      });
    });

    await Promise.all(promises);

    const markdown = await this.getMarkdown(page.id);

    return {
      id: page.id,
      excerpt: "",
      markdown,
      views: "",
      description: generateExcerpt(markdown),
      openGraphImage: cover,
      ...postProperties,
    };
  }
}

export default NotionService;
