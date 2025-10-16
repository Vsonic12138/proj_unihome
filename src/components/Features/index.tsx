import type { Dictionary } from "@/i18n/config";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import buildFeatures from "./featuresData";

type FeaturesProps = {
  copy: Dictionary["features"];
};

const Features = ({ copy }: FeaturesProps) => {
  const featuresData = buildFeatures(copy.items);
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title={copy.title}
            paragraph={copy.paragraph}
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
