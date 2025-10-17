import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";

type PageIntroProps = {
  title: string;
  description: string;
  homeLabel: string;
  homeHref: string;
  children?: ReactNode;
};

const PageIntro = ({
  title,
  description,
  homeLabel,
  homeHref,
  children,
}: PageIntroProps) => {
  return (
    <>
      <Breadcrumb
        pageName={title}
        description={description}
        homeLabel={homeLabel}
        homeHref={homeHref}
      />
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-body-color dark:text-white/70">
            {children ?? <p>{description}</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default PageIntro;
