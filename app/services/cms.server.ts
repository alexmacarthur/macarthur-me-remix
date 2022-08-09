import NotionService from "./notion.server";
import chunk from 'lodash.chunk';
import { POSTS_PER_PAGE } from "~/constants";
class CMS {
  provider;

  constructor() {
    this.provider = new NotionService();
  }

  async getPosts(pageNumber: number = 2) {
    let allPosts = [];
    let nextCursor;

    for(let i = 0; i < pageNumber; i++) {
      let { posts, next_cursor } = await this.provider.getPublishedBlogPosts(nextCursor);

      allPosts = allPosts.concat(posts);
      nextCursor = next_cursor;
    }

    let chunks = chunk(allPosts, POSTS_PER_PAGE);

    return chunks[pageNumber - 1];
  }

  getPost(slug: string) {
    return this.provider.getSingleBlogPost(slug);
  }
}

export default new CMS();
