import { ImageResponse } from "next/og"
import { getNoteBySlug } from "@/data/notes"

export const alt = "Engineering Note"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const note = getNoteBySlug(slug)

  if (!note) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#737373",
            fontSize: 24,
          }}
        >
          Engineering Notes
        </div>
      ),
      { ...size }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 100%)",
          padding: 48,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#737373",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Engineering Notes
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.2,
            maxWidth: 1000,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {note.title}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#a3a3a3",
            marginTop: 20,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {note.excerpt.length > 120 ? `${note.excerpt.slice(0, 120)}…` : note.excerpt}
        </div>
      </div>
    ),
    { ...size }
  )
}
