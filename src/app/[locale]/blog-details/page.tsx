import BlogDetailsContent from "@/app/blog-details/BlogDetailsContent";
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

  return {
    title: `${article.title} | Startup`,
    description: article.intro,
  };
}

const BlogDetailsPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <BlogDetailsContent
      article={dictionary.blogDetailPage.article}
      labels={dictionary.blog.labels}
      shareLabel={dictionary.common.aria.sharePost}
    />
  );
};

export default BlogDetailsPage;
