"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { NodeDetail } from "@/data/blueprints"

interface BlueprintPanelProps {
  detail: NodeDetail | null
  className?: string
}

/**
 * Panel content for a blueprint node: What it is, Preferred approach, Trade-offs, Failure modes, How I test.
 * Used inside BlueprintDiagram (desktop) or Sheet (mobile).
 */
export function BlueprintPanel({ detail, className }: BlueprintPanelProps) {
  if (!detail) {
    return (
      <div
        className={className}
        role="region"
        aria-label="Node details"
      >
        <p className="text-sm text-muted-foreground">
          Click a node to see details.
        </p>
      </div>
    )
  }

  return (
    <Card
      className={className}
      role="region"
      aria-labelledby="blueprint-panel-title"
    >
      <CardHeader className="pb-2">
        <h2 id="blueprint-panel-title" className="text-lg font-semibold tracking-tight text-foreground">
          {detail.title}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <h3 className="mb-1 font-medium text-foreground">What it is</h3>
          <p className="leading-relaxed text-muted-foreground">{detail.whatItIs}</p>
        </div>
        <div>
          <h3 className="mb-1 font-medium text-foreground">My preferred approach</h3>
          <p className="leading-relaxed text-muted-foreground">{detail.preferredApproach}</p>
        </div>
        <div>
          <h3 className="mb-1 font-medium text-foreground">Trade-offs</h3>
          <p className="leading-relaxed text-muted-foreground">{detail.tradeOffs}</p>
        </div>
        <div>
          <h3 className="mb-1 font-medium text-foreground">Common failure modes</h3>
          <p className="leading-relaxed text-muted-foreground">{detail.commonFailureModes}</p>
        </div>
        <div>
          <h3 className="mb-1 font-medium text-foreground">How I test it</h3>
          <p className="leading-relaxed text-muted-foreground">{detail.howITestIt}</p>
        </div>
      </CardContent>
    </Card>
  )
}
