"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { BlueprintNode, BlueprintNodeCategory } from "@/data/blueprints-flagship"
import { cn } from "@/lib/utils"
import { FileText } from "lucide-react"

const categoryVariant: Record<BlueprintNodeCategory, "default" | "secondary" | "outline"> = {
  Security: "default",
  Performance: "secondary",
  Reliability: "outline",
  Platform: "secondary",
  Delivery: "outline",
}

export interface RelatedNote {
  slug: string
  title: string
}

interface BlueprintPanelProps {
  node: BlueprintNode | null
  relatedNotes?: RelatedNote[]
  className?: string
}

/**
 * Details panel for a blueprint node: What it is, Preferred approach, Trade-offs, Failure modes, Testing strategy.
 * Sticky on desktop when used in a sidebar.
 */
export function BlueprintPanel({ node, relatedNotes = [], className }: BlueprintPanelProps) {
  if (!node) {
    return (
      <div
        className={cn("rounded-xl border border-border/50 bg-muted/20 p-6 text-center", className)}
        role="region"
        aria-label="Node details"
      >
        <p className="text-sm text-muted-foreground">
          Click a node to see details.
        </p>
      </div>
    )
  }

  const { label, category, description, sections } = node

  return (
    <Card
      className={cn("border-border/50 bg-card/50 overflow-hidden", className)}
      role="region"
      aria-labelledby="blueprint-panel-title"
    >
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 id="blueprint-panel-title" className="text-lg font-semibold tracking-tight text-foreground">
            {label}
          </h2>
          <Badge variant={categoryVariant[category]} className="text-[10px] font-medium uppercase">
            {category}
          </Badge>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <section>
          <h3 className="font-medium text-foreground mb-1">What it is</h3>
          <p className="leading-relaxed text-muted-foreground">{sections.whatItIs}</p>
        </section>
        <section>
          <h3 className="font-medium text-foreground mb-1">Preferred approach</h3>
          <p className="leading-relaxed text-muted-foreground">{sections.preferredApproach}</p>
        </section>
        <section>
          <h3 className="font-medium text-foreground mb-1">Trade-offs</h3>
          <p className="leading-relaxed text-muted-foreground">{sections.tradeOffs}</p>
        </section>
        <section>
          <h3 className="font-medium text-foreground mb-1">Failure modes</h3>
          <p className="leading-relaxed text-muted-foreground">{sections.failureModes}</p>
        </section>
        <section>
          <h3 className="font-medium text-foreground mb-1">Testing strategy</h3>
          <p className="leading-relaxed text-muted-foreground">{sections.testingStrategy}</p>
        </section>
        {relatedNotes.length > 0 && (
          <section aria-labelledby="related-notes-heading">
            <h3 id="related-notes-heading" className="font-medium text-foreground mb-2 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-muted-foreground" aria-hidden />
              Read related notes
            </h3>
            <ul className="space-y-1.5">
              {relatedNotes.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-1 -mx-1 min-h-[44px] inline-flex items-center"
                  >
                    {note.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </CardContent>
    </Card>
  )
}
