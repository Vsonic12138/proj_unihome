import BlogSidebarContent from "@/app/blog-sidebar/BlogSidebarContent";
import { getDictionary, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const article = dictionary.blogDetailPage.article;
  const blogTitle = dictionary.header.menu.blog;

  return {
    title: `${article.title} | ${blogTitle}`,
    description: article.intro,
  };
}

const BlogSidebarPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <BlogSidebarContent
      article={dictionary.blogDetailPage.article}
      labels={dictionary.blog.labels}
      sidebar={dictionary.blogSidebarPage.sidebar}
      shareLabel={dictionary.common.aria.sharePost}
      newsletterCopy={dictionary.contact.newsletter}
    />
  );
};

export default BlogSidebarPage;
