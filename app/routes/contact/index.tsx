import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import ContactForm from "~/components/ContactForm";
import ContentPageLayout from "~/ContentPageLayout";
import EmailService from "~/services/email.server";
import SupabaseService from "~/services/supabase.server";
import Content, { attributes } from "./copy.md";

// Pass in the goodies.
const { metaFunction, Component } = ContentPageLayout(Content, attributes);

export const meta = metaFunction;

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    await SupabaseService.addContactFormSubmission({
      name: formData.get("name"),
      email_address: formData.get("email"),
      password: formData.get("password"),
      completed_time: formData.get("completion_time"),
      is_trusted: true,
    });

    // It's a bot.
    if (
      !formData.get("completion_time") ||
      formData.get("password").length > 0
    ) {
      return json({ success: true });
    }

    await EmailService.transport({
      replyTo: formData.get("email"),
      subject: "Contact Form Submitted",
      text: `
  Name: ${formData.get("name")}\n
  Email Address: ${formData.get("email")}\n
  Message: ${formData.get("message")}\n
  Completed In: ${formData.get("completion_time")}s
  Password: ${formData.get("password")}
  `,
    });
  } catch (e) {
    return json({ success: false });
  }

  return json({ success: true });
};

export default () => {
  const postData = useActionData();

  return (
    <Component>
      <ContactForm successful={postData?.success ?? null} />
    </Component>
  );
};
