import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Experience } from "@/data/experience"

interface ExperienceCardProps {
  experience: Experience
}

/**
 * Formats text to bold numbers/percentages (e.g., 35%, 10M+, 50%).
 */
function formatHighlightWithBoldMetrics(text: string): React.ReactNode {
  // Match numbers with optional suffixes like %, M+, K+, +, x, days, hours, etc.
  const regex = /(\d+(?:\.\d+)?(?:%|M\+?|K\+?|\+|x)?(?:\s*(?:days?|hours?|engineers?))?)/gi
  const parts = text.split(regex)
  
  return parts.map((part, i) => {
    if (regex.test(part)) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part}
        </strong>
      )
    }
    // Reset regex lastIndex for next test
    regex.lastIndex = 0
    if (/(\d+(?:\.\d+)?(?:%|M\+?|K\+?|\+|x)?(?:\s*(?:days?|hours?|engineers?))?)/i.test(part)) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part}
        </strong>
      )
    }
    return part
  })
}

/**
 * Experience card with split-layout on desktop:
 * - Left column: Logo, Company, Role, Dates
 * - Right column: Impact bullets
 * Mobile: stacked layout with increased spacing.
 */
export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="relative border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card overflow-hidden">
      {/* Timeline indicator - Hidden on mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-foreground/80 via-foreground/40 to-foreground/10 hidden md:block" />
      
      <CardContent className="p-5 sm:p-6 md:p-8 md:pl-10">
        {/* Split layout: 1fr for meta, 2.5fr for content on md+ */}
        <div className="grid gap-6 md:grid-cols-[1fr_2.5fr] md:gap-8">
          {/* Left column: Company meta */}
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex items-start gap-3 md:flex-col md:items-start md:gap-3">
              {/* Company Logo */}
              {experience.companyLogo ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted md:h-14 md:w-14">
                  <Image
                    src={experience.companyLogo}
                    alt={`${experience.company} logo`}
                    fill
                    unoptimized={experience.companyLogo.endsWith(".svg")}
                    className="object-contain p-2"
                    sizes="56px"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-semibold text-muted-foreground md:h-14 md:w-14">
                  {experience.company.charAt(0)}
                </div>
              )}

              <div className="space-y-1 md:space-y-1.5">
                <p className="text-sm font-semibold text-foreground md:text-base">
                  {experience.company}
                </p>
                <h3 className="text-sm font-medium text-muted-foreground md:text-sm">
                  {experience.role}
                </h3>
                <p className="text-xs text-muted-foreground/80">
                  {experience.location}
                </p>
              </div>
            </div>
            
            <Badge 
              variant="outline" 
              className="w-fit shrink-0 rounded-md border-border/60 px-2.5 py-1 text-xs font-normal tabular-nums"
            >
              {experience.startDate} — {experience.endDate}
            </Badge>
          </div>

          {/* Right column: Impact bullets */}
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {experience.description}
            </p>
            
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Leadership Impact
              </p>
              <ul className="space-y-3 md:space-y-4">
                {experience.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
                    <span className="text-sm leading-relaxed text-foreground/90 md:text-base">
                      {formatHighlightWithBoldMetrics(highlight)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
