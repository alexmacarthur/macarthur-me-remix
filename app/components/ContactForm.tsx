import { Form, useSubmit, useTransition } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import Button from "./Button";

const getTimeInMilliseconds = (): number => new Date().getTime();

const ContactForm = ({ successful }: { successful: boolean }) => {
  const [message, setMessage] = useState<{ message: string; classes: string }>({
    message: "",
    classes: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const timerRef = useRef<number>();
  const submit = useSubmit();
  const transition = useTransition();
  const getTimerValue = () => timerRef.current as number;
  const getForm = () => formRef.current as HTMLFormElement;
  const setSuccessMessage = () => {
    setMessage({
      message: "You did it! Message submitted.",
      classes: "bg-green-200 text-green-700",
    });
  };

  useEffect(() => {
    if (successful) {
      onSubmitSuccess();
    }
  }, [successful]);

  useEffect(() => {
    // Show message while form is submitting.
    if (transition.state === "submitting") {
      setMessage({
        message: "Submitting...",
        classes: "bg-gray-200 text-gray-700",
      });
    }
  }, [transition]);

  const onSubmitSuccess = () => {
    getForm().reset();

    setSuccessMessage();
  };

  const setStartTime = () => {
    // Don't set it if it's already started to count.
    if (timerRef.current) return;

    timerRef.current = getTimeInMilliseconds();
  };

  const handleSubmit = async (e) => {
    const differenceInSeconds: number =
      (getTimeInMilliseconds() - getTimerValue()) / 1000;

    (
      getForm().querySelector('[name="completion_time"]') as HTMLInputElement
    ).value = String(differenceInSeconds);

    if (differenceInSeconds < 3) {
      onSubmitSuccess();
      return;
    }

    submit(e.currentTarget);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {!!message.message ? (
        <span
          className={`mb-10 block rounded-md px-3 py-2 text-center text-base md:text-xl ${message.classes}`}
        >
          {message.message}
        </span>
      ) : null}

      <Form
        method="post"
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          flex: "1",
        }}
      >
        <input type="hidden" name="completion_time" />

        <p className="password-wrapper mb-4">
          <label className="block">
            Password:
            <br />
            <input
              type="text"
              onFocus={setStartTime}
              name="password"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </p>

        <p className="mb-4">
          <label className="block">
            Your name:
            <br />
            <input required type="text" name="name" onFocus={setStartTime} />
          </label>
        </p>

        <p className="mb-4">
          <label className="block">
            Your email:
            <br />
            <input required type="email" name="email" onFocus={setStartTime} />
          </label>
        </p>

        <p className="mb-4">
          <label className="block">
            Message:
            <br />
            <textarea required name="message" rows={4} onFocus={setStartTime} />
          </label>
        </p>

        <p className="mt-6">
          <button
            type="submit"
            className="button"
            disabled={transition.state === "submitting"}
          >
            Send
          </button>
        </p>
      </Form>
    </div>
  );
};

export default ContactForm;
