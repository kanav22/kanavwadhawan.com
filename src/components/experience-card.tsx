import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Experience } from "@/data/experience"

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="relative border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card">
      {/* Timeline indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-foreground/80 via-foreground/40 to-foreground/10" />
      
      <CardHeader className="pb-4 pl-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground">
              {experience.role}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              {experience.company}
            </p>
            <p className="text-xs text-muted-foreground/80">
              {experience.location}
            </p>
          </div>
          <Badge 
            variant="outline" 
            className="w-fit shrink-0 rounded-md border-border/60 px-2.5 py-1 text-xs font-normal tabular-nums"
          >
            {experience.startDate} — {experience.endDate}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pl-7 pt-0">
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {experience.description}
        </p>
        <ul className="space-y-2.5">
          {experience.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3 text-sm leading-relaxed">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
              <span className="text-foreground/90">{highlight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
