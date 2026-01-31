"use client"

import Link from "next/link"
import { Gauge, Zap, Activity, Wifi } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { PerformanceScorecard } from "@/data/performance"

const metricIcons = [Gauge, Zap, Activity, Wifi]

interface MetricCardProps {
  scorecard: PerformanceScorecard
  className?: string
}

/**
 * Benchmark card for Performance Scorecards: project name, metrics with value + how, optional link.
 * Mobile: 1 col; md: 2; lg: 3.
 */
export function MetricCard({ scorecard, className }: MetricCardProps) {
  return (
    <Card
      className={cn(
        "border-border/50 bg-card/50 transition-all duration-200 hover:border-border hover:bg-card",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {scorecard.projectName}
          </h3>
          {scorecard.projectSlug && (
            <Link
              href={`/projects/${scorecard.projectSlug}`}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline min-h-[44px] flex items-center sm:min-h-0"
              aria-label={`View ${scorecard.projectName} project`}
            >
              View project
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {scorecard.metrics.map((metric, index) => {
          const Icon = metricIcons[index % metricIcons.length]
          return (
            <div key={metric.label} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{metric.label}</span>
                  {metric.valueLabel === "representative" && (
                    <Badge variant="secondary" className="text-[10px] font-normal">
                      Representative
                    </Badge>
                  )}
                  {metric.valueLabel === "target" && (
                    <Badge variant="outline" className="text-[10px] font-normal">
                      Target
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-medium tabular-nums text-foreground">{metric.value}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{metric.how}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
