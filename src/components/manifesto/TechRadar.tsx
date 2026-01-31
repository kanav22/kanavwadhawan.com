"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { RadarItem, RadarRing } from "@/data/radar"
import { radarRings } from "@/data/radar"

interface TechRadarProps {
  items: RadarItem[]
  className?: string
}

const ringOrder: RadarRing[] = ["adopt", "trial", "assess", "hold"]
const ringColors: Record<RadarRing, string> = {
  adopt: "border-primary/40 bg-primary/5",
  trial: "border-chart-2/40 bg-chart-2/5",
  assess: "border-chart-4/40 bg-chart-4/5",
  hold: "border-muted-foreground/30 bg-muted/30",
}

/**
 * Thoughtworks-style radar: quadrants as sections, rings (Adopt/Trial/Assess/Hold).
 * HTML/CSS only; no chart lib. Mobile: stacked sections.
 */
export function TechRadar({ items, className }: TechRadarProps) {
  const byRing = ringOrder.map((ring) => ({
    ring,
    label: radarRings.find((r) => r.id === ring)?.label ?? ring,
    items: items.filter((i) => i.ring === ring),
  }))

  return (
    <div className={cn("space-y-6", className)}>
      {byRing.map(({ ring, label, items: ringItems }) => (
        <div key={ring} className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </h3>
          <div
            className={cn(
              "rounded-xl border p-4 sm:p-5",
              ringColors[ring]
            )}
          >
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {ringItems.map((item) => (
                <li key={item.id}>
                  <Card className="border-0 bg-background/60 shadow-none transition-colors hover:bg-background/80">
                    <CardContent className="p-3 sm:p-4">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {item.rationale}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
