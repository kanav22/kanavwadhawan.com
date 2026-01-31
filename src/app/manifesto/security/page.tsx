import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/container"
import { ChecklistItem } from "@/components/manifesto/ChecklistItem"
import { securityChecklist } from "@/data/security"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"

export const metadata: Metadata = generatePageMetadata({
  title: "Fintech Security Deep-Dive",
  description: `Security non-negotiables by ${profile.name}: certificate pinning, root detection, obfuscation, Keystore, TLS, screen protection, logging hygiene, threat modeling.`,
  path: "/manifesto/security",
})

export default function SecurityPage() {
  return (
    <main className="py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Fintech Security Deep-Dive
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Non-negotiables: why they matter, how I implement them, and gotchas.
            </p>
          </div>
          <Link
            href="/manifesto"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline min-h-[44px] flex items-center w-fit"
          >
            ← Manifesto
          </Link>
        </div>

        <div className="space-y-3">
          {securityChecklist.map((item) => (
            <ChecklistItem key={item.id} item={item} />
          ))}
        </div>

        <section className="border-t border-border/40 pt-8 sm:pt-10">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Tech Radar
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Adopt / Trial / Assess / Hold — how I think about tech choices.
          </p>
          <Link
            href="/manifesto/radar"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-primary underline-offset-4 hover:underline sm:mt-6"
          >
            View Tech Radar →
          </Link>
        </section>
      </Container>
    </main>
  )
}
