"use client"

import { Users, Award, Rocket, Boxes } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LeadershipEntry } from "@/data/leadership"

const themeIcons = {
  scaling: Users,
  mentorship: Award,
  process: Rocket,
  platform: Boxes,
}

interface TimelineProps {
  entries: LeadershipEntry[]
  className?: string
}

/**
 * Leadership timeline: title, time range, outcome, what I did, signals of success.
 * Mobile-first: stacked cards.
 */
export function Timeline({ entries, className }: TimelineProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {entries.map((entry) => {
        const Icon = themeIcons[entry.theme]
        return (
          <Card
            key={entry.id}
            className="border-border/50 bg-card/50 transition-all duration-200 hover:border-border hover:bg-card"
          >
            <CardContent className="p-5 sm:p-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {entry.title}
                    </h3>
                    {entry.timeRange && (
                      <span className="text-xs text-muted-foreground tabular-nums sm:text-sm">
                        {entry.timeRange}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {entry.outcome}
                  </p>
                  <ul className="space-y-1 text-sm text-foreground/90">
                    {entry.whatIDid.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-border/40">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                      Signals of success
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {entry.signalsOfSuccess.map((bullet, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
