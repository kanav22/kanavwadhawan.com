import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
}

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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>

      <CardHeader className="space-y-3 pb-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="rounded-md px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/projects/${project.slug}`}>
          <CardTitle className="text-lg font-semibold leading-snug tracking-tight hover:text-foreground/80 transition-colors">
            {project.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <p className="text-sm font-medium text-foreground">
          {project.impact}
        </p>
      </CardContent>

      <CardContent className="pb-4 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge 
              key={tech} 
              variant="outline" 
              className="rounded-md border-border/60 px-2 py-0.5 text-[11px] font-normal"
            >
              {tech}
            </Badge>
          ))}
          {project.stack.length > 4 && (
            <Badge 
              variant="outline" 
              className="rounded-md border-border/60 px-2 py-0.5 text-[11px] font-normal"
            >
              +{project.stack.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t border-border/50 pt-4">
        <Button 
          asChild 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1.5 text-xs font-medium transition-colors hover:bg-accent"
        >
          <Link href={`/projects/${project.slug}`}>
            View Details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
