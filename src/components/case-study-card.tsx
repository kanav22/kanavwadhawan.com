import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Cpu, Users, Layers } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"

interface CaseStudyCardProps {
  project: Project
}

/**
 * Case study card for key roles - architectural challenge, leadership, technical stack.
 * Senior/lead positioning with structured sections.
 */
export function CaseStudyCard({ project }: CaseStudyCardProps) {
  const architecturalChallenge = project.challenges?.[0] ?? project.description
  const leadershipImpact = project.team
    ? `${project.team}. ${project.results?.[0] ?? project.impact}`
    : project.impact
  const techStack = project.stack?.slice(0, 4) ?? []

  return (
    <Card className="group flex flex-col overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg">
      {/* Header with image */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            {project.companyLogo && (
              <div className="relative h-8 w-8 overflow-hidden rounded-md bg-background/90 sm:h-9 sm:w-9">
                <Image
                  src={project.companyLogo}
                  alt=""
                  fill
                  className="object-contain p-1"
                  sizes="36px"
                />
              </div>
            )}
            <Badge
              variant="secondary"
              className="text-[10px] font-medium uppercase sm:text-[11px]"
            >
              {project.tags[0] ?? "Case Study"}
            </Badge>
          </div>
        </div>
      </Link>

      <CardHeader className="space-y-1 p-4 pb-2 sm:p-5 sm:pb-3">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-semibold tracking-tight transition-colors hover:text-foreground/80 sm:text-xl">
            {project.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{project.company} · {project.duration}</p>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 px-4 pb-4 sm:px-5 sm:pb-5">
        {/* Architectural Challenge */}
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              The Challenge
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {architecturalChallenge}
          </p>
        </div>

        {/* Leadership Impact */}
        {leadershipImpact && (
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Leadership Impact
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {leadershipImpact}
            </p>
          </div>
        )}

        {/* Technical Stack */}
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="rounded-md border-border/60 px-2 py-0.5 text-[10px] font-normal sm:text-[11px]"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border/50 p-4 pt-3 sm:p-5 sm:pt-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-9 gap-1.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Link href={`/projects/${project.slug}`}>
            Read case study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
