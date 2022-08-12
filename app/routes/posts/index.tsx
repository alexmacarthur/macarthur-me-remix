import { TypedResponse } from "@remix-run/node";
import PostList from "~/components/PostList";
import usePaginatedPosts, {
  PaginatedLoaderProps,
} from "~/hooks/usePaginatedPosts";

export const loader = async ({
  params,
}): Promise<TypedResponse<PaginatedLoaderProps>> => {
  return usePaginatedPosts({ params: { ...params, pageNumber: 1 } });
};

export default PostList;
