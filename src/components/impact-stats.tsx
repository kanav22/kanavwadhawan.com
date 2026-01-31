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
 * Impact stats section - high-contrast, minimalist metrics.
 * Mobile-first with responsive grid.
 */
export function ImpactStats({ stats, className }: ImpactStatsProps) {
  if (!stats || stats.length === 0) return null

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6",
        className
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border/50 bg-muted/30 px-4 py-5 text-center transition-all duration-300 hover:border-border hover:bg-muted/50 sm:px-6 sm:py-6"
        >
          <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {stat.value}
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground sm:mt-2 sm:text-sm">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
