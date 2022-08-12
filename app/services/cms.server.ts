import NotionService from "./notion.server";
import chunk from "lodash.chunk";
import { POSTS_PER_PAGE } from "~/constants";
class CMS {
  provider;

  constructor() {
    this.provider = new NotionService();
  }

  async getPosts(pageNumber: number = 2): Promise<{
    posts: BlogPost[];
    hasMore: boolean;
    hasPrevious: boolean;
  }> {
    let allPosts = [];
    let nextCursor;
    let hasMore = false;

    for (let i = 0; i < pageNumber; i++) {
      let {
        posts,
        nextCursor: next_cursor,
        hasMore: has_more,
      } = await this.provider.getPublishedBlogPosts(nextCursor);

      allPosts = allPosts.concat(posts);
      nextCursor = next_cursor;
      hasMore = has_more;

      // Don't bother trying to query the next page if there's nothing there.
      if (!hasMore) {
        break;
      }
    }

    let chunks = chunk(allPosts, POSTS_PER_PAGE);
    let chunkIndex = pageNumber - 1;

    return {
      posts: chunks[chunkIndex] ?? chunks.flat(),
      hasMore,
      hasPrevious: pageNumber > 1,
    };
  }

  getPost(slug: string) {
    return this.provider.getSingleBlogPost(slug);
  }
}

export default new CMS();
