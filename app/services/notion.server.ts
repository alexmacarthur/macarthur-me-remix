import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { POSTS_PER_PAGE } from "~/constants";

class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getSingleBlogPost(slug: string): Promise<{
    post: BlogPost,
    markdown: string
  }> {
    let post, markdown;

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
    const mdBlocks = await this.n2m.pageToMarkdown(page.id);
    markdown = this.n2m.toMarkdownString(mdBlocks);
    post = await this.pageToPostTransformer(page);

    return {
      post,
      markdown,
    };
  }

  async getPublishedBlogPosts(start_cursor?: string): Promise<{
    posts: BlogPost[],
    next_cursor: string | null
  }> {
    const database = process.env.NOTION_DATABASE_ID ?? "";

    const response = await this.client.databases.query({
      database_id: database,
      page_size: POSTS_PER_PAGE,
      start_cursor,
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

    const { next_cursor } = response;
    const posts = await Promise.all(response.results.map((res) => this.pageToPostTransformer(res)));

    return {
      posts,
      next_cursor,
    }
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
        type: 'title'
      },
      date: {
        property: page.properties.Date,
        type: 'date'
      },
      lastUpdated: {
        property: page.properties['Last Updated'],
        type: 'date',
      },
      externalUrl: {
        property: page.properties['External URL'],
        type: 'rich_text'
      },
      slug: {
        property: page.properties.Slug,
        type: 'rich_text'
      }
    };

    const postProperties = {
      title: "",
      date: "",
      lastUpdate: "",
      externalUr: "",
      slug: ""
    }

    const promises = Object.entries(properties).map(async ([name, value]) => {
      const { property, type } = value;

      return new Promise(async (resolve): Promise<any> => {
        const response = await this.client.pages.properties.retrieve({ page_id: page.id, property_id:  property.id });

        if(response.type === "date") {
          postProperties[name] = response.date?.start;
          return resolve(properties[name]);
        }

        const result = response['results'][0];
        postProperties[name] = result?.[type]?.plain_text;
        return resolve(postProperties[name]);
      });
    });

    await Promise.all(promises);

    return {
      id: page.id,
      openGraphImage: cover,
      ...postProperties
    };
  }
}

export default NotionService;
