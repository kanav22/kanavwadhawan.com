"use client"

import Image from "next/image"

type SafeImageProps = {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  unoptimized?: boolean
  /** Optional: force using native img (e.g. for SVG). If not set, SVG src uses img automatically. */
  useImg?: boolean
}

/**
 * Renders SVG sources with native <img> so they always load; other sources use next/image.
 * Fixes broken SVG thumbnails/hero images when Next.js Image optimization fails for SVG.
 */
export function SafeImage({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
  priority,
  loading,
  unoptimized,
  useImg,
}: SafeImageProps) {
  const isSvg = typeof src === "string" && src.endsWith(".svg")
  const useNativeImg = useImg ?? isSvg

  if (useNativeImg) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : loading ?? "lazy"}
        decoding="async"
        className={className}
        style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : undefined}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      loading={loading}
      unoptimized={unoptimized}
    />
  )
}
