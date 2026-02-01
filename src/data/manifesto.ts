/**
 * Manifesto landing content — philosophy and feature cards.
 * Edit here to change intro and links.
 */

export interface ManifestoFeature {
  id: string
  title: string
  description: string
  href: string
  icon: "blueprints" | "performance" | "leadership" | "security"
  /** Optional image path for card (e.g. /manifesto/blueprints.svg). Shown above content when set. */
  image?: string
}

export const manifestoIntro = `Mobile systems that handle money and identity must be reliable, secure, and fast by design—not as an afterthought. This Manifesto captures how I think about system design, performance, leadership, and fintech security.`

export interface ManifestoPrinciple {
  id: string
  title: string
  body: string
}

export const manifestoPrinciples: ManifestoPrinciple[] = [
  {
    id: "reliability-first",
    title: "Reliability first",
    body: "Systems must degrade gracefully. Define SLOs (cold start, ANR, crash-free), measure them in CI, and treat regressions as release blockers.",
  },
  {
    id: "security-by-design",
    title: "Security by design",
    body: "Keystore for secrets, cert pinning, PII redaction in logs and crash reports. Security non-negotiables are part of the definition of done.",
  },
  {
    id: "performance-culture",
    title: "Performance culture",
    body: "Measure what matters. Baseline profiles, lazy init, and performance budgets so the critical path stays fast as features grow.",
  },
  {
    id: "teams-that-ship",
    title: "Teams that ship",
    body: "Clear ownership, CI/CD that shortens release cycles, and process that enables predictability without bureaucracy.",
  },
  {
    id: "architecture-that-evolves",
    title: "Architecture that evolves",
    body: "Pragmatic boundaries and modularization so we can change without rewrites. Prefer incremental improvement over big-bang refactors.",
  },
  {
    id: "fintech-context",
    title: "Fintech context",
    body: "Money and identity demand extra care. Idempotency, reconciliation, and audit trails are not optional.",
  },
]

export const manifestoFeatures: ManifestoFeature[] = [
  {
    id: "blueprints",
    title: "Architecture Blueprints",
    description: "Interactive diagram of a standard fintech mobile ecosystem—nodes, boundaries, and how I approach each layer.",
    href: "/manifesto/blueprints",
    icon: "blueprints",
  },
  {
    id: "performance",
    title: "Performance Scorecards",
    description: "Benchmark cards and representative improvements I drive: cold start, size, crash-free users, and the playbook behind them.",
    href: "/manifesto/performance",
    icon: "performance",
  },
  {
    id: "leadership",
    title: "Leadership Force Multiplier",
    description: "Timeline of team scaling, mentorship, process innovation, and platform thinking—outcomes and signals of success.",
    href: "/manifesto/leadership",
    icon: "leadership",
  },
  {
    id: "security",
    title: "Security & Tech Radar",
    description: "Fintech security non-negotiables with implementation detail, plus a tech radar (Adopt / Trial / Assess / Hold).",
    href: "/manifesto/security",
    icon: "security",
  },
]
