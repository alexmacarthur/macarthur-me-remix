import { redirect, TypedResponse } from "@remix-run/node";
import PostList from "~/components/PostList";
import usePaginatedPosts, { LoaderProps } from "~/hooks/usePaginatedPosts";

export const loader = async ({ params }): Promise<TypedResponse<LoaderProps>> => {
  const pageNumber = Number(params.pageNumber);

  if(pageNumber === 1) {
    // For the first page, don't bother showing any pagination.
    return redirect("/posts");
  }

  return usePaginatedPosts({ params });
}

export default PostList;
