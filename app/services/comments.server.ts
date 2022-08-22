const { fetchByPath } = require("@jam-comments/next");

class CommentsService {
  byPath(slug: string) {
    return fetchByPath({
      domain: process.env.JAM_COMMENTS_DOMAIN,
      apiKey: process.env.JAM_COMMENTS_API_KEY,
      path: `/posts/${slug}`,
    });
  }
}

export default new CommentsService();
