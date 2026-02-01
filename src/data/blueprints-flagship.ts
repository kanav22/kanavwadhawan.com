/**
 * Architecture Blueprints — Standard Fintech Mobile Ecosystem.
 * Data-driven: edit nodes, edges, and principles here.
 * Used by /blueprints page.
 */

export type BlueprintNodeCategory =
  | "Security"
  | "Performance"
  | "Reliability"
  | "Platform"
  | "Delivery"

export interface BlueprintNodeSections {
  whatItIs: string
  preferredApproach: string
  tradeOffs: string
  failureModes: string
  testingStrategy: string
}

export interface BlueprintNode {
  id: string
  label: string
  category: BlueprintNodeCategory
  description: string
  position: { x: number; y: number }
  sections: BlueprintNodeSections
}

export interface BlueprintEdge {
  id: string
  source: string
  target: string
}

export interface BlueprintPrinciple {
  id: string
  text: string
}

export const blueprintNodes: BlueprintNode[] = [
  {
    id: "mobile-app-shell",
    label: "Mobile App Shell",
    category: "Platform",
    description: "Root host for navigation, theme, and global error handling.",
    position: { x: 220, y: 0 },
    sections: {
      whatItIs: "The single-activity or root view host that owns navigation, theme, and global error handling.",
      preferredApproach: "Single-activity (Android) or root coordinator with clear navigation graph; dependency injection at root; deep-link handling in one place.",
      tradeOffs: "Centralizing navigation can become a bottleneck if not kept thin; prefer feature modules to own their own screens with shell only routing.",
      failureModes: "Deep links bypassing auth, theme/configuration not applied after process death, navigation stack corruption.",
      testingStrategy: "Unit tests for route resolution; UI tests for critical flows from cold start; screenshot tests for theme and accessibility.",
    },
  },
  {
    id: "offline-cache-sync",
    label: "Offline Cache & Sync Engine",
    category: "Reliability",
    description: "Local persistence and sync state machine.",
    position: { x: 0, y: 90 },
    sections: {
      whatItIs: "Local persistence layer and sync engine that allow reads and writes when the network is unavailable, with a clear sync state machine.",
      preferredApproach: "Room/SQLite with a sync state machine; cache-first reads; conflict resolution rules (last-write-wins or merge); backoff and idempotent writes.",
      tradeOffs: "Cache invalidation is hard—prefer explicit invalidation and versioned schemas over time-based expiry only.",
      failureModes: "Stale data shown as truth, sync loops, unbounded growth, corruption after app updates.",
      testingStrategy: "Instrumented tests with fake network; sync state machine unit tests; chaos tests (kill app during sync).",
    },
  },
  {
    id: "auth-session",
    label: "Auth & Session Manager",
    category: "Security",
    description: "Identity, tokens, and session lifecycle.",
    position: { x: 220, y: 90 },
    sections: {
      whatItIs: "Manages identity, access tokens, and session lifecycle across the app.",
      preferredApproach: "Central session manager; refresh-token single-flight guard; retry strategy; clock-skew handling; secure storage; graceful logout.",
      tradeOffs: "Proactive refresh can race with concurrent requests; need a single source of truth for \"is logged in\" to avoid UI/API mismatch.",
      failureModes: "Expired session not detected, refresh loop, token leakage in logs or crash reports, logout not clearing all state.",
      testingStrategy: "Unit tests for refresh and retry logic; mock server for 401/403 flows; snapshot tests for logout clearing storage.",
    },
  },
  {
    id: "biometric-bridge",
    label: "Biometric Auth Bridge",
    category: "Security",
    description: "Platform biometric APIs for step-up auth.",
    position: { x: 440, y: 90 },
    sections: {
      whatItIs: "Abstraction over platform biometric APIs used for auth or sensitive actions.",
      preferredApproach: "Single abstraction with fallback to device credentials; no raw biometric data stored; use for step-up auth and sensitive operations only.",
      tradeOffs: "Biometric availability varies by device; fallback path must be secure (PIN/pattern) and not degrade UX.",
      failureModes: "Lockout after too many failures, biometric change not invalidating keys, bypass on rooted devices if not guarded.",
      testingStrategy: "Fake biometric provider in tests; integration tests on real device; verify key invalidation on credential change.",
    },
  },
  {
    id: "secure-storage",
    label: "Secure Storage (Keystore/Secure Enclave)",
    category: "Security",
    description: "Hardware-backed keys and sensitive data.",
    position: { x: 440, y: 200 },
    sections: {
      whatItIs: "Secure storage for keys and sensitive data (Android Keystore, iOS Secure Enclave / Keychain).",
      preferredApproach: "Keys never leave hardware when possible; use Keystore for API keys and session material; encrypt sensitive DB columns with key in Keystore.",
      tradeOffs: "Keystore can be unavailable on some devices; key rotation requires migration and support for multiple keys.",
      failureModes: "Key lost on factory reset or app uninstall, weak key derivation, keys in backup or memory dumps.",
      testingStrategy: "Unit tests with in-memory keystore; verify no keys in logs; test key rotation and multi-key read.",
    },
  },
  {
    id: "api-gateway-networking",
    label: "API Gateway & Networking Layer",
    category: "Reliability",
    description: "Typed clients, interceptors, retry, offline queue.",
    position: { x: 220, y: 200 },
    sections: {
      whatItIs: "Single entry point for app-to-backend API calls; handles auth, routing, retry, and offline queue.",
      preferredApproach: "Typed clients; interceptors for auth and logging; exponential backoff; offline queue; cancellation; consistent error taxonomy.",
      tradeOffs: "Centralizing calls can complicate per-feature timeouts and retries; balance between simplicity and feature-specific needs.",
      failureModes: "Cascading failures, auth not attached to request, timeouts too short or too long.",
      testingStrategy: "Mock server for success and failure paths; load tests for timeout and retry behavior.",
    },
  },
  {
    id: "risk-engine",
    label: "Risk Engine / Fraud Signals",
    category: "Security",
    description: "Client or server risk evaluation.",
    position: { x: 0, y: 200 },
    sections: {
      whatItIs: "Client or server component that evaluates risk for transactions or sensitive actions.",
      preferredApproach: "Prefer server-side risk; if client-side, use device signals and behavioral cues only, never trust client for final decision.",
      tradeOffs: "Client-side checks add latency and can be bypassed; server-side needs enough context without leaking PII.",
      failureModes: "Over-blocking good users, under-blocking bad actors, signals tampered or spoofed.",
      testingStrategy: "Unit tests for rule evaluation; integration tests with mock risk service; pen test for bypass scenarios.",
    },
  },
  {
    id: "payments-wallet",
    label: "Payments / Wallet Flows",
    category: "Security",
    description: "Idempotency, reconciliation, double-submit prevention.",
    position: { x: 220, y: 310 },
    sections: {
      whatItIs: "Domain logic and UI for moving money, storing payment methods, and executing transactions.",
      preferredApproach: "Idempotency keys; reconciliation states; double-submit prevention; safe retries; UX for pending states.",
      tradeOffs: "PCI scope is critical—minimize what touches raw PAN; balance UX (fast checkout) with security (step-up, limits).",
      failureModes: "Double charge, stuck pending state, sensitive data in logs or screenshots.",
      testingStrategy: "State machine unit tests; sandbox payment flows end-to-end; verify no sensitive data in crash dumps.",
    },
  },
  {
    id: "feature-flags",
    label: "Feature Flags & Remote Config",
    category: "Delivery",
    description: "Runtime toggles and kill switch.",
    position: { x: 0, y: 310 },
    sections: {
      whatItIs: "Runtime toggles that control feature visibility or behavior without a new release.",
      preferredApproach: "Flags fetched at session start with sensible defaults; cached and refreshed in background; kill switch for critical features.",
      tradeOffs: "Flag sprawl makes reasoning hard; prefer short-lived flags and cleanup; document ownership.",
      failureModes: "Defaults wrong so new users see broken state, flags not refreshed after long background, dependency on flag service blocks startup.",
      testingStrategy: "Unit tests for default values; UI tests with flag overrides; chaos test with flag service down.",
    },
  },
  {
    id: "observability",
    label: "Observability (Crash/ANR/Tracing)",
    category: "Performance",
    description: "Performance budgets, ANR/crash monitoring, SLOs.",
    position: { x: 440, y: 310 },
    sections: {
      whatItIs: "Traces, logs, and crash reporting used to understand behavior and debug issues.",
      preferredApproach: "Performance budgets (startup, jank); ANR/crash monitoring; tracing critical flows; SLOs.",
      tradeOffs: "Too much logging hurts performance and can leak PII; too little makes production debugging hard.",
      failureModes: "PII in logs or crash reports, sampling dropping critical errors, ANR not attributed to correct trace.",
      testingStrategy: "Verify redaction in unit tests; validate SLOs in CI with benchmark runs; review crash report payloads in staging.",
    },
  },
  {
    id: "push-messaging",
    label: "Push + In-App Messaging",
    category: "Delivery",
    description: "Push handler and in-app messages.",
    position: { x: 0, y: 400 },
    sections: {
      whatItIs: "Channels for reaching the user outside or inside the app (push, in-app banners, inbox).",
      preferredApproach: "Single push handler that routes to features; in-app messages with expiry and priority; deep link from push to correct screen.",
      tradeOffs: "Too many push types leads to noise; in-app messaging can block UI if not designed for dismiss.",
      failureModes: "Push not received (permissions, Doze), wrong deep link, stale in-app message, PII in push payload.",
      testingStrategy: "Unit tests for deep-link parsing; integration tests for push handling; verify PII not in push payload.",
    },
  },
  {
    id: "release-experimentation",
    label: "Release & Experimentation (CI/CD + staged rollout)",
    category: "Delivery",
    description: "Staged rollouts, experiment flags.",
    position: { x: 220, y: 400 },
    sections: {
      whatItIs: "CI/CD pipeline and staged rollout (e.g. 5% → 20% → 100%) with crash and ANR monitoring; experiment flags.",
      preferredApproach: "Automated test gates; staged rollouts with halt criteria; post-mortem template; experiment flags for A/B and feature experiments.",
      tradeOffs: "Staged rollout delays full availability; experiment flags add complexity and need cleanup.",
      failureModes: "Rollout not halted on regression, experiment flag left on, release train blocked by flaky tests.",
      testingStrategy: "Smoke tests in pipeline; canary monitoring; experiment flag audit in release process.",
    },
  },
]

