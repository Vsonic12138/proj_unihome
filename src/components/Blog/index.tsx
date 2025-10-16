import type { Dictionary, Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import buildBlogData from "./blogData";

type BlogSectionProps = {
  copy: Dictionary["blog"];
  labels: Dictionary["blog"]["labels"];
  locale: Locale;
};

const Blog = ({ copy, labels, locale }: BlogSectionProps) => {
  const posts = buildBlogData(copy.posts);
  const blogDetailHref = withLocalePath(locale, "/blog-details");

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title={copy.title}
          paragraph={copy.paragraph}
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {posts.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog
                blog={blog}
                labels={labels}
                detailHref={blogDetailHref}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
