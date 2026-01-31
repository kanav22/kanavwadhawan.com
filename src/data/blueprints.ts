/**
 * Blueprint diagram nodes and edges for "Standard Fintech Mobile Ecosystem".
 * Used by BlueprintDiagram (reactflow). Edit node ids, positions, and nodeDetails.
 */

import type { Node, Edge } from "reactflow"

export interface NodeDetail {
  id: string
  title: string
  whatItIs: string
  preferredApproach: string
  tradeOffs: string
  commonFailureModes: string
  howITestIt: string
}

export const blueprintNodes: Node[] = [
  { id: "shell", type: "default", position: { x: 200, y: 0 }, data: { label: "Mobile App Shell" } },
  { id: "offline", type: "default", position: { x: 0, y: 80 }, data: { label: "Offline Cache" } },
  { id: "auth", type: "default", position: { x: 200, y: 80 }, data: { label: "Auth & Session" } },
  { id: "biometric", type: "default", position: { x: 400, y: 80 }, data: { label: "Biometric Bridge" } },
  { id: "risk", type: "default", position: { x: 0, y: 160 }, data: { label: "Risk Engine" } },
  { id: "gateway", type: "default", position: { x: 200, y: 160 }, data: { label: "API Gateway" } },
  { id: "observability", type: "default", position: { x: 400, y: 160 }, data: { label: "Observability" } },
  { id: "flags", type: "default", position: { x: 0, y: 240 }, data: { label: "Feature Flags" } },
  { id: "payments", type: "default", position: { x: 200, y: 240 }, data: { label: "Payments / Wallet" } },
  { id: "messaging", type: "default", position: { x: 400, y: 240 }, data: { label: "Push + In-App Messaging" } },
  { id: "sync", type: "default", position: { x: 200, y: 320 }, data: { label: "Data Sync" } },
  { id: "keystore", type: "default", position: { x: 400, y: 320 }, data: { label: "Encryption / Keystore" } },
]

export const blueprintEdges: Edge[] = [
  { id: "e-shell-auth", source: "shell", target: "auth" },
  { id: "e-shell-offline", source: "shell", target: "offline" },
  { id: "e-auth-biometric", source: "auth", target: "biometric" },
  { id: "e-auth-gateway", source: "auth", target: "gateway" },
  { id: "e-offline-sync", source: "offline", target: "sync" },
  { id: "e-gateway-risk", source: "gateway", target: "risk" },
  { id: "e-gateway-observability", source: "gateway", target: "observability" },
  { id: "e-shell-flags", source: "shell", target: "flags" },
  { id: "e-gateway-payments", source: "gateway", target: "payments" },
  { id: "e-shell-messaging", source: "shell", target: "messaging" },
  { id: "e-auth-keystore", source: "auth", target: "keystore" },
  { id: "e-sync-keystore", source: "sync", target: "keystore" },
]

