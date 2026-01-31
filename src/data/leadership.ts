/**
 * Leadership Force Multiplier timeline.
 * Use qualitative phrasing when exact numbers are unknown (e.g. "scaled from small core to multi-squad").
 */

export interface LeadershipEntry {
  id: string
  title: string
  /** Optional; omit if unknown */
  timeRange?: string
  outcome: string
  whatIDid: string[]
  signalsOfSuccess: string[]
  /** Theme for icon/card */
  theme: "scaling" | "mentorship" | "process" | "platform"
}

export const leadershipTimeline: LeadershipEntry[] = [
  {
    id: "scaling-1",
    title: "Team scaling",
    timeRange: "2020 – 2024",
    outcome: "Scaled mobile org from a small core team to multiple squads owning distinct product areas; maintained delivery predictability and quality bar.",
    whatIDid: [
      "Defined ownership boundaries (by feature or platform) and clear interfaces between squads.",
      "Introduced hiring bar and leveling expectations; ran hiring loops and onboarding for senior hires.",
      "Kept architecture modular so squads could ship without stepping on each other.",
    ],
    signalsOfSuccess: [
      "Squads shipping on predictable cadence with fewer cross-team blocks.",
      "New hires productive within 4–6 weeks with clear runbooks and ownership.",
    ],
    theme: "scaling",
  },
  {
    id: "mentorship-1",
    title: "Mentorship & leveling",
    timeRange: "2021 – Present",
    outcome: "Structured promotions and leveling ladders; coaching loops and onboarding that reduced time-to-productivity.",
    whatIDid: [
      "Documented expectations per level (junior to staff) and aligned with performance reviews.",
      "Ran regular 1:1s and career conversations; supported engineers through promotion packets.",
      "Created onboarding checklists, runbooks, and \"first PR\" paths for new joiners.",
    ],
    signalsOfSuccess: [
      "Promotions aligned to documented criteria; fewer surprises in calibration.",
      "New engineers shipping meaningful work within first month.",
    ],
    theme: "mentorship",
  },
  {
    id: "process-1",
    title: "Process innovation: CI/CD & release train",
    timeRange: "2021 – 2024",
    outcome: "CI/CD pipeline with automated test gates and staged rollouts; release cycle shortened from weeks to days.",
    whatIDid: [
      "Designed and adopted Jenkins/Fastlane pipelines with unit, UI, and smoke tests as gates.",
      "Introduced staged rollouts (e.g. 5% → 20% → 100%) with crash and ANR monitoring.",
      "Defined release train and incident response: who’s on-call, how to halt rollout, post-mortem template.",
    ],
    signalsOfSuccess: [
      "Releases with minimal manual steps; rollbacks possible within minutes.",
      "Post-mortems and blameless culture; repeat failures addressed with automation or process.",
    ],
    theme: "process",
  },
  {
    id: "platform-1",
    title: "Platform thinking: SDKs & shared foundations",
    timeRange: "2024 – Present",
    outcome: "Built and evolved financial SDK used by third-party apps; reduced integration time from weeks to days.",
    whatIDid: [
      "Designed public API and migration path for breaking changes; documented and versioned.",
      "Modularized SDK so adopters could depend only on what they need.",
      "Invested in sample apps, docs, and support so external teams could self-serve.",
    ],
    signalsOfSuccess: [
      "External teams integrating without heavy support; NPS or time-to-first-success improved.",
      "Internal and external consumers on stable, versioned contracts.",
    ],
    theme: "platform",
  },
]
