"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type SafeProductImageProps = {
  src?: string | null;
  alt?: string;
  fallbackSrc?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

const DEFAULT_FALLBACK_SRC = "/images/products/placeholder.svg";

const SafeProductImage = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  ...rest
}: SafeProductImageProps) => {
  const initialSrc = useMemo(() => {
    const normalized = typeof src === "string" ? src.trim() : "";
    return normalized.length > 0 ? normalized : fallbackSrc;
  }, [src, fallbackSrc]);

  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={typeof alt === "string" ? alt : ""}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
};

export default SafeProductImage;
