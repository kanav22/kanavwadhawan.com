import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/container"
import { MetricCard } from "@/components/manifesto/MetricCard"
import { performanceScorecards, performancePlaybookPrinciples } from "@/data/performance"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"

export const metadata: Metadata = generatePageMetadata({
  title: "Performance Scorecards",
  description: `Benchmark cards and performance playbook by ${profile.name}. Cold start, app size, crash-free users, ANR — with concrete tactics (R8, baseline profiles, lazy init, caching).`,
  path: "/manifesto/performance",
})

export default function PerformancePage() {
  return (
    <main className="py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Performance Scorecards
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Benchmark cards per project and the playbook behind them.
            </p>
          </div>
          <Link
            href="/manifesto"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline min-h-[44px] flex items-center w-fit"
          >
            ← Manifesto
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {performanceScorecards.map((scorecard) => (
            <MetricCard key={scorecard.id} scorecard={scorecard} />
          ))}
        </div>

        <section className="border-t border-border/40 pt-8 sm:pt-10">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Performance Playbook
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Principles I apply to hit and sustain performance targets.
          </p>
          <ul className="mt-4 space-y-2 sm:mt-6">
            {performancePlaybookPrinciples.map((principle, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                {principle}
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </main>
  )
}
