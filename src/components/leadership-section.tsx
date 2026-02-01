import { Users, Rocket, Shield, Handshake, Award, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const leadershipIcons = [
  Users,
  Rocket,
  Shield,
  Handshake,
  Award,
  TrendingUp,
]

const leadershipTitles = [
  "Team scaling",
  "Delivery velocity",
  "Quality & reliability",
  "P&L & scale",
  "Mentorship",
  "Cross-functional impact",
  "Process & delivery",
]

interface LeadershipSectionProps {
  highlights: string[]
  className?: string
}

/**
 * Leadership highlights section for EM/Tech Lead positioning.
 * Bold lead-in titles, reduced density, consistent card heights.
 */
export function LeadershipSection({ highlights, className }: LeadershipSectionProps) {
  if (!highlights || highlights.length === 0) return null

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight, index) => {
          const Icon = leadershipIcons[index % leadershipIcons.length]
          const title = leadershipTitles[index] ?? "Highlight"
          return (
            <Card
              key={index}
              className="group flex flex-col border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md"
            >
              <CardContent className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {highlight}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
