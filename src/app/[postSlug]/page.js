import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { BLOG_TITLE } from "../../constants";
import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { loadBlogPost } from "../../helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";
import CircularColorsDemo from "@/components/CircularColorsDemo";

const DivisonGroupsDemo = React.lazy(() =>
  import("@/components/DivisionGroupsDemo")
);

// Overwrite default pre tag so that we can render a
// code snippet instead using CodeSnippet component.
// Pass this to MDXRemote component as a prop so it
// can use it to overwrite the default pre tag.
const components = {
  pre: ({ children, ...delegated }) => (
    <CodeSnippet {...delegated}>{children}</CodeSnippet>
  ),
  DivisionGroupsDemo: ({ ...delegated }) => (
    <DivisonGroupsDemo {...delegated} />
  ),
  CircularColorsDemo: ({ ...delegated }) => (
    <CircularColorsDemo {...delegated} />
  ),
};

// Cache the loadBlogPost by wrapping with React.cache()
// since using for metadata AND UI
export const getBlogPost = React.cache(async (slug) => {
  return loadBlogPost(slug);
});

export async function generateMetadata({ params }) {
  const { frontmatter } = await getBlogPost(params.postSlug);

  const metadata = {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    name: "description",
    content: frontmatter.abstract,
  };

  return metadata;
}

async function BlogPost({ params }) {
  const postSlug = params.postSlug;
  const { content } = await getBlogPost(postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero title="Example post!" publishedOn={new Date()} />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ ...components }} />
      </div>
    </article>
  );
}

export default BlogPost;
