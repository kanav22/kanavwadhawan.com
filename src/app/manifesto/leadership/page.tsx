import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/container"
import { Timeline } from "@/components/manifesto/Timeline"
import { leadershipTimeline } from "@/data/leadership"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"

export const metadata: Metadata = generatePageMetadata({
  title: "Leadership Force Multiplier",
  description: `Timeline of team scaling, mentorship, process innovation, and platform thinking by ${profile.name}. Outcomes and signals of success.`,
  path: "/manifesto/leadership",
})

export default function LeadershipPage() {
  return (
    <main className="py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Leadership Force Multiplier
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Team scaling, mentorship, process innovation, and platform thinking — outcomes and what I did.
            </p>
          </div>
          <Link
            href="/manifesto"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline min-h-[44px] flex items-center w-fit"
          >
            ← Manifesto
          </Link>
        </div>

        <Timeline entries={leadershipTimeline} />
      </Container>
    </main>
  )
}
