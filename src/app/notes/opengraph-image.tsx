import { ImageResponse } from "next/og"

export const alt = "Engineering Notes — Mobile architecture, fintech reliability, performance"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
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
    { ...size }
  )
}
