import { json } from "@remix-run/node";
import EmailService from "~/services/email.server";
import SupabaseService from "~/services/supabase.server";

const supabaseClient = SupabaseService.getClient();

export const action = async ({ request }) => {
  const data = await request.json();

  console.log(data);

  const { slug, value } = data;

  if(!slug || !value) {
    return json({ data });
  }

  // Save to DB.
  await supabaseClient
    .from("feedback_interactions")
    .insert([{ slug, value, environment: process.env.NODE_ENV }]);

  const feedbackType = value ? "POSITIVE" : "NEGATIVE";

  await EmailService.transport({
    to: process.env.EMAIL_ADDRESS,
    from: process.env.EMAIL_ADDRESS,
    subject: `You've Got ${feedbackType} Blog Feedback!`,
    text: `Here's the post: https://macarthur.me/posts/${slug}`,
  });

  return json({ data });
};
