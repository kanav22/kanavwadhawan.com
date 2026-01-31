import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCard } from "@/components/project-card"
import { ExperienceCard } from "@/components/experience-card"
import { HomePageJsonLd } from "@/components/json-ld"
import { generatePageMetadata } from "@/lib/metadata"
import { profile, skills } from "@/data/profile"
import { projects } from "@/data/projects"
import { experiences } from "@/data/experience"

export const metadata: Metadata = generatePageMetadata({
  title: `${profile.name} | ${profile.title}`,
  description: profile.tagline,
  path: "",
})

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)
  const skillsByCategory = {
    languages: skills.filter((s) => s.category === "languages"),
    frameworks: skills.filter((s) => s.category === "frameworks"),
    tools: skills.filter((s) => s.category === "tools"),
    cloud: skills.filter((s) => s.category === "cloud"),
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <HomePageJsonLd />

      {/* Hero Section */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-lg font-medium text-foreground/80 sm:text-xl">
              {profile.title}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              {profile.tagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-lg px-5">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Get in touch
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-lg px-5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-lg px-5">
                <a href={profile.resumeUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="border-t border-border/40 bg-muted/30 py-20 sm:py-24">
        <Container>
          <div className="flex items-end justify-between gap-4 mb-12">
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of impactful work"
              className="mb-0"
            />
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex shrink-0 gap-1.5">
              <Link href="/projects">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Button asChild variant="outline" className="rounded-lg">
              <Link href="/projects">
                View all projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Experience"
            subtitle="My professional journey"
          />
          <div className="space-y-5">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="border-t border-border/40 bg-muted/30 py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Skills"
            subtitle="Technologies I work with"
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.languages.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="rounded-md px-2.5 py-1 text-sm font-normal"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.frameworks.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="rounded-md px-2.5 py-1 text-sm font-normal"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.tools.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="rounded-md px-2.5 py-1 text-sm font-normal"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Cloud & Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.cloud.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="rounded-md px-2.5 py-1 text-sm font-normal"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-24 sm:py-32">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Let&apos;s work together
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
              I&apos;m always open to discussing new opportunities and interesting projects.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="h-11 rounded-lg px-6">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send me an email
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-lg px-6">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
