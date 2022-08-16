import { MetaFunction } from "@remix-run/node";
import { FunctionComponent, ReactNode } from "react";
import Title from "~/components/Title";
import Copy from "./components/Copy";
import PageLayout from "./components/PageLayout";

export default (
  Content,
  attributes
): {
  metaFunction: MetaFunction;
  Component: FunctionComponent<{ children?: ReactNode[] | ReactNode }>;
} => {
  return {
    metaFunction: () => ({
      ...attributes.metaFunction,
      title: `${attributes.title} | Alex MacArthur`,
    }),
    Component: ({ children = null }) => {
      return (
        <PageLayout narrow={true}>
          <Title>{attributes.title}</Title>

          <Copy>
            <Content />
          </Copy>

          {children}
        </PageLayout>
      );
    },
  };
};
