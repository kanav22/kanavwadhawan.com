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

      <article className="py-16 sm:py-20">
        <Container>
          {/* Back link */}
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="rounded-md px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {project.longDescription}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>{project.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{project.duration}</span>
              </div>
              {project.team && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{project.team}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              {project.liveUrl && (
                <Button asChild>
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
                <Button asChild variant="outline">
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

          {/* Hero image */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted mb-16">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Tech stack */}
          <section className="mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline"
                  className="rounded-md px-3 py-1 text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </section>

          {/* Key Challenges */}
          <section className="mb-16">
            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-6">
              Key Challenges
            </h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span className="text-muted-foreground">{challenge}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Solutions */}
          <section className="mb-16">
            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-6">
              What I Built
            </h2>
            <ul className="space-y-3">
              {project.solutions.map((solution, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Results */}
          <section className="mb-16">
            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-6">
              Results & Impact
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.results.map((result, i) => (
                <Card key={i} className="bg-muted/30 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-foreground">{result}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Screenshots placeholder */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mb-16">
              <h2 className="text-xl font-semibold tracking-tight text-foreground mb-6">
                Screenshots
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((screenshot, i) => (
                  <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={screenshot}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border/50">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wide">Previous</p>
                  <p className="text-sm font-medium text-foreground">{previousProject.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors sm:text-right"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide">Next</p>
                  <p className="text-sm font-medium text-foreground">{nextProject.title}</p>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </nav>
        </Container>
      </article>
    </>
  )
}
