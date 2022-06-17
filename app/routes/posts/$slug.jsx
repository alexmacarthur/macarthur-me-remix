import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import PageLayout from "../../components/PageLayout";

import * as post from "../../../_posts/2022-06-15-maps-store-objects-by-reference.md";

export const loader = async ({params}) => {
  const { slug } = params;

  return json({ post: post });
};

export default () => {
  const data = useLoaderData();

  console.log(data);

  return (
    <PageLayout>
      <>
      post!
      </>
    </PageLayout>
  )
}
