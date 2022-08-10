import { json, TypedResponse } from "@remix-run/node";
import CMS from "../services/cms.server"

export interface LoaderProps extends PaginationProps {
  posts: BlogPost[]
}

export default async ({ params }): Promise<TypedResponse<LoaderProps>> => {
  const pageNumber = Number(params.pageNumber);
  const { posts, hasMore, hasPrevious } = await CMS.getPosts(pageNumber);

  return json({
    posts,
    hasMore,
    hasPrevious,
    currentPage: pageNumber,
    nextPage: pageNumber + 1,
    previousPage: pageNumber - 1
   });
};
