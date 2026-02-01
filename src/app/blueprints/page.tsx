import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"
import { BlueprintsClient } from "./BlueprintsClient"

export const metadata: Metadata = generatePageMetadata({
  title: "Architecture Blueprints",
  description: `Standard Fintech Mobile Ecosystem by ${profile.name}: interactive diagram of App Shell, Offline Cache & Sync, Auth & Session, Biometric Bridge, Secure Storage, API Gateway, Risk Engine, Payments, Feature Flags, Observability, Push/Messaging, Release & CI/CD. How I design secure, scalable fintech mobile systems.`,
  path: "/blueprints",
})

export default function BlueprintsPage() {
  return <BlueprintsClient />
}
