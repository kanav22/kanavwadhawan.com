import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/container"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"

export const metadata: Metadata = generatePageMetadata({
  title: "Manifesto",
  description: `Technical manifesto by ${profile.name}: architecture blueprints, performance scorecards, leadership force multiplier, and fintech security.`,
  path: "/manifesto",
})

export default function ManifestoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="border-b border-border/40 bg-background/80 py-4 sm:py-5">
        <Container>
          <Link
            href="/manifesto"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm min-h-[44px] flex items-center w-fit"
          >
            Manifesto
          </Link>
        </Container>
      </header>
      <div className="min-w-0 overflow-x-hidden">{children}</div>
    </>
  )
}
