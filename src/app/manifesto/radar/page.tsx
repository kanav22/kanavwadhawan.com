import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/container"
import { TechRadar } from "@/components/manifesto/TechRadar"
import { radarItems } from "@/data/radar"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"

export const metadata: Metadata = generatePageMetadata({
  title: "Tech Radar",
  description: `Tech radar by ${profile.name}: Adopt (Compose, Coroutines, Modularization, Baseline Profiles), Trial (Maestro, KMP, Detekt), Assess (on-device ML, AI coding, passkeys), Hold (RxJava, reflection, monolithic modules).`,
  path: "/manifesto/radar",
})

export default function RadarPage() {
  return (
    <main className="py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Tech Radar
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Adopt / Trial / Assess / Hold — how I think about tech choices and trade-offs.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/manifesto"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline min-h-[44px] flex items-center w-fit"
            >
              ← Manifesto
            </Link>
            <Link
              href="/manifesto/security"
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground min-h-[44px] flex items-center w-fit"
            >
              Security Deep-Dive
            </Link>
          </div>
        </div>

        <TechRadar items={radarItems} />
      </Container>
    </main>
  )
}
