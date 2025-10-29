import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";

type PageIntroProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

const PageIntro = ({
  title,
  description,
  children,
}: PageIntroProps) => {
  return (
    <>
      <Breadcrumb
        pageName={title}
        description={description}
      />
      {children ? (
        <section className="py-14 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-base leading-relaxed text-body-color dark:text-white/70">
              {children}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default PageIntro;
