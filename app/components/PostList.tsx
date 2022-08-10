import { useLoaderData } from "@remix-run/react";
import Pagination from "./Pagination";

export default () => {
  const { posts, hasMore, previousPage, nextPage, currentPage, hasPrevious } = useLoaderData();

  return (
    <div>
    <ul>

      {posts.map(post => {
        return <li key={post.slug}>
          { post.title }
        </li>
      })}
    </ul>

    <Pagination
      hasMore={hasMore}
      hasPrevious={hasPrevious}
      nextPage={nextPage}
      previousPage={previousPage}
      currentPage={currentPage}
     />
    </div>
  )
}
