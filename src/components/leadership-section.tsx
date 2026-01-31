import { Users, Rocket, Shield, Handshake, Award, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Icons mapped to leadership themes
const leadershipIcons = [
  Users,      // Team leadership
  Rocket,     // Delivery/release
  Shield,     // Quality/reliability
  Handshake,  // Cross-functional
  Award,      // Mentorship
  TrendingUp, // Growth
]

interface LeadershipSectionProps {
  highlights: string[]
  className?: string
}

/**
 * Leadership highlights section for EM/Tech Lead positioning.
 * Clean card-based list optimized for mobile readability.
 */
export function LeadershipSection({ highlights, className }: LeadershipSectionProps) {
  if (!highlights || highlights.length === 0) return null

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight, index) => {
          const Icon = leadershipIcons[index % leadershipIcons.length]
          
          return (
            <Card 
              key={index} 
              className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md"
            >
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <Icon className="h-4 w-4" aria-hidden="true" />
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
