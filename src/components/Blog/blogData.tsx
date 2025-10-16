import type { Dictionary } from "@/i18n/config";
import { Blog } from "@/types/blog";

const buildBlogData = (
  posts: Dictionary["blog"]["posts"],
): Blog[] => {
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    paragraph: post.paragraph,
    image: post.image,
    author: {
      name: post.author.name,
      image: post.author.image,
      designation: post.author.designation,
    },
    tags: post.tags,
    publishDate: post.publishDate,
  }));
};

export default buildBlogData;
