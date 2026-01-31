import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"
import { BlueprintsClient } from "./BlueprintsClient"

export const metadata: Metadata = generatePageMetadata({
  title: "Architecture Blueprints",
  description: `Interactive diagram: Standard Fintech Mobile Ecosystem by ${profile.name}. Nodes: App Shell, Offline Cache, Auth, Biometric, Risk, API Gateway, Observability, Feature Flags, Payments, Messaging, Data Sync, Keystore.`,
  path: "/manifesto/blueprints",
})

export default function BlueprintsPage() {
  return <BlueprintsClient />
}
