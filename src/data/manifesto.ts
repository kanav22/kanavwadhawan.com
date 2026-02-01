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

export const manifestoIntro = `I believe mobile systems that handle money and identity must be reliable, secure, and fast by design—not as an afterthought. As a Mobile Tech Leader & Fintech Architect, I focus on reliability and security first, a performance culture that measures what matters, scalable teams and process that ship predictably, and pragmatic architecture that enables change without rewrites. This Manifesto captures how I think about system design, performance, leadership, and fintech security.`

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
