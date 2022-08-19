import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Counter from "~/components/Counter";
import ExternalIcon from "~/components/IconExternal";
import PageLayout from "~/components/PageLayout";
import Title from "~/components/Title";
import AnalyticsService from "~/services/analytics/index.server";
import GitHubService from "~/services/github.server";
import GoogleSearchService from "~/services/google-search.server";
import NpmService from "~/services/npm.server";
import StravaService from "~/services/strava.server";
import SupabaseService from "~/services/supabase.server";
import TwitterService from "~/services/twitter.server";
import WordPressService from "~/services/wordpress.server";

export const loader = async () => {
  type State = {
    title: string;
    link?: string;
    subtitle: string;
    value: any;
  };

  const stats: State[] = [
    {
      title: "Total GitHub Stars",
      link: "https://github.com/alexmacarthur",
      subtitle: "If you haven't starred my repos, get on that.",
      value: GitHubService.getTotalsStars(),
    },
    {
      title: "Total GitHub Followers",
      link: "https://github.com/alexmacarthur",
      subtitle: "Do it yourself today, for free.",
      value: GitHubService.getFollowerCount(),
    },
    {
      title: "Total Twitter Followers",
      link: "https://twitter.com/amacarthur",
      subtitle: "Go ahead, follow me.",
      value: TwitterService.getFollowerCount(),
    },
    {
      title: "Total Website Views",
      subtitle: "Since November, 2015.",
      value: AnalyticsService.getTotalViews(),
    },
    {
      title: "Positive Feedback (👍) on Blog Posts",
      subtitle: "Scroll to the bottom of any post and do it yourself.",
      value: SupabaseService.getPositiveFeedbackCount(),
    },
    {
      title: "Links in <em>JavaScript Weekly</em>",
      link: "https://www.google.com/search?q=site%3Ajavascriptweekly.com+%22alex+macarthur%22",
      subtitle: "Mostly just blog posts, but the occassional project too.",
      value: GoogleSearchService.getJsWeeklyTotalResults(),
    },
    {
      title: "Articles Published on <em>CSS Tricks</em>",
      link: "https://css-tricks.com/author/alexmacarthur",
      subtitle: "A fun privilege.",
      value: Promise.resolve(3),
    },
    {
      title: "Total Miles Run",
      link: "https://www.strava.com/athletes/27922666",
      subtitle: "As tracked by Strava since October, 2016.",
      value: StravaService.getTotalMilesRun(),
    },
    {
      title: "Total npm Downloads",
      link: "https://www.npmjs.com/~alexmacarthur",
      subtitle: "Mainly random open source JavaScript packages.",
      value: NpmService.getTotalDownloads(),
    },
    {
      title: "Total WordPress Plugin Downloads",
      link: "https://github.com/alexmacarthur",
      subtitle: "Not a huge focus anymore, but still worth bragging about.",
      value: WordPressService.getPluginDownloadCount(),
    },
    {
      title: "How Many Inches Tall I've Grown",
      subtitle: "Expecting a growth spurt any day now.",
      value: Promise.resolve(68),
    },
    {
      title: "Enneagram Number",
      subtitle: "Probs obvious given that I have a personal dashboard.",
      value: Promise.resolve(3),
    },
  ];

  await Promise.allSettled(stats.map((stat) => stat.value));

  for (let stat of stats) {
    let result;

    try {
      result = await stat.value;

      if (!result) {
        console.log(
          `DASHBOARD - Stat value was empty: ${stat.title}, ${result}`
        );
      }

      stat.value = Number(result).toLocaleString();
    } catch (e) {
      console.log(
        `DASHBOARD - Could not get stat value: ${stat.title}, ${result}`
      );
      stat.value = "";
    }
  }

  return json({
    stats: stats.filter((s) => {
      return !!s.value;
    }),
  });
};

export default () => {
  const { stats } = useLoaderData();

  return (
    <PageLayout narrow={true}>
      <Title
        subtitle="The vanity metrics that mean the most to me.
"
      >
        Dashboard
      </Title>

      <div className="post-content prose mx-auto mb-12 max-w-none md:prose-lg">
        <p>
          Most of these statistics are sourced from third-party APIs. I'm not
          some lunatic who'd do this manually.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {stats.map((stat) => {
          return (
            <li key={stat.title}>
              <div className="flex items-center">
                <h2 dangerouslySetInnerHTML={{ __html: stat.title }}></h2>

                {stat.link && (
                  <a href={stat.link} target="_blank">
                    <ExternalIcon />
                  </a>
                )}
              </div>
              <span className="mb-3 block text-sm italic text-gray-500">
                {stat.subtitle}
              </span>
              <Counter
                value={stat.value}
                waitUntilVisible={false}
                showNumberBeforeMount={false}
                classes="text-4xl md:text-5xl font-black"
              />
            </li>
          );
        })}
      </ul>
    </PageLayout>
  );
};
