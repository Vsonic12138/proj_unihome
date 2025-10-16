import ArticleContent from "@/components/Blog/ArticleContent";
import type { Dictionary } from "@/i18n/config";

type BlogDetailsContentProps = {
  article: Dictionary["blogDetailPage"]["article"];
  labels: Dictionary["blog"]["labels"];
  shareLabel: string;
};

const BlogDetailsContent = ({
  article,
  labels,
  shareLabel,
}: BlogDetailsContentProps) => {
  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <ArticleContent
              article={article}
              labels={labels}
              shareLabel={shareLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsContent;
