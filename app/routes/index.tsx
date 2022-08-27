// import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import DateFormatter from "~/components/DateFormatter";
import PageLayout from "~/components/PageLayout";
import SocialLinks from "~/components/SocialLinks";
import ViewCount from "~/components/ViewCount";
import CMS from "~/services/cms.server";
import Logo from "../components/Logo";

export const loader = async () => {
  const featuredPosts = await Promise.all(
    [
      "when-dom-updates-appear-to-be-asynchronous",
      "use-web-workers-for-your-event-listeners",
      "when-a-weakmap-came-in-handy",
    ].map((slug) => CMS.getPost(slug))
  );

  return json({
    featuredPosts: featuredPosts.map((post) => {
      const { title, views, date, slug, prettyDate } = post.post;

      return { title, views, date, prettyDate, slug };
    }),
  });
};

export default function Index() {
  const { featuredPosts } = useLoaderData();

  return (
    <PageLayout>
      <main className="flex justify-center p-4 md:p-6">
        <div className="text-white">
          <div className="mb-4 flex max-w-5xl flex-col justify-center pt-12 pb-8 lg:pt-20 lg:pb-10">
            <h1 className="text-4xl font-semibold md:text-6xl lg:text-8xl">
              <Logo>I'm Alex MacArthur.</Logo>
            </h1>
            <span className="text-base">
              A web developer who's prone to solving problems with JavaScript,
              PHP, and Ruby.
            </span>
            <div className="mt-4 mb-20">
              <SocialLinks />
            </div>
          </div>

          <div className="mb-10 max-w-5xl">
            <h2 className="mb-6 text-2xl font-bold">Featured Blog Posts</h2>

            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredPosts.map((post) => {
                const { title, views, date, slug, prettyDate } = post;
                const postPath = `/posts/${slug}`;

                return (
                  <li
                    className="flex h-full flex-col rounded-md border-4 border-gray-800 p-4 hover:border-purple-500 md:p-8"
                    key={slug}
                  >
                    <div className="mb-8">
                      <h3 className="mb-2 text-xl font-semibold">
                        <Link to={postPath} prefetch="intent">
                          {title}
                        </Link>
                      </h3>
                      <DateFormatter prettyDate={prettyDate} date={date} />
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <Button
                        naked={true}
                        small={true}
                        to={postPath}
                        internal={true}
                      >
                        Read It
                      </Button>

                      <ViewCount count={views} disableAnimation={true} />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex justify-end">
              <Button
                naked={true}
                small={true}
                to="/posts"
                internal={true}
                inheritColor={true}
              >
                View All
              </Button>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
