"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { BlueprintNode, BlueprintNodeCategory } from "@/data/blueprints-flagship"
import { cn } from "@/lib/utils"

const categoryVariant: Record<BlueprintNodeCategory, "default" | "secondary" | "outline"> = {
  Security: "default",
  Performance: "secondary",
  Reliability: "outline",
  Platform: "secondary",
  Delivery: "outline",
}

interface BlueprintNodeCardProps {
  node: BlueprintNode
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Compact card for a node (list fallback / search results). Click to select.
 */
export function BlueprintNodeCard({
  node,
  isSelected,
  onClick,
  className,
}: BlueprintNodeCardProps) {
  return (
    <Card
      className={cn(
        "border-border/50 bg-card/50 transition-all cursor-pointer",
        "hover:border-border hover:bg-card hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isSelected && "ring-2 ring-primary border-primary/50",
        className
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`${node.label}, ${node.category}. ${node.description}`}
    >
      <CardContent className="flex flex-wrap items-center gap-2 p-3 sm:p-4">
        <span className="font-medium text-foreground text-sm">{node.label}</span>
        <Badge variant={categoryVariant[node.category]} className="text-[10px] font-medium uppercase">
          {node.category}
        </Badge>
        <span className="sr-only">{node.description}</span>
      </CardContent>
    </Card>
  )
}
