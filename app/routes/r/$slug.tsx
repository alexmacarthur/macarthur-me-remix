import { redirect } from "@remix-run/node"

export const loader = ({ params }) => {
  const { slug } = params;

  return redirect(`https://github.com/alexmacarthur/${slug}`);
}
