type CooperationMode = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
};

type CooperationModesProps = {
  modes: CooperationMode[];
};

const CooperationModes = ({ modes }: CooperationModesProps) => {
  return (
    <section className="py-14 md:py-20">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className="flex flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-gray-dark dark:shadow-none"
            >
              <div className="mb-4">
                <h3 className="mb-2 text-3xl font-bold text-black dark:text-white">
                  {mode.title}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {mode.subtitle}
                </p>
              </div>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                {mode.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CooperationModes;
