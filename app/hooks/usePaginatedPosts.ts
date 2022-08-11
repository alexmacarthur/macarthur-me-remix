import { json, TypedResponse } from "@remix-run/node";
import { stripMarkdown } from "~/markdown.server";
import CMS from "../services/cms.server"

export interface PaginatedLoaderProps extends PaginationProps {
  posts: BlogPost[]
}

const generateExcerpt = (content: string, wordCount = 50) => {
    const strippedContent = stripMarkdown(content)
      .replace(/\s\s+/g, " ")
      .replace(/\r?\n|\r/g, "")
      .replace(/\S+\.(gif|png|jpe?g)/g, ""); // Remove images.
    const words = strippedContent.split(" ");

    return words.slice(0, wordCount).join(" ") + "...";
}

export default async ({ params }): Promise<TypedResponse<PaginatedLoaderProps>> => {
  const pageNumber = Number(params.pageNumber);
  const { posts, hasMore, hasPrevious } = await CMS.getPosts(pageNumber);

  return json({
    posts: posts.map(post => {
      if(post.externalUrl) {
        post.externalHost = new URL(post.externalUrl).host
      }

      post.excerpt = generateExcerpt(post.markdown);

      return post;
    }),
    hasMore,
    hasPrevious,
    currentPage: pageNumber,
    nextPage: pageNumber + 1,
    previousPage: pageNumber - 1
   });
};
