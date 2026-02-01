import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Smartphone, Lock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
}

// Platform icon colors
const platformColors: Record<string, string> = {
  Android: "text-green-600 dark:text-green-500",
  iOS: "text-blue-600 dark:text-blue-500",
  "React Native": "text-cyan-600 dark:text-cyan-500",
  "Cross-Platform": "text-purple-600 dark:text-purple-500",
}

/**
 * Responsive project card with company logo, platform chips, and app store links.
 * - Fixed aspect ratio for images
 * - Proper tap targets (44px+)
 * - No horizontal overflow
 * - Shows availability label for private/enterprise apps
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const hasStoreLinks = project.googlePlayUrl || project.appStoreUrl
  const showAvailabilityLabel = project.isPrivate || project.availabilityLabel

  return (
    <Card className="group flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
      {/* Project Image - Links to detail page */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg border-b border-border/50 bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized={project.image.endsWith(".svg")}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>

      <CardHeader className="space-y-2 p-4 pb-2 sm:space-y-3 sm:p-5 sm:pb-3">
        {/* Platform chips + Tags row */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          {/* Platform badges */}
          {project.platform?.map((platform) => (
            <Badge
              key={platform}
              variant="outline"
              className="gap-1 rounded-md border-border/60 px-1.5 py-0.5 text-[10px] font-medium sm:px-2 sm:text-[11px]"
            >
              <Smartphone className={`h-2.5 w-2.5 ${platformColors[platform] || ""}`} aria-hidden="true" />
              {platform}
            </Badge>
          ))}
          {/* Category tags */}
          {project.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide sm:px-2 sm:text-[11px]"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Company logo + Title */}
        <div className="flex items-start gap-3">
          {project.companyLogo ? (
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-muted sm:h-9 sm:w-9">
              <Image
                src={project.companyLogo}
                alt={`${project.company} logo`}
                fill
                unoptimized={project.companyLogo.endsWith(".svg")}
                className="object-contain p-1"
                sizes="36px"
              />
            </div>
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground sm:h-9 sm:w-9">
              {project.company.charAt(0)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <Link href={`/projects/${project.slug}`}>
              <CardTitle className="text-base font-semibold leading-snug tracking-tight transition-colors hover:text-foreground/80 sm:text-lg">
                {project.title}
              </CardTitle>
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">{project.company}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-2 px-4 pb-3 pt-0 sm:space-y-3 sm:px-5 sm:pb-4">
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {project.description}
        </p>
        <p className="text-xs font-medium text-foreground sm:text-sm">
          {project.impact}
        </p>
      </CardContent>

      {/* Tech Stack */}
      <CardContent className="px-4 pb-3 pt-0 sm:px-5 sm:pb-4">
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="rounded-md border-border/60 px-1.5 py-0.5 text-[10px] font-normal sm:px-2 sm:text-[11px]"
            >
              {tech}
            </Badge>
          ))}
          {project.stack.length > 3 && (
            <Badge
              variant="outline"
              className="rounded-md border-border/60 px-1.5 py-0.5 text-[10px] font-normal sm:px-2 sm:text-[11px]"
            >
              +{project.stack.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer with CTAs */}
      <CardFooter className="flex flex-wrap gap-2 border-t border-border/50 p-3 sm:p-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-10 flex-1 gap-1.5 text-sm font-medium transition-colors hover:bg-accent sm:h-9 sm:flex-none sm:text-xs"
        >
          <Link href={`/projects/${project.slug}`}>
            View Details
            <ArrowUpRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          </Link>
        </Button>

        {/* Store links or availability label */}
        {hasStoreLinks ? (
          <>
            {project.googlePlayUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-10 gap-1.5 text-sm font-medium sm:h-9 sm:text-xs"
              >
                <a
                  href={project.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on Google Play`}
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Play Store</span>
                  <span className="sm:hidden">Android</span>
                </a>
              </Button>
            )}
            {project.appStoreUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-10 gap-1.5 text-sm font-medium sm:h-9 sm:text-xs"
              >
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on App Store`}
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">App Store</span>
                  <span className="sm:hidden">iOS</span>
                </a>
              </Button>
            )}
          </>
        ) : showAvailabilityLabel ? (
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground sm:text-xs">
            <Lock className="h-3 w-3" aria-hidden="true" />
            {project.availabilityLabel || "Private app"}
          </span>
        ) : null}
      </CardFooter>
    </Card>
  )
}
