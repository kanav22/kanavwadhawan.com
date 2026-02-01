import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { CaseStudyCard } from "@/components/case-study-card"
import { ExperienceCard } from "@/components/experience-card"
import { LeadershipSection } from "@/components/leadership-section"
import { CapabilitiesSection } from "@/components/capabilities-section"
import { BlueprintsPreviewCard } from "@/components/blueprints-preview-card"
import { FeaturedTechnicalDeepDive } from "@/components/featured-technical-deep-dive"
import { ImpactStats } from "@/components/impact-stats"
import { HomePageJsonLd } from "@/components/json-ld"
import { generatePageMetadata } from "@/lib/metadata"
import { profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { experiences } from "@/data/experience"

export const metadata: Metadata = generatePageMetadata({
  title: `${profile.name} | ${profile.title}`,
  description: profile.tagline,
  path: "",
})

export default function HomePage() {
  const caseStudies = projects.filter((p) => p.featured)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <HomePageJsonLd />

      {/* Hero Section — Role (H1), Differentiator, Proof chips, CTA hierarchy */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-14">
        <Container>
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
            {profile.profilePhoto && (
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-md sm:h-28 sm:w-28 md:h-32 md:w-32">
                <Image
                  src={profile.profilePhoto}
                  alt=""
                  fill
                  priority
                  unoptimized={profile.profilePhoto.endsWith(".svg")}
                  className="object-cover"
                  sizes="(max-width: 768px) 112px, 128px"
                />
              </div>
            )}
            <div className="max-w-2xl min-w-0">
              <p className="text-sm font-medium text-muted-foreground sm:text-base">{profile.name}</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                {profile.title}
              </h1>
              <p className="mt-3 text-base leading-snug text-muted-foreground sm:mt-4 sm:text-lg">
                {profile.heroDifferentiator ?? profile.tagline}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-3">
                {profile.proofChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:text-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              {/* Primary CTA: Blueprints */}
              <div className="mt-6 sm:mt-8">
                <Button asChild size="lg" className="h-12 min-h-[48px] w-full rounded-lg px-6 text-base sm:w-auto">
                  <Link href="/blueprints" className="gap-2">
                    Explore Architecture Blueprints
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <p className="mt-2 text-xs text-muted-foreground/80 sm:text-sm">
                  Click nodes to see trade-offs, failure modes, and how I test.
                </p>
              </div>
              {/* Secondary CTAs */}
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                <Button asChild variant="outline" size="lg" className="h-12 min-h-[48px] w-full rounded-lg px-6 text-base sm:w-auto">
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 min-h-[48px] w-full rounded-lg px-6 text-base sm:w-auto">
                  <Link href="/notes">Read Engineering Notes</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="h-12 min-h-[48px] w-full rounded-lg px-6 text-base sm:w-auto">
                  <a href={profile.resumeUrl} download aria-label="Download resume">
                    <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                    Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Blueprints preview — flagship */}
      <BlueprintsPreviewCard />

      {/* Operating at scale */}
      <section className="border-t border-border/40 py-12 md:py-16 lg:py-20" aria-labelledby="operating-at-scale-heading">
        <Container>
          <h2 id="operating-at-scale-heading" className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-3">
            Operating at scale
          </h2>
          <p className="mb-6 max-w-xl text-sm text-muted-foreground sm:text-base">
            Outcomes and signals from production systems and teams I&apos;ve led.
          </p>
          <ImpactStats stats={profile.impactStats} />
        </Container>
      </section>

      {/* About Section */}
      <section className="border-t border-border/40 bg-muted/30 py-12 md:py-16 lg:py-20">
        <Container>
          <div className={profile.aboutImage ? "flex flex-col gap-8 md:flex-row md:items-start md:gap-12" : "max-w-3xl"}>
            {profile.aboutImage && (
              <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl border border-border/50 bg-muted md:h-56 md:w-80 md:max-w-sm">
                <Image
                  src={profile.aboutImage}
                  alt=""
                  fill
                  unoptimized={profile.aboutImage.endsWith(".svg")}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            )}
            <div className={profile.aboutImage ? "min-w-0 flex-1" : "max-w-3xl"}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-4">
                About
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed">
                {profile.about}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Case Studies / Projects */}
      <section className="border-t border-border/40 py-12 md:py-16 lg:py-20">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Projects"
              subtitle="Decision narrative: architectural choices, outcomes, and impact"
              className="mb-0"
            />
            <Button asChild variant="ghost" size="sm" className="hidden h-10 shrink-0 gap-1.5 sm:flex">
              <Link href="/projects">
                View all
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          
          {/* Case study cards - 1 col mobile, 2 cols md, 3 cols lg */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((project, index) => (
              <CaseStudyCard
                key={project.id}
                project={project}
                priority={index < 3}
              />
            ))}
          </div>
          
          <div className="mt-8 sm:hidden">
            <Button asChild variant="outline" className="h-12 w-full rounded-lg text-base min-h-[48px]">
              <Link href="/projects">
                View all projects
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Technical Deep Dive — Architecture showcase */}
      <FeaturedTechnicalDeepDive />

      {/* Leadership Section */}
      <section className="border-t border-border/40 py-12 md:py-16 lg:py-20">
        <Container>
          <SectionHeading
            title="Leadership Highlights"
            subtitle="Building teams that build great products"
          />
          <LeadershipSection highlights={profile.leadershipHighlights} />
        </Container>
      </section>

      {/* Experience */}
      <section className="border-t border-border/40 bg-muted/30 py-12 md:py-16 lg:py-20">
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

      {/* Capabilities */}
      <section className="border-t border-border/40 bg-muted/30 py-12 md:py-16 lg:py-20">
        <Container>
          <SectionHeading
            title="Capabilities"
            subtitle="Mobile architecture, reliability, fintech security, and delivery"
          />
          <CapabilitiesSection categories={profile.capabilityCategories} />
        </Container>
      </section>

      {/* Engineering Notes preview */}
      <section className="border-t border-border/40 py-12 md:py-16 lg:py-20" aria-labelledby="notes-preview-heading">
        <Container>
          <h2 id="notes-preview-heading" className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-3">
            Engineering Notes
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Practical notes on mobile architecture, fintech reliability, performance culture, and engineering leadership.
          </p>
          <Button asChild variant="outline" size="lg" className="h-12 min-h-[48px] rounded-lg px-6 text-base">
            <Link href="/notes" className="gap-2">
              Read Engineering Notes
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="border-t border-border/40 bg-muted/30 py-16 md:py-20 lg:py-24">
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
              <Button asChild size="lg" className="h-12 min-h-[48px] w-full rounded-lg px-6 text-base sm:w-auto">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                  Send me an email
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 min-h-[48px] w-full rounded-lg px-6 text-base sm:w-auto">
                <a
                  href={profile.linkedinUrl}
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
