import BlogContent from "@/app/blog/BlogContent";
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
  const pageCopy = dictionary.pages.blog;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const BlogPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <BlogContent
      pageCopy={dictionary.pages.blog}
      blogCopy={dictionary.blog}
      breadcrumbs={dictionary.breadcrumbs}
      locale={locale}
    />
  );
};

export default BlogPage;
