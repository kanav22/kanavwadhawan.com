import { cn } from "@/lib/utils"

export interface ImpactStat {
  value: string
  label: string
}

interface ImpactStatsProps {
  stats: ImpactStat[]
  className?: string
}

/**
 * Impact stats section - high-contrast metrics with large numbers.
 * Mobile-first with responsive grid and increased gap on mobile.
 */
export function ImpactStats({ stats, className }: ImpactStatsProps) {
  if (!stats || stats.length === 0) return null

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 md:gap-8",
        className
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border/50 bg-muted/30 px-4 py-6 text-center transition-all duration-300 hover:border-border hover:bg-muted/50 sm:px-6 sm:py-8"
        >
          <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {stat.value}
          </p>
          <p className="mt-2 text-xs font-medium text-muted-foreground sm:mt-3 sm:text-sm">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
