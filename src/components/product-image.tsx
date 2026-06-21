"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image wrapper that degrades to a neutral tile (or nothing) if the remote
 * URL fails to load — so the product grid never shows a broken-image icon even
 * when an Unsplash photo is removed.
 */
export function ProductImage({
  fallbackLabel,
  alt,
  ...props
}: ImageProps & { fallbackLabel?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (!fallbackLabel) return null;
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        <span className="px-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return <Image {...props} alt={alt} onError={() => setFailed(true)} />;
}
