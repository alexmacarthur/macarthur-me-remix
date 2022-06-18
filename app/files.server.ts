import glob from "glob";

export const findFiles = (slug = "*"): string[] => {
  return glob.sync(`${__dirname}/../app/posts/**/${slug}`);
};
