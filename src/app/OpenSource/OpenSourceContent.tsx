"use client";

interface OpenSourceContentProps {
  copy: any;
}

const OpenSourceContent = ({ copy }: OpenSourceContentProps) => {
  return (
    <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="container">
        {/* Categories */}
        <div className="space-y-16">
          {copy.categories.map((category) => (
            <div key={category.id}>
              {/* Category Header */}
              <div className="mb-10">
                <h2 className="mb-3 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                  {category.title}
                </h2>
                <p className="text-base text-body-color dark:text-body-color-dark">
                  {category.description}
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.projects.map((project) => (
                  <a
                    key={project.id}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-lg border border-stroke bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card-hover dark:border-stroke-dark dark:bg-bg-color-dark dark:hover:border-primary"
                  >
                    {/* Project Name */}
                    <h3 className="mb-3 text-xl font-semibold text-black transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {project.name}
                    </h3>

                    {/* Project Description */}
                    <p className="mb-4 line-clamp-4 text-sm text-body-color dark:text-body-color-dark">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* External Link Icon */}
                    <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSourceContent;
