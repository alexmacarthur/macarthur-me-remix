interface Redirect {
  source: string,
  destination: string,
  status: number
};

const REDIRECTS: Redirect[] = [
  {
    source: "/typeit",
    destination: "https://typeitjs.com",
    status: 301,
  },
  {
    source: "/posts/lazy-load-images-in-wordpress-without-a-plugin",
    destination:
      "/posts/build-your-own-simple-lazy-loading-functionality-in-wordpress",
    status: 301,
  },
  {
    source: "/posts/when-a-map-came-in-handy",
    destination: "/posts/when-a-weakmap-came-in-handy",
    status: 301,
  },
  {
    source: "/bell",
    destination: "https://alexmacarthur.github.io/bell",
    status: 301,
  },
  {
    source:
      "/posts/cleaning-up-redux-store-listeners-when-component-state-updates",
    destination:
      "/posts/clean-up-your-redux-store-listeners-when-component-state-updates",
    status: 301,
  },
  {
    source: "/posts/blog-for-your-own-sake",
    destination: "https://www.ramseyinhouse.com/blog/as-an-engineer-write",
    status: 301,
  },
  {
    source: "/jh",
    destination:
      "https://www.gofundme.com/f/support-the-lindstrom-family-until-jonathans-home",
    status: 302,
  },
  {
    source: "/d4d",
    destination: "https://codesandbox.io/s/dev-for-designers-bare-tvqu2",
    status: 302,
  },
];

export function findRedirect(request: Request): Redirect | undefined {
  const path = new URL(request.url).pathname;

  return REDIRECTS.find(r => r.source === path);
}
