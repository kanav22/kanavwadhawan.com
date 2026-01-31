"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { Container } from "@/components/container"
import { BlueprintDiagram } from "@/components/manifesto/BlueprintDiagram"
import { BlueprintPanel } from "@/components/manifesto/BlueprintPanel"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { getNodeDetail } from "@/data/blueprints"

function useIsMobile() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(max-width: 767px)")
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false),
    () => false
  )
}

export function BlueprintsClient() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const detail = selectedNodeId ? getNodeDetail(selectedNodeId) ?? null : null
  const sheetOpen = isMobile && selectedNodeId !== null

  return (
    <main className="py-8 sm:py-12 md:py-16">
      <Container className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Architecture Blueprints
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Standard Fintech Mobile Ecosystem — click a node for details.
            </p>
          </div>
          <Link
            href="/manifesto"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline min-h-[44px] flex items-center w-fit"
          >
            ← Manifesto
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <BlueprintDiagram
            onNodeSelect={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
          />
          {!isMobile && (
            <div className="lg:min-w-[320px]">
              <BlueprintPanel detail={detail} />
            </div>
          )}
        </div>
      </Container>

      <Sheet open={sheetOpen} onOpenChange={(open) => !open && setSelectedNodeId(null)}>
        <SheetContent side="bottom" showCloseButton={false} className="h-[85vh] overflow-y-auto rounded-t-2xl">
          <SheetHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
            <SheetTitle className="text-lg font-semibold">
              {detail?.title ?? "Node details"}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon-lg" aria-label="Close">
                ×
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="mt-4">
            <BlueprintPanel detail={detail} />
          </div>
        </SheetContent>
      </Sheet>
    </main>
  )
}
