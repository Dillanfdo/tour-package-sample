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
        className="absolute inset-0 bg-gradient-to-br from-[#e7ddd2] via-[#c4a090] to-[#B5543A]"
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
