import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"
import { blueprintNodes } from "@/data/blueprints-flagship"
import { getNotesByBlueprintNodeId } from "@/data/notes"
import { BlueprintsClient } from "./BlueprintsClient"

export const metadata: Metadata = generatePageMetadata({
  title: "Architecture Blueprints",
  description: `Standard Fintech Mobile Ecosystem by ${profile.name}: interactive diagram of App Shell, Offline Cache & Sync, Auth & Session, Biometric Bridge, Secure Storage, API Gateway, Risk Engine, Payments, Feature Flags, Observability, Push/Messaging, Release & CI/CD. How I design secure, scalable fintech mobile systems.`,
  path: "/blueprints",
})

export default function BlueprintsPage() {
  const relatedNotesByNodeId: Record<string, { slug: string; title: string }[]> = {}
  for (const node of blueprintNodes) {
    relatedNotesByNodeId[node.id] = getNotesByBlueprintNodeId(node.id)
  }
  return <BlueprintsClient relatedNotesByNodeId={relatedNotesByNodeId} />
}
