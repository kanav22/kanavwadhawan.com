"use client"

import { useState } from "react"
import { ChevronDown, Layers, Shield, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ExpertiseCategory, ExpertiseItem } from "@/data/profile"

const categoryIcons = {
  "Core Architecture": Layers,
  "Fintech & Security": Shield,
  "Leadership": Users,
}

function isExpertiseItem(item: string | ExpertiseItem): item is ExpertiseItem {
  return typeof item === "object" && item !== null && "name" in item && "value" in item
}

interface ExpertiseCategoryBlockProps {
  category: ExpertiseCategory
  defaultVisible?: number
}

function ExpertiseCategoryBlock({
  category,
  defaultVisible = 4,
}: ExpertiseCategoryBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasMore = category.items.length > defaultVisible
  const visibleItems = isExpanded
    ? category.items
    : category.items.slice(0, defaultVisible)
  const Icon =
    categoryIcons[category.title as keyof typeof categoryIcons] ?? Layers

  return (
    <div className="group rounded-xl border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md sm:p-6">
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">
          {category.title}
        </h3>
      </div>
      <div className="flex flex-col gap-2 sm:flex-wrap sm:flex-row sm:gap-x-4 sm:gap-y-2">
        {visibleItems.map((item) => {
          const key = isExpertiseItem(item) ? item.name : item
          const label = isExpertiseItem(item) ? item.name : item
          const value = isExpertiseItem(item) ? item.value : null
          return (
            <div key={key} className="flex flex-col gap-0.5 sm:max-w-[16rem]">
              <Badge
                variant="secondary"
                className="w-fit rounded-md px-2.5 py-1 text-xs font-medium transition-colors sm:px-3 sm:py-1.5 sm:text-sm"
              >
                {label}
              </Badge>
              {value && (
                <span className="text-[10px] leading-tight text-muted-foreground sm:text-xs">
                  {value}
                </span>
              )}
            </div>
          )
        })}
      </div>
      {hasMore && (
        <Button
          variant="ghost"
          size="touch"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 w-full sm:w-auto justify-center sm:justify-start gap-1 px-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:mt-4 sm:min-h-0 sm:min-w-0 sm:h-8"
        >
          {isExpanded ? "Show less" : `Show ${category.items.length - defaultVisible} more`}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
            aria-hidden="true"
          />
        </Button>
      )}
    </div>
  )
}

interface ExpertiseSectionProps {
  categories: ExpertiseCategory[]
  className?: string
}

/**
 * Professional expertise section with categorized badges.
 * Senior/lead positioning with Core Architecture, Fintech, Leadership.
 */
export function ExpertiseSection({
  categories,
  className,
}: ExpertiseSectionProps) {
  if (!categories || categories.length === 0) return null

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8",
        className
      )}
    >
      {categories.map((category) => (
        <ExpertiseCategoryBlock
          key={category.title}
          category={category}
          defaultVisible={4}
        />
      ))}
    </div>
  )
}
