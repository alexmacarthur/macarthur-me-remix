import { useEffect } from "react";

const Feedback = ({ slug }: { slug: string }) => {
  useEffect(() => {
    const handleFeedback = (e) => {
      const {
        detail: { value },
      } = e;

      fetch(`/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, value }),
      });
    };

    document.addEventListener("feedback:interaction", handleFeedback);

    return () => {
      document.removeEventListener("feedback:interaction", handleFeedback);
    };
  }, []);

  return (
    <div className="mt-16">
      <hr className="divider" />

      <div className="flex flex-col items-center justify-center py-14 md:flex-row md:space-x-6">
        <span className="prose block text-center md:text-left">
          {/* @ts-ignore */}
          <feedback-component data-slug={slug}>
            <span slot="cta">Was this post helpful?</span>
            <span slot="confirmation">Thanks for the feedback!</span>
            {/* @ts-ignore */}
          </feedback-component>
        </span>
      </div>

      <hr className="divider" />
    </div>
  );
};

export default Feedback;
