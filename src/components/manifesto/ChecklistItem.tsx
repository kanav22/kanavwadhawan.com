"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SecurityItem } from "@/data/security"

interface ChecklistItemProps {
  item: SecurityItem
  className?: string
}

/**
 * Expandable security checklist item: title, why it matters, how I implement, gotcha.
 * Checkbox is visual only (data-driven); expand/collapse for details.
 */
export function ChecklistItem({ item, className }: ChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className={cn(
        "border-border/50 bg-card/50 transition-all duration-200 overflow-hidden",
        className
      )}
    >
      <CardContent className="p-0">
        <Button
          variant="ghost"
          className="w-full min-h-[48px] justify-between gap-2 rounded-none px-4 py-3 text-left font-medium hover:bg-accent/50 sm:min-h-[52px] sm:px-5 sm:py-4"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`checklist-detail-${item.id}`}
          id={`checklist-trigger-${item.id}`}
        >
          <span className="flex items-center gap-2">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-primary bg-primary/10 text-primary"
              aria-hidden
            >
              <Check className="h-3 w-3" />
            </span>
            {item.title}
          </span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isExpanded && "rotate-180")}
            aria-hidden
          />
        </Button>
        <div
          id={`checklist-detail-${item.id}`}
          role="region"
          aria-labelledby={`checklist-trigger-${item.id}`}
          className={cn(
            "grid transition-all duration-200 ease-out",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border/40 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4 space-y-4">
              <p className="text-sm font-medium text-foreground">{item.whyItMatters}</p>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  How I implement it
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {item.howIImplement.map((bullet, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/90">Gotcha / trade-off: </span>
                {item.gotchaOrTradeoff}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
