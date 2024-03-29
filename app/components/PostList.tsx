import { Link, useLoaderData } from "@remix-run/react";
import { PaginatedLoaderProps } from "~/hooks/usePaginatedPosts";
import Button from "./Button";
import DateFormatter from "./DateFormatter";
import PageLayout from "./PageLayout";
import Pagination from "./Pagination";
import Title from "./Title";
import ViewCount from "./ViewCount";

export default () => {
  const { posts, hasMore, previousPage, nextPage, currentPage, hasPrevious } =
    useLoaderData<PaginatedLoaderProps>();

  return (
    <PageLayout narrow={true}>
      <Title>Posts</Title>

      <ul className="space-y-10">
        {posts.map((post) => {
          const { externalUrl, externalHost } = post;
          const linkProps = {
            to: externalUrl || `/posts/${post.slug}`,
            target: externalUrl ? "_blank" : "_self",
          };

          return (
            <li key={post.slug}>
              <article>
                <h2 className="text-2xl font-bold">
                  <Link {...linkProps}>{post.title}</Link>
                </h2>

                <div className="mb-3 flex items-center gap-3 text-base">
                  {post.lastUpdated && (
                    <>
                      <DateFormatter
                        date={post.lastUpdated}
                        className="inline-block"
                      >
                        Updated on
                      </DateFormatter>

                      <small>/</small>
                    </>
                  )}

                  <DateFormatter date={post.date} className="inline-block">
                    {post.lastUpdated && "Originally posted on"}
                  </DateFormatter>

                  {!externalUrl && (
                    <ViewCount count={post.views} disableAnimation={true} />
                  )}
                </div>

                <small className="mb-2 block text-gray-500">
                  {post.description}
                </small>

                <Button
                  naked={true}
                  small={true}
                  internal={!externalUrl}
                  {...linkProps}
                >
                  Read It {externalHost && <>({externalHost})</>}
                </Button>
              </article>
            </li>
          );
        })}
      </ul>

      <Pagination
        hasMore={hasMore}
        hasPrevious={hasPrevious}
        nextPage={nextPage}
        previousPage={previousPage}
        currentPage={currentPage}
      />
    </PageLayout>
  );
};
