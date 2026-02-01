"use client"

import { useState } from "react"
import { ChevronDown, Cpu, Gauge, Shield, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  "Mobile Architecture & Platform": Cpu,
  "Reliability & Performance Culture": Gauge,
  "Fintech Security": Shield,
  "Delivery & Quality": Truck,
}

const DEFAULT_VISIBLE = 8

interface CapabilitiesSectionProps {
  categories: { title: string; items: string[] }[]
  className?: string
}

function CapabilityBlock({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasMore = items.length > DEFAULT_VISIBLE
  const visibleItems = isExpanded ? items : items.slice(0, DEFAULT_VISIBLE)
  const Icon = categoryIcons[title] ?? Cpu

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md sm:p-6">
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {visibleItems.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="rounded-md px-2.5 py-1 text-xs font-medium sm:px-3 sm:py-1 sm:text-sm"
          >
            {item}
          </Badge>
        ))}
      </div>
      {hasMore && (
        <Button
          variant="ghost"
          size="touch"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 w-full justify-center gap-1 text-xs text-muted-foreground hover:text-foreground sm:mt-4 sm:min-h-0 sm:min-w-0 sm:h-8 sm:w-auto sm:justify-start"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show less" : `Show ${items.length - DEFAULT_VISIBLE} more`}
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform duration-200", isExpanded && "rotate-180")}
            aria-hidden="true"
          />
        </Button>
      )}
    </div>
  )
}

/**
 * Capabilities section — 4 groups with badges and Show more. Replaces Skills as leadership-focused.
 */
export function CapabilitiesSection({ categories, className }: CapabilitiesSectionProps) {
  if (!categories?.length) return null

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8",
        className
      )}
    >
      {categories.map((cat) => (
        <CapabilityBlock key={cat.title} title={cat.title} items={cat.items} />
      ))}
    </div>
  )
}
