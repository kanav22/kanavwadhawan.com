import { ImageResponse } from "next/og"

/**
 * Serves a generated PNG at /og-notes for use as default OG image for Engineering Notes.
 * Use this URL (e.g. image: "/og-notes") when you want a single shared image for all notes.
 */
export const runtime = "edge"

export async function GET() {
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
            fontSize: 14,
            fontWeight: 600,
            color: "#737373",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Engineering Notes
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          Mobile architecture, fintech reliability, performance culture
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#a3a3a3",
            marginTop: 24,
            maxWidth: 800,
          }}
        >
          Practical notes on system design, security, and engineering leadership.
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