export const blueprintEdges: BlueprintEdge[] = [
  { id: "e1", source: "mobile-app-shell", target: "auth-session" },
  { id: "e2", source: "mobile-app-shell", target: "offline-cache-sync" },
  { id: "e3", source: "auth-session", target: "biometric-bridge" },
  { id: "e4", source: "auth-session", target: "api-gateway-networking" },
  { id: "e5", source: "auth-session", target: "secure-storage" },
  { id: "e6", source: "offline-cache-sync", target: "api-gateway-networking" },
  { id: "e7", source: "api-gateway-networking", target: "risk-engine" },
  { id: "e8", source: "api-gateway-networking", target: "observability" },
  { id: "e9", source: "api-gateway-networking", target: "payments-wallet" },
  { id: "e10", source: "mobile-app-shell", target: "feature-flags" },
  { id: "e11", source: "mobile-app-shell", target: "push-messaging" },
  { id: "e12", source: "mobile-app-shell", target: "release-experimentation" },
]

export const blueprintPrinciples: BlueprintPrinciple[] = [
  { id: "p1", text: "Define and measure SLOs (cold start, ANR, crash-free) and enforce them in CI or release gates where possible." },
  { id: "p2", text: "Use baseline profiles and equivalent optimizations to lock in critical-path performance; regenerate on meaningful code changes." },
  { id: "p3", text: "Prefer lazy init and on-demand loading for non-critical path; keep Application and first screen minimal." },
  { id: "p4", text: "Instrument startup and key flows with traces; set performance budgets and fail builds or flag when regressed." },
  { id: "p5", text: "Cache aggressively with clear invalidation and staleness rules; use appropriate cache layers and measure hit rates." },
  { id: "p6", text: "Treat security non-negotiables (pinning, keystore, screen protection, logging hygiene) as part of the definition of done." },
]

export function getBlueprintNodeById(id: string): BlueprintNode | undefined {
  return blueprintNodes.find((n) => n.id === id)
}

export function getNodeIdFromHash(hash: string): string | null {
  if (!hash || !hash.startsWith("#")) return null
  const id = hash.slice(1)
  return blueprintNodes.some((n) => n.id === id) ? id : null
}
