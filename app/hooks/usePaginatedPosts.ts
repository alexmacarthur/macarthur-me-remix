import { json, TypedResponse } from "@remix-run/node";
import CMS from "../services/cms.server"

export interface PaginatedLoaderProps extends PaginationProps {
  posts: BlogPost[]
}

export default async ({ params }): Promise<TypedResponse<PaginatedLoaderProps>> => {
  const pageNumber = Number(params.pageNumber);
  const { posts, hasMore, hasPrevious } = await CMS.getPosts(pageNumber);

  return json({
    posts: posts.map(post => {
      if(post.externalUrl) {
        post.externalHost = new URL(post.externalUrl).host
      }

      return post;
    }),
    hasMore,
    hasPrevious,
    currentPage: pageNumber,
    nextPage: pageNumber + 1,
    previousPage: pageNumber - 1
   });
};
