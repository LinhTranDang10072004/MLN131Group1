"use client";

import { useState } from "react";

export default function SmartImage({
  src,
  alt,
  className = "",
  position,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  /** CSS object-position, e.g. "60% 50%" */
  position?: string;
  /** Load immediately (use for above-the-fold images) */
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`overflow-hidden bg-paper-deep ${className}`}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          style={position ? { objectPosition: position } : undefined}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
        />
      )}
    </div>
  );
}
