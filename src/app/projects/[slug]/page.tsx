import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Github, 
  Calendar, 
  Users, 
  Briefcase, 
  ExternalLink, 
  Building2,
  Smartphone,
  BookOpen,
  Lock
} from "lucide-react"
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

// Platform icon colors
const platformColors: Record<string, string> = {
  Android: "text-green-600 dark:text-green-500",
  iOS: "text-blue-600 dark:text-blue-500",
  "React Native": "text-cyan-600 dark:text-cyan-500",
  "Cross-Platform": "text-purple-600 dark:text-purple-500",
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const nextProject = getNextProject(slug)
  const previousProject = getPreviousProject(slug)
  
  // Check if there are any external links
  const hasExternalLinks = project.googlePlayUrl || project.appStoreUrl || project.githubUrl || project.liveUrl || project.docsUrl
  const showAvailabilityLabel = project.isPrivate || project.availabilityLabel

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
            className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-6 sm:mb-8 sm:min-h-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to projects
          </Link>

          {/* Header */}
          <header className="mb-8 sm:mb-12">
            {/* Platform + Tags */}
            <div className="mb-3 flex flex-wrap items-center gap-1.5 sm:mb-4 sm:gap-2">
              {project.platform?.map((platform) => (
                <Badge
                  key={platform}
                  variant="outline"
                  className="gap-1 rounded-md border-border/60 px-2 py-0.5 text-[10px] font-medium sm:text-xs"
                >
                  <Smartphone className={`h-2.5 w-2.5 ${platformColors[platform] || ""}`} aria-hidden="true" />
                  {platform}
                </Badge>
              ))}
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
            
            {/* Company logo + Title */}
            <div className="mb-3 flex items-start gap-4 sm:mb-4">
              {project.companyLogo ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-14 sm:w-14">
                  <Image
                    src={project.companyLogo}
                    alt={`${project.company} logo`}
                    fill
                    className="object-contain p-2"
                    sizes="56px"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-semibold text-muted-foreground sm:h-14 sm:w-14 sm:text-xl">
                  {project.company.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  {project.title}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.company}
                </p>
              </div>
            </div>
            
            {/* Description */}
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              {project.longDescription}
            </p>

            {/* Summary Block - Role, Duration, Team, Platforms */}
            <Card className="mt-6 border-border/50 bg-muted/30 sm:mt-8">
              <CardContent className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Role</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{project.role}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Duration</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{project.duration}</p>
                  </div>
                </div>
                {project.team && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Team</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{project.team}</p>
                    </div>
                  </div>
                )}
                {project.platform && project.platform.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Smartphone className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Platforms</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{project.platform.join(", ")}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Links section */}
            {(hasExternalLinks || showAvailabilityLabel) && (
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                {project.liveUrl && (
                  <Button asChild className="h-12 w-full rounded-lg text-base sm:h-10 sm:w-auto sm:text-sm">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live`}
                    >
                      View Live
                      <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {project.googlePlayUrl && (
                  <Button asChild variant="outline" className="h-12 w-full rounded-lg text-base sm:h-10 sm:w-auto sm:text-sm">
                    <a 
                      href={project.googlePlayUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on Google Play`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                      Google Play
                    </a>
                  </Button>
                )}
                {project.appStoreUrl && (
                  <Button asChild variant="outline" className="h-12 w-full rounded-lg text-base sm:h-10 sm:w-auto sm:text-sm">
                    <a 
                      href={project.appStoreUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on App Store`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                      App Store
                    </a>
                  </Button>
                )}
                {project.docsUrl && (
                  <Button asChild variant="outline" className="h-12 w-full rounded-lg text-base sm:h-10 sm:w-auto sm:text-sm">
                    <a 
                      href={project.docsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} documentation`}
                    >
                      <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                      Documentation
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="outline" className="h-12 w-full rounded-lg text-base sm:h-10 sm:w-auto sm:text-sm">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                      View Code
                    </a>
                  </Button>
                )}
                {!hasExternalLinks && showAvailabilityLabel && (
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    {project.availabilityLabel || "Private/enterprise app"}
                  </span>
                )}
              </div>
            )}
          </header>

          {/* Hero image - Responsive aspect ratio */}
          <div className="relative mb-10 aspect-video overflow-hidden rounded-lg bg-muted sm:mb-12 sm:rounded-xl md:mb-16">
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
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-4">
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
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground sm:mb-6 sm:text-xl">
              Key Challenges
            </h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 sm:mt-2" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">{challenge}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Solutions */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground sm:mb-6 sm:text-xl">
              What I Built
            </h2>
            <ul className="space-y-3">
              {project.solutions.map((solution, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 sm:mt-2" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">{solution}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Results - Responsive grid */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground sm:mb-6 sm:text-xl">
              Results & Impact
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {project.results.map((result, i) => (
                <Card key={i} className="border-border/50 bg-muted/30">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium leading-relaxed text-foreground">{result}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Screenshots - Responsive grid with proper sizing and placeholder fallback */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground sm:mb-6 sm:text-xl">
              Screenshots
            </h2>
            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
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
            ) : (
              /* Placeholder when no screenshots */
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {[1, 2].map((i) => (
                  <div 
                    key={i} 
                    className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted/50 border border-dashed border-border/50"
                  >
                    <div className="text-center">
                      <Smartphone className="mx-auto h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
                      <p className="mt-2 text-sm text-muted-foreground/60">
                        {project.title} screenshot
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Navigation - Stack on mobile */}
          <nav className="flex flex-col gap-4 border-t border-border/50 pt-6 sm:flex-row sm:justify-between sm:pt-8" aria-label="Project navigation">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group -m-3 flex min-h-[60px] items-center gap-3 rounded-lg p-3 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1 sm:h-4 sm:w-4" aria-hidden="true" />
                <div className="min-w-0 text-left">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Previous</p>
                  <p className="truncate text-sm font-medium text-foreground">{previousProject.title}</p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group -m-3 flex min-h-[60px] items-center gap-3 rounded-lg p-3 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground sm:text-right"
              >
                <div className="min-w-0 sm:order-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Next</p>
                  <p className="truncate text-sm font-medium text-foreground">{nextProject.title}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 sm:order-2 sm:h-4 sm:w-4" aria-hidden="true" />
              </Link>
            )}
          </nav>
        </Container>
      </article>
    </>
  )
}
