/**
 * Performance scorecards and playbook.
 * Tie scorecard projectId to projects in /src/data/projects.ts.
 * Use "representative" or "target" labels when exact metrics are unknown.
 */

export interface PerformanceMetric {
  label: string
  value: string
  /** e.g. "Representative improvements I typically drive" or "Target" */
  valueLabel?: "exact" | "representative" | "target"
  how: string
}

export interface PerformanceScorecard {
  id: string
  projectId: string
  projectName: string
  /** Optional: link to project detail */
  projectSlug?: string
  metrics: PerformanceMetric[]
}

export const performanceScorecards: PerformanceScorecard[] = [
  {
    id: "weavr-sdk",
    projectId: "weavr-sdk",
    projectName: "Weavr Financial SDK",
    projectSlug: "weavr-sdk",
    metrics: [
      {
        label: "Cold start (ms)",
        value: "< 1500",
        valueLabel: "target",
        how: "Lazy init of SDK modules, baseline profiles for critical path, minimal work in Application.onCreate.",
      },
      {
        label: "Binary size (SDK AAR)",
        value: "< 3 MB",
        valueLabel: "target",
        how: "R8/ProGuard rules to strip unused code; avoid heavy transitive deps; optional features in separate artifacts.",
      },
      {
        label: "Crash-free users (%)",
        value: "> 99.5",
        valueLabel: "representative",
        how: "Strict mode in debug, crash reporting with symbolication, regression tests on core flows before release.",
      },
      {
        label: "ANR rate",
        value: "< 0.05%",
        valueLabel: "target",
        how: "Work off main thread; startup trace and frame metrics; background restrictions for sync and heavy work.",
      },
    ],
  },
  {
    id: "paytm",
    projectId: "paytm-mobile",
    projectName: "Paytm Mobile Banking",
    projectSlug: "paytm-mobile-banking",
    metrics: [
      {
        label: "Cold start (ms)",
        value: "< 2000",
        valueLabel: "target",
        how: "Baseline profiles, deferred non-critical init, image pipeline and font loading optimized.",
      },
      {
        label: "App size (download)",
        value: "Representative: reduced 15–20% over 2 years",
        valueLabel: "representative",
        how: "R8 full mode, App Bundles, on-demand delivery for non-core features, asset optimization.",
      },
      {
        label: "Crash-free users (%)",
        value: "> 99.5",
        valueLabel: "representative",
        how: "Automated UI and unit tests, staged rollouts, crash bucketing and fix-on-release discipline.",
      },
      {
        label: "Network efficiency",
        value: "Representative: fewer redundant calls, smaller payloads",
        valueLabel: "representative",
        how: "Batching, GraphQL or field selection, compression, caching with stale-while-revalidate.",
      },
    ],
  },
  {
    id: "angel-one",
    projectId: "angel-trading",
    projectName: "Angel One Trading App",
    projectSlug: "angel-one-trading",
    metrics: [
      {
        label: "Cold start (ms)",
        value: "< 2500",
        valueLabel: "target",
        how: "Lazy init of trading and WebSocket stack; baseline profiles; minimal work before first frame.",
      },
      {
        label: "App size",
        value: "Representative: controlled growth with modularization",
        valueLabel: "representative",
        how: "Feature modules and on-demand delivery; R8; regular size regression in CI.",
      },
      {
        label: "Crash-free users (%)",
        value: "> 99.3",
        valueLabel: "representative",
        how: "Instrumentation and strict mode; crash reporting; ANR detection and attribution.",
      },
      {
        label: "ANR rate",
        value: "Target: < 0.1%",
        valueLabel: "target",
        how: "Background thread for market data and sync; startup and frame budgets; trace-based monitoring.",
      },
    ],
  },
  {
    id: "indmoney",
    projectId: "indmoney-app",
    projectName: "INDmoney Personal Finance",
    projectSlug: "indmoney-personal-finance",
    metrics: [
      {
        label: "Cold start (ms)",
        value: "< 2200",
        valueLabel: "target",
        how: "Lazy init of aggregation and sync; baseline profiles; lightweight first screen.",
      },
      {
        label: "App size",
        value: "Representative: kept flat despite new features",
        valueLabel: "representative",
        how: "Modularization, R8, App Bundle, removal of unused libs and assets.",
      },
      {
        label: "Crash-free users (%)",
        value: "> 99.5",
        valueLabel: "representative",
        how: "Room and sync tested in isolation; crash-free as release gate; staged rollouts.",
      },
    ],
  },
]

export const performancePlaybookPrinciples = [
  "Define and measure SLOs (e.g. cold start, ANR, crash-free) and enforce them in CI or release gates where possible.",
  "Use baseline profiles (Android) and equivalent optimizations to lock in critical-path performance; regenerate on meaningful code changes.",
  "Prefer lazy init and on-demand loading for non-critical path; keep Application and first screen minimal.",
  "Instrument startup and key flows with traces; set performance budgets and fail builds or flag when regressed.",
  "R8/ProGuard rules must be reviewed and tested; keep rules minimal and document why each keep is needed.",
  "Cache aggressively with clear invalidation and staleness rules; use appropriate cache layers (memory, disk, network) and measure hit rates.",
]
