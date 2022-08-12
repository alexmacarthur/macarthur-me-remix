import ContentPageLayout from "~/ContentPageLayout";
import Content, { attributes } from "./index.md";

// Pass in the goodies.
const { metaFunction, Component } = ContentPageLayout(Content, attributes);

export const meta = metaFunction;

export default Component;
