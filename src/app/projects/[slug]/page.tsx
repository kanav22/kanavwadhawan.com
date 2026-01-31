import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Calendar, Users, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/container"
import { JsonLd } from "@/components/json-ld"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"
import { projects, getProjectBySlug, getNextProject, getPreviousProject } from "@/data/projects"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return {}
  }

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.image,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const nextProject = getNextProject(slug)
  const previousProject = getPreviousProject(slug)

  return (
    <>
      {/* JSON-LD */}
      <JsonLd 
        type="webpage" 
        data={{
          title: project.title,
          description: project.description,
          url: `${profile.website}/projects/${project.slug}`,
        }}
      />
      <JsonLd 
        type="breadcrumb" 
        data={{
          items: [
            { name: "Home", url: profile.website },
            { name: "Projects", url: `${profile.website}/projects` },
            { name: project.title, url: `${profile.website}/projects/${project.slug}` },
          ],
        }}
      />

      <article className="py-8 sm:py-12 md:py-16 lg:py-20">
        <Container>
          {/* Back link - Always visible */}
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8 min-h-[44px] sm:min-h-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          {/* Header */}
          <header className="mb-8 sm:mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3 sm:gap-2 sm:mb-4">
              {project.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide sm:text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl mb-3 sm:mb-4">
              {project.title}
            </h1>
            
            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg max-w-3xl">
              {project.longDescription}
            </p>

            {/* Meta info - Stack on mobile */}
            <div className="flex flex-col gap-2 mt-4 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2 sm:mt-6">
              <div className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
                <Briefcase className="h-4 w-4 shrink-0" />
                <span>{project.role}</span>
              </div>
              <div className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>{project.duration}</span>
              </div>
              {project.team && (
                <div className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>{project.team}</span>
                </div>
              )}
            </div>

            {/* Action buttons - Stack on mobile */}
            <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:mt-8">
              {project.liveUrl && (
                <Button asChild className="h-12 w-full rounded-lg text-base sm:h-10 sm:w-auto sm:text-sm">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Live
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" className="h-12 w-full rounded-lg text-base sm:h-10 sm:w-auto sm:text-sm">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </header>

          {/* Hero image - Responsive aspect ratio */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted mb-10 sm:rounded-xl sm:mb-12 md:mb-16">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
            />
          </div>

          {/* Tech stack */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.stack.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline"
                  className="rounded-md px-2 py-1 text-xs sm:px-3 sm:text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </section>

          {/* Key Challenges */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4 sm:text-xl sm:mb-6">
              Key Challenges
            </h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 sm:mt-2" />
                  <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">{challenge}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Solutions */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4 sm:text-xl sm:mb-6">
              What I Built
            </h2>
            <ul className="space-y-3">
              {project.solutions.map((solution, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 sm:mt-2" />
                  <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">{solution}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Results - Responsive grid */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4 sm:text-xl sm:mb-6">
              Results & Impact
            </h2>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.results.map((result, i) => (
                <Card key={i} className="bg-muted/30 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-foreground leading-relaxed">{result}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Screenshots - Responsive grid with proper sizing */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4 sm:text-xl sm:mb-6">
                Screenshots
              </h2>
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                {project.screenshots.map((screenshot, i) => (
                  <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={screenshot}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Navigation - Stack on mobile */}
          <nav className="flex flex-col gap-4 pt-6 border-t border-border/50 sm:flex-row sm:justify-between sm:pt-8">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group flex items-center gap-3 p-3 -m-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors min-h-[60px]"
              >
                <ArrowLeft className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1 sm:h-4 sm:w-4" />
                <div className="text-left min-w-0">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Previous</p>
                  <p className="text-sm font-medium text-foreground truncate">{previousProject.title}</p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 p-3 -m-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors min-h-[60px] sm:text-right"
              >
                <div className="min-w-0 sm:order-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Next</p>
                  <p className="text-sm font-medium text-foreground truncate">{nextProject.title}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4 sm:order-2" />
              </Link>
            )}
          </nav>
        </Container>
      </article>
    </>
  )
}
