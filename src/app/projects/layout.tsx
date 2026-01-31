import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description: `Explore software engineering projects by ${profile.name}. Mobile apps, SDKs, and technical solutions built with Kotlin, Swift, React Native, and more.`,
  path: "/projects",
})

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
