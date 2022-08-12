import { ReactNode } from "react";

interface CopyProps {
  markup?: string;
  children?: ReactNode[];
}

export default ({ markup = undefined, children = undefined }: CopyProps) => {
  const props = {} as any;

  if (markup) {
    props.dangerouslySetInnerHTML = { __html: markup };
  }

  return (
    <div
      className="post-content prose mx-auto max-w-none md:prose-lg"
      {...props}
    >
      {children}
    </div>
  );
};
