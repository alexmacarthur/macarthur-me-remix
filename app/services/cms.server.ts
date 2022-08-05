import { Client } from "@notionhq/client";
import {NotionToMarkdown} from "notion-to-md";

interface BlogPost {

}

interface Post {

}

class NotionService {
  client: Client
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getSingleBlogPost(slug: string): Promise<Post> {
    let post, markdown

    const database = process.env.NOTION_DATABASE_ID ?? '';

    const response = await this.client.databases.query({
        database_id: database,
        filter: {
          property: 'Slug',
          rich_text: {
            equals: slug
          }
        },
        // sorts: [
        //   {
        //     property: 'Updated',
        //     direction: 'descending'
        //   }
        // ]
    });

    console.log(response)

    if (!response.results[0]) {
        throw 'No results available'
    }

    // grab page from notion
    const page = response.results[0];

    const mdBlocks = await this.n2m.pageToMarkdown(page.id)
    markdown = this.n2m.toMarkdownString(mdBlocks);
    post = NotionService.pageToPostTransformer(page);

    return {
        post,
        markdown
    }
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    const database = process.env.NOTION_DATABASE_ID ?? '';

    const response = await this.client.databases.query({
        database_id: database,
        filter: {
            property: 'Published',
            checkbox: {
              equals: true
            }
        },
        // sorts: [
        //     {
        //         property: 'Updated',
        //         direction: 'descending'
        //     }
        // ]
    });

    return response.results.map(res => {
        return NotionService.pageToPostTransformer(res);
    })
  }

    private static pageToPostTransformer(page: any): BlogPost {
      let cover = page.cover;
      switch (cover) {
          case 'file':
              cover = page.cover.file
              break;
          case 'external':
              cover = page.cover.external.url;
              break;
          default:
              cover = ''
      }

      return {
          id: page.id,
          // cover: cover,
          // title: page.properties.Name.title[0].plain_text,
          // tags: page.properties.Tags.multi_select,
          // description: page.properties.Description.rich_text[0].plain_text,
          // date: page.properties.Updated.last_edited_time,
          // slug: page.properties.Slug.formula.string
      }
  }
}

class CMS {
  getPosts() {
    const notionService = new NotionService();

    return notionService.getSingleBlogPost("test-post");
  }
}

export default new CMS();
