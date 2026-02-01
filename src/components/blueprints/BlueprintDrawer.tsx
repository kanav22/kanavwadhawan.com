"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { BlueprintPanel, type RelatedNote } from "./BlueprintPanel"
import type { BlueprintNode } from "@/data/blueprints-flagship"

interface BlueprintDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  node: BlueprintNode | null
  relatedNotes?: RelatedNote[]
  /** Accessible label for close button */
  closeLabel?: string
}

/**
 * Full-screen drawer (Sheet) for mobile: shows node details with Close button.
 * Focus trap and aria handled by Radix Sheet.
 */
export function BlueprintDrawer({
  open,
  onOpenChange,
  node,
  relatedNotes = [],
  closeLabel = "Close",
}: BlueprintDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="h-[90vh] overflow-y-auto rounded-t-2xl"
        aria-describedby={node ? "blueprint-drawer-content" : undefined}
      >
        <SheetHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
          <SheetTitle id="blueprint-drawer-title">
            {node ? node.label : "Node details"}
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="touch"
              className="min-h-[48px] min-w-[48px] rounded-lg"
              aria-label={closeLabel}
            >
              {closeLabel}
            </Button>
          </SheetClose>
        </SheetHeader>
        <div id="blueprint-drawer-content" className="mt-4">
          <BlueprintPanel node={node} relatedNotes={relatedNotes} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
