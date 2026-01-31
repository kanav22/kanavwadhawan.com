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
      <section className="py-12 sm:py-16 md:py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-base font-medium text-foreground/80 sm:mt-4 sm:text-lg md:text-xl">
              {profile.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed">
              {profile.tagline}
            </p>
            
            {/* Proof Chips - Social proof items */}
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {profile.proofChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground sm:text-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
            
            {/* CTAs - Stack on mobile, row on sm+ */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="h-12 w-full rounded-lg px-6 text-base sm:w-auto">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Get in touch
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 w-full rounded-lg px-6 text-base sm:w-auto">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GitHub profile"
                >
                  <Github className="mr-2 h-5 w-5" aria-hidden="true" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 w-full rounded-lg px-6 text-base sm:w-auto">
                <a href={profile.resumeUrl} download>
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="border-t border-border/40 py-12 sm:py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4">
              About
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed">
              {profile.about}
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="border-t border-border/40 bg-muted/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12">
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of impactful work"
              className="mb-0"
            />
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex shrink-0 gap-1.5 h-10">
              <Link href="/projects">
                View all
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          
          {/* Grid: 1 col mobile, 2 cols sm, 3 cols lg */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {/* Mobile view all button */}
          <div className="mt-8 sm:hidden">
            <Button asChild variant="outline" className="w-full h-12 rounded-lg text-base">
              <Link href="/projects">
                View all projects
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <Container>
          <SectionHeading
            title="Experience"
            subtitle="My professional journey"
          />
          <div className="space-y-4 sm:space-y-5">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="border-t border-border/40 bg-muted/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <Container>
          <SectionHeading
            title="Skills"
            subtitle="Technologies I work with"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-4">
                Languages
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skillsByCategory.languages.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="rounded-md px-2 py-1 text-xs sm:px-2.5 sm:text-sm font-normal"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-4">
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skillsByCategory.frameworks.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="rounded-md px-2 py-1 text-xs sm:px-2.5 sm:text-sm font-normal"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-4">
                Tools
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skillsByCategory.tools.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="rounded-md px-2 py-1 text-xs sm:px-2.5 sm:text-sm font-normal"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-4">
                Cloud & Services
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skillsByCategory.cloud.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="rounded-md px-2 py-1 text-xs sm:px-2.5 sm:text-sm font-normal"
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
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
              Let&apos;s work together
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:mt-4 sm:text-base">
              I&apos;m always open to discussing new opportunities and interesting projects.
            </p>
            
            {/* CTAs - Stack on mobile */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="h-12 w-full rounded-lg px-6 text-base sm:w-auto">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                  Send me an email
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 w-full rounded-lg px-6 text-base sm:w-auto">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View LinkedIn profile"
                >
                  <Linkedin className="mr-2 h-5 w-5" aria-hidden="true" />
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
