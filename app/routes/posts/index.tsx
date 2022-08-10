import { TypedResponse } from "@remix-run/node";
import PostList from "~/components/PostList";
import usePaginatedPosts, { LoaderProps } from "~/hooks/usePaginatedPosts";

export const loader = async ({ params }): Promise<TypedResponse<LoaderProps>> => {
  return usePaginatedPosts({ params: { ...params, pageNumber: 1 }});
}

export default PostList;
