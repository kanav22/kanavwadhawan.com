import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata({
  title: "Engineering Notes",
  description: "Practical notes on mobile architecture, fintech reliability, performance culture, and engineering leadership.",
  path: "/notes",
  image: "/notes/opengraph-image",
})

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
