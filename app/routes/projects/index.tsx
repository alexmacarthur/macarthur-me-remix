import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import PageLayout from "~/components/PageLayout";
import Star from "~/components/Star";
import Title from "~/components/Title";
import GitHubService from "~/services/github.server";

interface SpecialProject {
            name: string,
          subheading: string,
          description: string,
          link: string
}

export const loader = async ({params}) => {
  const ghService = new GitHubService();

  console.log('RIH!!!')
  console.log(await ghService.getRIHRepos())

  return json({
    repos: await ghService.getProjectReposData(),
    specialProjects: [
        {
          name: "TypeIt",
          subheading:
            "The most versatile animated typing utility on the planet.",
          description:
            'The most versatile JavaScript library for creating typewriter effects. It started back in 2015 as a means of learning to write better JavaScript. Since then, it\'s gone through several evolutions is now one of my favorite "small" projects to maintain.',
          link: "https://typeitjs.com",
        },
        {
          name: "JamComments",
          subheading: "A stupid-simple comment service for the Jamstack.",
          description:
            "A stupid-simple comment service built for static site generators like Gatsby, Eleventy, and NextJS. It was built out of dissatisfaction with other solutions that require you to load a bloated, invasive third-party script in order to render comments client-side.",
          link: "https://jamcomments.com",
        },
      ] as SpecialProject[],
  })
}

export default () => {
  const { repos, specialProjects } = useLoaderData();

  return (
    <PageLayout>
      <Title subTitle="Code I Write on the Side">Projects</Title>

      <div className="mb-12">
        <h2 className="text-4xl font-semibold mb-6">Some Special Ones</h2>

        <div className="mb-12">
          <p className="prose md:prose-lg max-w-none">
            I maintain and further develop a couple of projects on a more
            significant basis.
          </p>
        </div>

        <div className="slice mb-20">
          <ul className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {specialProjects.map((project) => {
              const link = project.link || "";

              return (
                <Card
                  key={link}
                  classes={`flex flex-col ${project.blockClasses || ""}`}
                  element="li"
                >
                  <div className="mb-6">
                    <h3 className="font-bold text-3xl mb-2">
                      <a href={link} target="_blank">
                        {project.name}
                      </a>
                    </h3>

                    <small className="prose md:prose-lg max-w-none italic leading-tight">
                      {project.subheading}
                    </small>
                  </div>

                  <div className="mb-8">
                    <p className="prose md:prose-lg max-w-none">
                      {project.description}
                    </p>
                  </div>

                  {link && (
                    <div className="mt-auto">
                      <Button
                        href={link}
                        target="_blank"
                        internal={link.startsWith("/")}
                      >
                        {link.replace(/https:\/\//, "")}
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </ul>
        </div>
      </div>

      <h2 className="text-4xl font-semibold mb-6">Some Open Source Ones</h2>

      <div className="mb-8">
        <p className="prose md:prose-lg max-w-none">
          Aside from those, I've open-sourced a good share of resources via
          GitHub as well. Here are just a few.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {repos.map((repo) => {
          const linkProps = { href: repo.html_url, target: "_blank" };

          return (
            <Card classes="flex flex-col" element="li" key={repo.html_url}>
              <div className="flex justify-between mb-4 gap-2">
                <h3 className="font-bold text-2xl">
                  <a {...linkProps}>{repo.name}</a>
                </h3>

                <div className="">
                  <a
                    className="stargazers inline-flex items-center gap-1 leading-10"
                    {...linkProps}
                  >
                    <Star className="block h-6 w-6" />
                    <span>{repo.stargazers_count}</span>
                  </a>
                </div>
              </div>

              <div className="mb-8">
                <p className="prose md:prose-lg max-w-none">
                  {repo.description}
                </p>
              </div>

              <div className="mt-auto">
                <Button {...linkProps} naked={true}>
                  Learn More
                </Button>
              </div>
            </Card>
          );
        })}
      </ul>
    </PageLayout>
  );
}
