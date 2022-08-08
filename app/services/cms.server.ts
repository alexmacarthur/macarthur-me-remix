import NotionService from "./notion.server";

class CMS {
  provider;

  constructor() {
    this.provider = new NotionService();
  }

  getPosts() {
    return this.provider.getSingleBlogPost("test-post");
  }

  getPost(slug: string) {
    return this.provider.getSingleBlogPost(slug);
  }
}

export default new CMS();
