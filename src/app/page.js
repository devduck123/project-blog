import React from "react";

import { BLOG_TITLE } from "../constants";
import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";

import { getBlogPostList } from "../helpers/file-helpers";

export const metadata = {
  title: BLOG_TITLE,
  name: "description",
  content: "A wonderful blog about JavaScript",
};

async function Home() {
  const blogPosts = await getBlogPostList();
  const blogPostsElements =
    blogPosts.length > 0 &&
    blogPosts.map((blogPost) => (
      <BlogSummaryCard
        key={crypto.randomUUID()}
        slug={blogPost.slug}
        title={blogPost.title}
        abstract={blogPost.abstract}
        publishedOn={blogPost.publishedOn}
      />
    ));

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {blogPostsElements}
    </div>
  );
}

export default Home;
