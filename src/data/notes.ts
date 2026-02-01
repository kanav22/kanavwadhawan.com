/**
 * Engineering Notes — blog posts for LinkedIn sharing and professional visibility.
 * Edit posts here. For new posts, include linkedinHook + linkedinSummary for best caption.
 */

import { siteConfig } from "@/lib/metadata"

export interface Note {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  /** Hero/feature image shown at top of post and on list; use /note-images/ to avoid route conflict with /notes/[slug]. */
  heroImage?: string
  /** OG image path for social sharing; if unset, note posts use generated PNG at /notes/[slug]/opengraph-image; use /og-notes for a shared Engineering Notes image. */
  ogImage?: string
  /** One strong opening sentence for LinkedIn caption */
  linkedinHook?: string
  /** 2–3 short bullet takeaways for LinkedIn caption */
  linkedinSummary?: string[]
  tldr: string
  architecture: string
  failureModes: string[]
  testingChecklist: string[]
  whatIdDoDifferently: string
}

export const notes: Note[] = [
  {
    slug: "token-refresh-that-never-logs-users-out",
    title: "Token Refresh That Never Logs Users Out",
    excerpt: "A single-flight refresh guard, retry strategy, and clock-skew handling so users stay signed in.",
    publishedAt: "2025-01-15",
    heroImage: "/note-images/token-refresh.svg",
    linkedinHook: "Most mobile apps get token refresh wrong—and users pay the price with random logouts.",
    linkedinSummary: [
      "Single-flight refresh guard so 10 tabs don’t trigger 10 refreshes.",
      "Retry with backoff and clock-skew handling so expiry edge cases don’t boot users.",
      "Store tokens in Keystore; never in SharedPreferences or UserDefaults.",
    ],
    tldr: "Use a central session manager with a single-flight refresh guard: only one in-flight refresh at a time, queue other requests until it completes. Retry with exponential backoff and handle clock skew. Store tokens in Keystore/Secure Enclave. On 401, attempt refresh once; if refresh fails, then logout. Never log users out on a single failed request.",
    architecture: "One SessionManager (or AuthRepository) owns the current session. All API calls go through an interceptor that attaches the access token. If the interceptor sees 401, it calls SessionManager.refresh(). Refresh() uses a mutex or single promise so concurrent callers wait on the same refresh. After refresh, retry the original request. Tokens live in Keystore; in-memory cache is optional for speed. Logout clears Keystore and in-memory state.",
    failureModes: [
      "Refresh loop: refresh token expired or revoked but client keeps retrying.",
      "Clock skew: device time wrong, token appears expired when it isn’t (or vice versa).",
      "Token leakage: tokens in logs, crash reports, or screenshots.",
      "Logout not clearing all state: remnants in storage or memory.",
    ],
    testingChecklist: [
      "Unit tests: refresh called once under 401; concurrent requests share one refresh.",
      "Mock server: 401 → refresh → 200; 401 → refresh fails → logout.",
      "Clock skew: advance device time, confirm token validation still correct.",
      "Snapshot or integration test: logout clears storage and in-memory session.",
    ],
    whatIdDoDifferently:
      "I’d add a small “session health” ping (e.g. every N minutes) that validates the refresh token server-side and proactively refreshes before expiry, so we rarely hit the expiry edge at all.",
  },
  {
    slug: "offline-first-sync-engines",
    title: "Offline-First Sync Engines",
    excerpt: "Room/SQLite, a clear sync state machine, and conflict resolution rules that don’t surprise users.",
    publishedAt: "2025-01-10",
    heroImage: "/note-images/offline-sync.svg",
    linkedinHook: "Offline-first isn’t a feature—it’s a contract: cache-first reads, explicit sync state, and rules for conflicts.",
    linkedinSummary: [
      "One sync state machine (idle / syncing / error) so the UI and backend stay in sync.",
      "Conflict resolution rules documented and tested; avoid “last write wins” by default for user-visible data.",
      "Backoff and idempotent writes so retries don’t duplicate or corrupt data.",
    ],
    tldr: "Use a local DB (Room/SQLite) as the source of truth for reads; one sync state machine (idle / syncing / error); conflict resolution rules documented and tested; backoff and idempotent writes for pushes.",
    architecture: "Local DB (Room/SQLite) is the source of truth for reads; UI reads from DB only. Writes go to a queue or directly to DB with a “dirty” flag. A sync worker runs when online: pull latest from server, merge (with defined conflict rules), then push dirty records with idempotency keys. Sync state (idle, syncing, error) is exposed so the UI can show a banner or disable actions. Conflict resolution: for user-generated content, prefer server or merge; for config, last-write-wins is often fine.",
    failureModes: [
      "Stale data shown as truth after long offline.",
      "Sync loop: client and server keep overwriting each other.",
      "Unbounded growth: sync table or queue never pruned.",
      "Corruption after app update or schema migration.",
    ],
    testingChecklist: [
      "Unit tests for sync state machine transitions.",
      "Instrumented tests with fake server: go offline, write, go online, confirm sync.",
      "Conflict scenarios: same record edited offline on two devices, then sync.",
      "Chaos test: kill app during sync; restart and confirm no duplicate or lost data.",
    ],
    whatIdDoDifferently:
      "I’d version the sync protocol and support at least one prior version so we can roll out server changes without breaking older app versions in the wild.",
  },
  {
    slug: "performance-budgets-for-mobile-teams",
    title: "Performance Budgets for Mobile Teams",
    excerpt: "SLOs for cold start, ANR, and crash-free—and gates in CI so we don’t ship regressions.",
    publishedAt: "2025-01-05",
    heroImage: "/note-images/performance-budgets.svg",
    linkedinHook: "If you’re not measuring cold start and ANR in CI, you’re shipping performance regressions to production.",
    linkedinSummary: [
      "Define SLOs (e.g. cold start < 2s, ANR < 0.1%) and add benchmark jobs in CI.",
      "Baseline profiles and lazy init so the critical path stays fast as features grow.",
      "Fail the build or block the release when benchmarks regress.",
    ],
    tldr: "Define SLOs (cold start, ANR, crash-free) and add a CI benchmark job that compares to a baseline. Use baseline profiles and lazy init. Fail the build or block release when benchmarks regress.",
    architecture: "Define SLOs up front: cold start (time to first frame), ANR rate, crash-free rate. Add a CI job that runs the app (or a slim harness), captures startup time and frame times, and compares to a baseline. Store baselines in repo or CI artifacts. On regression, fail the build or require override. Use baseline profiles (Android) and equivalent optimizations so the critical path is pre-compiled. Lazy-init non-critical path (e.g. analytics, feature flags) after first frame.",
    failureModes: [
      "Benchmarks flaky so teams ignore or disable them.",
      "Cold start improves but ANR gets worse (e.g. more work deferred to first frame).",
      "Baseline profile not regenerated after big refactors.",
    ],
    testingChecklist: [
      "CI benchmark job runs on every PR; compare to baseline.",
      "Manual or automated test: cold start under 2s on mid-range device.",
      "ANR monitoring in production; alert on regression.",
    ],
    whatIdDoDifferently:
      "I’d add a “performance review” gate in the release process: someone (or a bot) signs off that the release doesn’t regress SLOs, so it’s not only CI but also a human checkpoint for big launches.",
  },
]

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug)
}

export function getNotesSortedByDate(): Note[] {
  return [...notes].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/** Build LinkedIn share URL with canonical post URL */
export function getLinkedInShareUrl(postUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
}

/** Build LinkedIn caption from note; fallback if linkedinHook/linkedinSummary missing */
export function getLinkedInCaption(note: Note): string {
  const url = `${siteConfig.url}/notes/${note.slug}`
  if (note.linkedinHook && note.linkedinSummary?.length) {
    const bullets = note.linkedinSummary.map((b) => `• ${b}`).join("\n")
    return `${note.linkedinHook}\n\n${bullets}\n\nFull breakdown → ${url}`
  }
  return `${note.excerpt}\n\nFull breakdown → ${url}`
}
