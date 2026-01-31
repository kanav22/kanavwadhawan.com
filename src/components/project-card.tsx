import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
}

/**
 * Responsive project card with company logo and app store links.
 * - Fixed aspect ratio for images
 * - Proper tap targets (44px+)
 * - No horizontal overflow
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
      {/* Project Image - Links to detail page */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>

      <CardHeader className="space-y-2 p-4 pb-2 sm:space-y-3 sm:p-5 sm:pb-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {project.tags.map((tag) => (
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
          {project.companyLogo && (
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-muted sm:h-9 sm:w-9">
              <Image
                src={project.companyLogo}
                alt={`${project.company} logo`}
                fill
                className="object-contain p-1"
                sizes="36px"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <Link href={`/projects/${project.slug}`}>
              <CardTitle className="text-base font-semibold leading-snug tracking-tight hover:text-foreground/80 transition-colors sm:text-lg">
                {project.title}
              </CardTitle>
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">{project.company}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-2 px-4 pb-3 pt-0 sm:space-y-3 sm:px-5 sm:pb-4">
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 sm:text-sm">
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
          className="h-10 flex-1 gap-1.5 text-sm font-medium transition-colors hover:bg-accent sm:h-8 sm:flex-none sm:text-xs"
        >
          <Link href={`/projects/${project.slug}`}>
            View Details
            <ArrowUpRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          </Link>
        </Button>
        
        {project.googlePlayUrl && (
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="h-10 gap-1.5 text-sm font-medium sm:h-8 sm:text-xs"
          >
            <a 
              href={project.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on Google Play`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Play Store</span>
              <span className="sm:hidden">App</span>
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
