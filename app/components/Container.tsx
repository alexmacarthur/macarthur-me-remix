import { ReactNode } from "react";

type ContainerProps = {
  children?: ReactNode;
  narrow?: boolean;
  classes?: string;
};

export default function Container({
  children,
  narrow = false,
  classes = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-3 text-xl md:px-5 ${
        narrow ? "max-w-prose" : "max-w-6xl"
      } ${classes}`}
    >
      {children}
    </div>
  );
}
