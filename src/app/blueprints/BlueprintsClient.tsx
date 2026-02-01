"use client"

import { useState, useEffect, useCallback, useSyncExternalStore } from "react"
import { Container } from "@/components/container"
import { BlueprintDiagram } from "@/components/blueprints/BlueprintDiagram"
import { BlueprintPanel } from "@/components/blueprints/BlueprintPanel"
import { BlueprintDrawer } from "@/components/blueprints/BlueprintDrawer"
import { BlueprintNodeCard } from "@/components/blueprints/BlueprintNodeCard"
import {
  blueprintNodes,
  blueprintPrinciples,
  getBlueprintNodeById,
  getNodeIdFromHash,
} from "@/data/blueprints-flagship"

export type RelatedNotesByNodeId = Record<string, { slug: string; title: string }[]>

interface BlueprintsClientProps {
  relatedNotesByNodeId?: RelatedNotesByNodeId
}

function useIsMobile() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(max-width: 767px)")
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(max-width: 767px)").matches
        : false,
    () => false
  )
}

export function BlueprintsClient({ relatedNotesByNodeId = {} }: BlueprintsClientProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    () =>
      typeof window !== "undefined"
        ? getNodeIdFromHash(window.location.hash) ?? "auth-session"
        : "auth-session"
  )
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useIsMobile()
  const selectedNode = selectedNodeId ? getBlueprintNodeById(selectedNodeId) ?? null : null
  const relatedNotes = selectedNodeId ? relatedNotesByNodeId[selectedNodeId] ?? [] : []

  useEffect(() => {
    const handler = () => {
      const id = getNodeIdFromHash(window.location.hash)
      if (id) setSelectedNodeId(id)
    }
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])

  useEffect(() => {
    if (selectedNodeId) {
      const hash = `#${selectedNodeId}`
      if (window.location.hash !== hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${hash}`)
      }
    }
  }, [selectedNodeId])

  const handleCopyLink = useCallback((nodeId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${nodeId}`
    void navigator.clipboard.writeText(url)
  }, [])

  const filteredNodes = searchQuery.trim()
    ? blueprintNodes.filter((n) =>
        n.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : blueprintNodes

  return (
    <main className="min-w-0 overflow-x-hidden py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10">
        <header className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Architecture Blueprints
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            How I design secure, scalable fintech mobile systems: offline-first, observability-driven, and performance-budgeted.
          </p>
          <p className="rounded-lg border border-border/50 bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
            Click a node to see my preferred approach, trade-offs, failure modes, and testing strategy.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(280px,40%)] lg:items-start">
          <div className="min-w-0 lg:min-w-[0]">
            <BlueprintDiagram
              selectedNodeId={selectedNodeId}
              onNodeSelect={setSelectedNodeId}
              onCopyLink={handleCopyLink}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          <aside
            className="lg:sticky lg:top-24"
            aria-label="Node details panel"
          >
            {!isMobile && (
              <BlueprintPanel node={selectedNode} relatedNotes={relatedNotes} className="w-full" />
            )}
          </aside>
        </div>

        {searchQuery.trim() && (
          <section aria-label="Search results">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Matching nodes
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNodes.map((node) => (
                <li key={node.id}>
                  <BlueprintNodeCard
                    node={node}
                    isSelected={selectedNodeId === node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-t border-border/40 pt-8 sm:pt-10" aria-labelledby="principles-heading">
          <h2 id="principles-heading" className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Principles
          </h2>
          <ul className="mt-4 space-y-2 sm:mt-6">
            {blueprintPrinciples.map((p) => (
              <li
                key={p.id}
                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" aria-hidden />
                {p.text}
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {isMobile && (
        <BlueprintDrawer
          open={!!selectedNodeId}
          onOpenChange={(open) => !open && setSelectedNodeId(null)}
          node={selectedNode}
          relatedNotes={relatedNotes}
          closeLabel="Close"
        />
      )}
    </main>
  )
}
