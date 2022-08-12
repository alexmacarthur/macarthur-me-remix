import { MetaFunction } from "@remix-run/node";
import { FunctionComponent } from "react";
import Title from "~/components/Title";
import Copy from "./components/Copy";
import PageLayout from "./components/PageLayout";

export default (
  Content,
  attributes
): {
  metaFunction: MetaFunction;
  Component: FunctionComponent;
} => {
  return {
    metaFunction: () => ({
      ...attributes.metaFunction,
      title: `${attributes.title} | Alex MacArthur`,
    }),
    Component: () => {
      return (
        <PageLayout narrow={true}>
          <Title>{attributes.title}</Title>

          <Copy>
            <Content />
          </Copy>
        </PageLayout>
      );
    },
  };
};
