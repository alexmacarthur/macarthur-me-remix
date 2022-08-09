import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CMS from "../../services/cms.server"

export const loader = async ({ params }) => {


  return json({
    posts: await CMS.getPosts()
  })
};

export default () => {
  const { posts } = useLoaderData();

  return (
    <div>
      hello?

      {posts.map(post => {
        return <li>

          { post.title }

        </li>
      })}
    </div>
  )
}
