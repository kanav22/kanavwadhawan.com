/**
 * Tech Radar (Thoughtworks-style): Adopt / Trial / Assess / Hold.
 * Each item has a one-line rationale.
 */

export type RadarRing = "adopt" | "trial" | "assess" | "hold"

export interface RadarItem {
  id: string
  label: string
  ring: RadarRing
  rationale: string
}

export const radarItems: RadarItem[] = [
  // Adopt
  { id: "compose", label: "Jetpack Compose", ring: "adopt", rationale: "Declarative UI, less boilerplate, better tooling and performance for new Android UI." },
  { id: "coroutines", label: "Kotlin Coroutines / Flow", ring: "adopt", rationale: "Standard for async and streams on Android; well understood and maintainable." },
  { id: "modularization", label: "Modularization", ring: "adopt", rationale: "Clear boundaries, faster builds, and parallel team ownership." },
  { id: "baseline-profiles", label: "Baseline Profiles", ring: "adopt", rationale: "Lock in startup and critical path performance; low cost, high impact." },
  // Trial
  { id: "maestro", label: "Maestro (E2E)", ring: "trial", rationale: "Simpler, flaky-resistant E2E tests; good candidate to complement or replace existing UI test stack." },
  { id: "kmp", label: "KMP where appropriate", ring: "trial", rationale: "Share business logic across Android/iOS when the cost of two codebases outweighs KMP complexity." },
  { id: "detekt", label: "Detekt + custom rules", ring: "trial", rationale: "Consistent style and safety rules; custom rules for security and performance patterns." },
  // Assess
  { id: "on-device-ml", label: "On-device ML for fraud UX", ring: "assess", rationale: "Could improve step-up and risk UX; assess latency, accuracy, and privacy before broad adoption." },
  { id: "ai-coding", label: "AI-assisted coding workflows", ring: "assess", rationale: "Productivity gains are real but need guardrails for security and quality; assess team-by-team." },
  { id: "passkeys", label: "Passkeys", ring: "assess", rationale: "Strong auth with better UX; assess ecosystem support and fallback for older devices." },
  // Hold
  { id: "rxjava", label: "RxJava (favor Flow)", ring: "hold", rationale: "Prefer Kotlin Flow for new code; migrate existing Rx where it adds maintenance cost." },
  { id: "reflection", label: "Overusing reflection", ring: "hold", rationale: "Fragile, hard to obfuscate, and slow; use only where necessary and document." },
  { id: "monolithic-modules", label: "Monolithic feature modules", ring: "hold", rationale: "Prefer smaller, single-responsibility modules for build time and ownership." },
]

export const radarRings: { id: RadarRing; label: string; order: number }[] = [
  { id: "adopt", label: "Adopt", order: 0 },
  { id: "trial", label: "Trial", order: 1 },
  { id: "assess", label: "Assess", order: 2 },
  { id: "hold", label: "Hold", order: 3 },
]
