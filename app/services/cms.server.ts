import NotionService from "./notion.server";
import chunk from "lodash.chunk";
import { POSTS_PER_PAGE } from "~/constants";
import AnalyticsService from "./analytics/index.server";
class CMS {
  provider: NotionService;
  analyticsService;

  constructor() {
    this.provider = new NotionService();
    this.analyticsService = new AnalyticsService();
  }

  async getPosts(pageNumber: number = 2): Promise<{
    posts: BlogPost[];
    hasMore: boolean;
    hasPrevious: boolean;
  }> {
    let allPosts: BlogPost[] = [];
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
    let posts = await Promise.all(
      (chunks[chunkIndex] ?? chunks.flat()).map(async (p) => {
        p.views = await this.analyticsService.getTotalPostViews(p.slug);

        return p;
      })
    );

    return {
      posts,
      hasMore,
      hasPrevious: pageNumber > 1,
    };
  }

  async getPost(slug: string) {
    const post = await this.provider.getSingleBlogPost(slug);

    post.post.views = await this.analyticsService.getTotalPostViews(
      post.post.slug
    );

    return post;
  }
}

export default new CMS();
