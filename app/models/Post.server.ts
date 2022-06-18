import glob from "glob";
import matter from "gray-matter";

import fs from "fs";
import { processMarkdown, stripMarkdown } from "~/markdown.server";

interface PostContent {
  content: string,
  excerpt: string,
  title: string,
  lastUpdated: string,
  subTitle: string,
  external: string,
  externalDomain: string,
  ogImage: string
}

class Post {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  getContent(): PostContent {
    const { data, content } = matter(this.getFileContents());
    const excerpt = this.generateExcerpt(content);

    return {
      content: processMarkdown(content, "temp-slug"),
      excerpt,
      title: data.title,
      lastUpdated: data.lastUpdated || "",
      subTitle: data.subTitle || "",
      ogImage: data.ogImage || "",
      external: data.external || "",
      externalDomain: data.external
        ? new URL(data.external).host.replace(/^www\./, "")
        : "",
    };
  }

  private getFileContents() {
    return fs.readFileSync(this.filePath);
  }

  private generateExcerpt(markdown: string) {
    const strippedContent = stripMarkdown(markdown)
      .replace(/\s\s+/g, " ")
      .replace(/\r?\n|\r/g, "")
      .replace(/\S+\.(gif|png|jpe?g)/g, ""); // Remove images.
    const words = strippedContent.split(" ");

    return words.slice(0, 50).join(" ") + "...";
  }
}

export default Post;
