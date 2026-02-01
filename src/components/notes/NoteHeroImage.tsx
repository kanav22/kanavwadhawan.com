"use client"

import { getNoteHeroDataUrl } from "@/lib/note-hero-inline"
import { SafeImage } from "@/components/ui/safe-image"

type NoteHeroImageProps = {
  src: string
  alt?: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Renders note hero images. Uses inline data URL for known note heroes so they
 * always load without any network request; falls back to SafeImage otherwise.
 */
export function NoteHeroImage({
  src,
  alt = "",
  fill = false,
  className = "",
  sizes,
  priority,
}: NoteHeroImageProps) {
  const dataUrl = getNoteHeroDataUrl(src)

  if (dataUrl) {
    return (
      <img
        src={dataUrl}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        style={
          fill
            ? {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }
            : undefined
        }
      />
    )
  }

  return (
    <SafeImage
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  )
}
