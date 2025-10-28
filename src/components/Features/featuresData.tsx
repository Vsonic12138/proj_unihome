import type { Dictionary } from "@/i18n/config";
import { Feature } from "@/types/feature";

const PLACEHOLDER_IMAGE = "/images/products/placeholder.svg";

const ensureString = (value: unknown, fallback: string): string => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }
  return fallback;
};

// Create features from highlights data
type FeatureSource = {
  id: number;
 title: string;
 summary: string;
 keywords: string[];
  image?: string;
  imageAlt?: string;
};

const buildFeatures = (dictionary: Dictionary): Feature[] => {
  const highlights = dictionary.features.highlights || [];
  
  return highlights.map((highlight, index) => {
    return {
      id: index + 1,
      title: highlight.title,
      summary: highlight.description,
      keywords: [dictionary.features.title], // Use features title as keyword
      image: PLACEHOLDER_IMAGE,
      imageAlt: highlight.title,
    };
  });
};

export default buildFeatures;
