"use client"

import Link from "next/link"
import { ArrowRight, Layers, Gauge, Users, Shield } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ManifestoFeature } from "@/data/manifesto"

const iconMap = {
  blueprints: Layers,
  performance: Gauge,
  leadership: Users,
  security: Shield,
}

interface ManifestoCardProps {
  feature: ManifestoFeature
  className?: string
}

/**
 * Feature card for Manifesto landing: title, description, link.
 * Mobile-first: full-width tap target >= 44px.
 */
export function ManifestoCard({ feature, className }: ManifestoCardProps) {
  const Icon = iconMap[feature.icon]

  return (
    <Link
      href={feature.href}
      className={cn("block min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl", className)}
      aria-label={`${feature.title}: ${feature.description}`}
    >
      <Card className="h-full border-border/50 bg-card/50 transition-all duration-200 hover:border-border hover:bg-card hover:shadow-md">
        <CardContent className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {feature.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </CardContent>
        <CardFooter className="mt-auto border-t border-border/40 p-4 pt-3 sm:p-5 sm:pt-4">
          <span className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1.5 text-sm font-medium text-primary sm:min-h-0 sm:min-w-0">
            Explore
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
