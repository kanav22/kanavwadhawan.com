/**
 * Fintech security non-negotiables: checklist with expandable detail.
 * Each item: why it matters, how I implement it, gotcha/trade-off.
 */

export interface SecurityItem {
  id: string
  title: string
  whyItMatters: string
  howIImplement: string[]
  gotchaOrTradeoff: string
}

export const securityChecklist: SecurityItem[] = [
  {
    id: "pinning",
    title: "Certificate pinning (and when not to)",
    whyItMatters: "Reduces risk of MITM when you control both client and server; required in many fintech/PCI contexts.",
    howIImplement: [
      "Pin to leaf and/or intermediate CA; rotate pins with app release and support overlap period.",
      "Use platform APIs (Network Security Config on Android, ATS and pinning on iOS); avoid custom SSL sockets unless necessary.",
      "Provide a kill switch or config to disable pinning for enterprise/corporate proxy scenarios where appropriate.",
    ],
    gotchaOrTradeoff: "Over-pinning or no overlap period can lock users on old builds if CA or cert changes; balance security with operational flexibility.",
  },
  {
    id: "root",
    title: "Root / Jailbreak detection (and bypass limits)",
    whyItMatters: "Rooted/jailbroken devices have weaker guarantees; detection helps decide whether to allow sensitive actions or step up auth.",
    howIImplement: [
      "Check for common root/jailbreak indicators; use a small, maintained library or minimal checks to reduce bypass surface.",
      "Don’t rely solely on client-side checks for high-value decisions; treat as one signal and combine with server-side risk.",
      "Graceful degradation: warn, restrict certain actions, or require step-up (e.g. re-auth) rather than hard block where UX allows.",
    ],
    gotchaOrTradeoff: "Determined attackers can bypass client checks; use for risk scoring and UX, not as sole gate for high-value operations.",
  },
  {
    id: "obfuscation",
    title: "Obfuscation (R8/ProGuard; DexGuard as optional)",
    whyItMatters: "Raises the bar for reverse engineering and tampering; required or expected in many fintech apps.",
    howIImplement: [
      "Enable R8 full mode with ProGuard rules; keep rules minimal and test thoroughly—optimize for size and obfuscation.",
      "Keep reflection-based code in keep rules and document why; avoid broad keep that defeats obfuscation.",
      "Consider DexGuard or similar for sensitive apps (e.g. integrity checks, anti-tamper) if budget and compliance justify.",
    ],
    gotchaOrTradeoff: "Aggressive obfuscation can break reflection, native calls, or serialization; test release builds and maintain rule set in version control.",
  },
  {
    id: "keystore",
    title: "Keystore / Secure Enclave usage",
    whyItMatters: "Keys and secrets in hardware-backed storage are much harder to extract; foundation for auth and encryption.",
    howIImplement: [
      "Store auth tokens, API secrets, and encryption keys in Android Keystore or iOS Keychain/Secure Enclave; never in plain SharedPreferences or files.",
      "Use Keychain access control (e.g. when-unlocked, when-unlocked-this-device-only) and biometric-bound keys where appropriate.",
      "Plan for key rotation and multi-key support so you can rotate without breaking existing users.",
    ],
    gotchaOrTradeoff: "Keystore can be unavailable on some devices or after factory reset; have a fallback path and never log or backup keys.",
  },
  {
    id: "secure-networking",
    title: "Secure networking (TLS config, token handling)",
    whyItMatters: "All traffic should be encrypted and tokens should not leak; TLS and token handling are baseline.",
    howIImplement: [
      "TLS 1.2+ only; disable weak ciphers; use certificate pinning where required (see above).",
      "Send tokens in headers only; never in URLs or logs; use short-lived access tokens and secure refresh flow.",
      "Validate server certificates and hostname; fail closed on errors; use HSTS and secure cookie flags where applicable.",
    ],
    gotchaOrTradeoff: "Legacy or partner endpoints sometimes force temporary exceptions; document and time-box them and prefer pinning for your own APIs.",
  },
  {
    id: "screen-protection",
    title: "Sensitive screen protection (FLAG_SECURE)",
    whyItMatters: "Prevents screenshots and overlay in app switcher; expected for payment and account screens.",
    howIImplement: [
      "Set FLAG_SECURE (Android) and equivalent on iOS for screens showing balances, card numbers, or PII.",
      "Apply to all activities/views that render sensitive data; centralize in a base class or composable.",
      "Consider blur or placeholder in recent apps; test that assistive technologies still work.",
    ],
    gotchaOrTradeoff: "Overuse can block legitimate accessibility or support tools; limit to truly sensitive screens and test with TalkBack/VoiceOver.",
  },
  {
    id: "logging",
    title: "Logging hygiene (PII redaction)",
    whyItMatters: "Logs and crash reports often end up in third-party systems; PII must not be present for compliance and safety.",
    howIImplement: [
      "Redact or hash PII (emails, IDs, tokens, card numbers) in all log statements and crash payloads.",
      "Use a logging wrapper or interceptor that enforces redaction; code review for raw log calls.",
      "Define a short allowlist of non-PII identifiers (e.g. request ID) for debugging; everything else redacted by default.",
    ],
    gotchaOrTradeoff: "Over-redaction can make debugging hard; balance with structured logs and server-side correlation IDs.",
  },
  {
    id: "threat-model",
    title: "Threat modeling & pen test readiness",
    whyItMatters: "Structured threat modeling and pen tests catch design flaws before they become incidents; expected in fintech.",
    howIImplement: [
      "Run threat modeling for new features (data flow, trust boundaries, threats); document and track mitigations.",
      "Maintain an asset and data flow diagram; update when architecture changes.",
      "Schedule regular pen tests and fix findings; have a clear process for handling and prioritizing results.",
    ],
    gotchaOrTradeoff: "One-off pen tests can miss issues that appear later; combine with ongoing security review and automated checks.",
  },
]