export const nodeDetails: NodeDetail[] = [
  {
    id: "shell",
    title: "Mobile App Shell",
    whatItIs: "The single-activity or root view host that owns navigation, theme, and global error handling.",
    preferredApproach: "Single-activity (Android) or root coordinator with clear navigation graph; dependency injection at root; deep-link handling in one place.",
    tradeOffs: "Centralizing navigation can become a bottleneck if not kept thin; prefer feature modules to own their own screens with shell only routing.",
    commonFailureModes: "Deep links bypassing auth, theme/configuration not applied after process death, navigation stack corruption.",
    howITestIt: "Unit tests for route resolution; UI tests for critical flows from cold start; screenshot tests for theme and accessibility.",
  },
  {
    id: "offline",
    title: "Offline Cache",
    whatItIs: "Local persistence layer that allows reads (and sometimes writes) when the network is unavailable.",
    preferredApproach: "Room/SQLite with a clear sync state machine; cache-first reads with staleness rules; conflict resolution rules (last-write-wins or merge strategies) documented and tested.",
    tradeOffs: "Cache invalidation is hard—prefer explicit invalidation and versioned schemas over time-based expiry only.",
    commonFailureModes: "Stale data shown as truth, sync loops, unbounded growth, corruption after app updates.",
    howITestIt: "Instrumented tests with fake network; sync state machine unit tests; chaos tests (kill app during sync).",
  },
  {
    id: "auth",
    title: "Auth & Session",
    whatItIs: "Manages identity, access tokens, and session lifecycle across the app.",
    preferredApproach: "Central session manager; refresh token guard with retry strategy; clock skew handling; tokens in Keystore/Secure Enclave; graceful logout and revocation.",
    tradeOffs: "Proactive refresh can race with concurrent requests; need a single source of truth for \"is logged in\" to avoid UI/API mismatch.",
    commonFailureModes: "Expired session not detected, refresh loop, token leakage in logs or crash reports, logout not clearing all state.",
    howITestIt: "Unit tests for refresh and retry logic; mock server for 401/403 flows; snapshot tests for logout clearing storage.",
  },
  {
    id: "biometric",
    title: "Biometric Bridge",
    whatItIs: "Abstraction over platform biometric APIs used for auth or sensitive actions.",
    preferredApproach: "Single abstraction with fallback to device credentials; no raw biometric data stored; use for step-up auth and sensitive operations only.",
    tradeOffs: "Biometric availability varies by device; fallback path must be secure (PIN/pattern) and not degrade UX.",
    commonFailureModes: "Lockout after too many failures, biometric change not invalidating keys, bypass on rooted devices if not guarded.",
    howITestIt: "Fake biometric provider in tests; integration tests on real device with real biometrics; verify key invalidation on credential change.",
  },
  {
    id: "risk",
    title: "Risk Engine",
    whatItIs: "Client or server component that evaluates risk for transactions or sensitive actions.",
    preferredApproach: "Prefer server-side risk; if client-side, use device signals and behavioral cues only, never trust client for final decision.",
    tradeOffs: "Client-side checks add latency and can be bypassed; server-side needs enough context without leaking PII.",
    commonFailureModes: "Over-blocking good users, under-blocking bad actors, signals tampered or spoofed.",
    howITestIt: "Unit tests for rule evaluation; integration tests with mock risk service; pen test for bypass scenarios.",
  },
  {
    id: "gateway",
    title: "API Gateway",
    whatItIs: "Single entry point for app-to-backend API calls; often handles auth, routing, and rate limiting.",
    preferredApproach: "One HTTP client with interceptors for auth and logging; retry with backoff; circuit breaker for failing endpoints.",
    tradeOffs: "Centralizing calls can complicate per-feature timeouts and retries; balance between simplicity and feature-specific needs.",
    commonFailureModes: "Cascading failures, auth not attached to request, timeouts too short or too long.",
    howITestIt: "Mock server for success and failure paths; load tests for timeout and retry behavior.",
  },
  {
    id: "observability",
    title: "Observability",
    whatItIs: "Traces, logs, and crash reporting used to understand behavior and debug issues.",
    preferredApproach: "Structured logs; traces for critical flows; crash reporting with PII redaction; SLOs for startup time and ANR; performance budgets (e.g. cold start &lt; 2s, ANR &lt; 0.1%).",
    tradeOffs: "Too much logging hurts performance and can leak PII; too little makes production debugging hard.",
    commonFailureModes: "PII in logs or crash reports, sampling dropping critical errors, ANR not attributed to correct trace.",
    howITestIt: "Verify redaction in unit tests; validate SLOs in CI with benchmark runs; review crash report payloads in staging.",
  },
  {
    id: "flags",
    title: "Feature Flags",
    whatItIs: "Runtime toggles that control feature visibility or behavior without a new release.",
    preferredApproach: "Flags fetched at session start with sensible defaults; cached and refreshed in background; kill switch for critical features.",
    tradeOffs: "Flag sprawl makes reasoning hard; prefer short-lived flags and cleanup; document ownership.",
    commonFailureModes: "Defaults wrong so new users see broken state, flags not refreshed after long background, dependency on flag service blocks startup.",
    howITestIt: "Unit tests for default values; UI tests with flag overrides; chaos test with flag service down.",
  },
  {
    id: "payments",
    title: "Payments / Wallet",
    whatItIs: "Domain logic and UI for moving money, storing payment methods, and executing transactions.",
    preferredApproach: "No card/account data in app storage; tokenization at gateway; idempotent APIs for payments; clear transaction state machine.",
    tradeOffs: "PCI scope is critical—minimize what touches raw PAN; balance UX (fast checkout) with security (step-up, limits).",
    commonFailureModes: "Double charge, stuck pending state, sensitive data in logs or screenshots.",
    howITestIt: "State machine unit tests; sandbox payment flows end-to-end; verify no sensitive data in crash dumps.",
  },
  {
    id: "messaging",
    title: "Push + In-App Messaging",
    whatItIs: "Channels for reaching the user outside or inside the app (push, in-app banners, inbox).",
    preferredApproach: "Single push handler that routes to features; in-app messages with expiry and priority; deep link from push to correct screen.",
    tradeOffs: "Too many push types leads to noise; in-app messaging can block UI if not designed for dismiss.",
    commonFailureModes: "Push not received (permissions, Doze), wrong deep link, stale in-app message, PII in push payload.",
    howITestIt: "Unit tests for deep-link parsing; integration tests for push handling; verify PII not in push payload.",
  },
  {
    id: "sync",
    title: "Data Sync",
    whatItIs: "Mechanism to keep local data in sync with server (pull, push, or both) with conflict handling.",
    preferredApproach: "Explicit sync state (idle, syncing, error); incremental sync where possible; conflict resolution rules documented; backoff on server errors.",
    tradeOffs: "Full sync can be expensive; incremental needs stable cursors or versioning; offline writes need merge strategy.",
    commonFailureModes: "Sync loop, data loss on conflict, unbounded sync duration, battery drain.",
    howITestIt: "Unit tests for conflict resolution; instrumented tests with fake server; long-running sync stress tests.",
  },
  {
    id: "keystore",
    title: "Encryption / Keystore",
    whatItIs: "Secure storage for keys and sensitive data (Android Keystore, iOS Secure Enclave / Keychain).",
    preferredApproach: "Keys never leave hardware when possible; use Keystore for API keys and session material; encrypt sensitive DB columns with key in Keystore.",
    tradeOffs: "Keystore can be unavailable on some devices; key rotation requires migration and support for multiple keys.",
    commonFailureModes: "Key lost on factory reset or app uninstall, weak key derivation, keys in backup or memory dumps.",
    howITestIt: "Unit tests with in-memory keystore; verify no keys in logs; test key rotation and multi-key read.",
  },
]

export function getNodeDetail(id: string): NodeDetail | undefined {
  return nodeDetails.find((n) => n.id === id)
}
