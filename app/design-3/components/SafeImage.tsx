"use client";

import { useState } from "react";
import Image from "next/image";

type SafeImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function SafeImage({ src, alt, sizes, priority = false, className }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 bg-gradient-to-br from-[#00B4A6] via-[#3d5ef0] to-[#6C4CF1]"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className ?? "object-cover"}
      onError={() => setFailed(true)}
      {...(priority ? { priority: true } : { loading: "lazy" as const })}
    />
  );
}
