import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Experience } from "@/data/experience"

interface ExperienceCardProps {
  experience: Experience
}

/**
 * Responsive experience card with company logo.
 * - Logo displayed inline with company name
 * - Mobile-optimized layout
 */
export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="relative border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card overflow-hidden">
      {/* Timeline indicator - Hidden on mobile for cleaner look */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-foreground/80 via-foreground/40 to-foreground/10 hidden sm:block" />
      
      <CardHeader className="pb-3 sm:pb-4 sm:pl-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3 min-w-0">
            {/* Company Logo */}
            {experience.companyLogo && (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-11 sm:w-11">
                <Image
                  src={experience.companyLogo}
                  alt={`${experience.company} logo`}
                  fill
                  className="object-contain p-1.5"
                  sizes="44px"
                />
              </div>
            )}
            
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <h3 className="text-sm font-semibold leading-tight tracking-tight text-foreground sm:text-base">
                {experience.role}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {experience.company}
              </p>
              <p className="text-xs text-muted-foreground/80">
                {experience.location}
              </p>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className="w-fit shrink-0 rounded-md border-border/60 px-2 py-0.5 text-[10px] font-normal tabular-nums sm:px-2.5 sm:py-1 sm:text-xs"
          >
            {experience.startDate} — {experience.endDate}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 sm:pl-7">
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground sm:mb-4">
          {experience.description}
        </p>
        <ul className="space-y-2 sm:space-y-2.5">
          {experience.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm leading-relaxed sm:gap-3">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-foreground/60 sm:mt-2" />
              <span className="text-foreground/90">{highlight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
