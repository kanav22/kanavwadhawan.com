import type { Metadata } from "next"
import { Download, Linkedin, Briefcase, GraduationCap, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/container"
import { ProfilePageJsonLd, JsonLd } from "@/components/json-ld"
import { SkillsSection } from "@/components/skills-section"
import { ResumeAuthProvider, ResumeDownloadGate, ResumeDownloadLink } from "@/components/resume-download-gate"
import { generatePageMetadata } from "@/lib/metadata"
import { profile, skills } from "@/data/profile"
import { experiences, education } from "@/data/experience"

export const metadata: Metadata = generatePageMetadata({
  title: "Resume",
  description: `${profile.name}'s resume. ${profile.title} with 10+ years of experience in mobile development. Download PDF or view professional background.`,
  path: "/resume",
})

export default function ResumePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <ProfilePageJsonLd />
      <JsonLd 
        type="webpage" 
        data={{
          title: "Resume",
          description: `Professional resume of ${profile.name}`,
          url: `${profile.website}/resume`,
        }}
      />
      <JsonLd 
        type="breadcrumb" 
        data={{
          items: [
            { name: "Home", url: profile.website },
            { name: "Resume", url: `${profile.website}/resume` },
          ],
        }}
      />

      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <Container>
          <ResumeAuthProvider>
          {/* Header - Stack on mobile */}
          <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:mb-12 md:mb-16">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                Resume
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:mt-2 sm:text-base">
                Professional background and qualifications
              </p>
            </div>
            
            {/* Action buttons - Stack on mobile */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <ResumeDownloadGate>
                  <ResumeDownloadLink className="h-12 w-full rounded-lg px-4 text-base sm:h-10 sm:w-auto sm:text-sm">
                    <Download className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
                    Download PDF
                  </ResumeDownloadLink>
                </ResumeDownloadGate>
                <Button asChild variant="outline" className="h-12 w-full rounded-lg px-4 text-base sm:h-10 sm:w-auto sm:text-sm">
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View LinkedIn profile"
                  >
                    <Linkedin className="mr-2 h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </Button>
              </div>
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:justify-start">
                <Calendar className="h-3 w-3" />
                Last updated: {profile.resumeLastUpdated}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl sm:text-base">
              {profile.bio}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 sm:gap-2.5 sm:mb-8">
              <Briefcase className="h-4 w-4" />
              Experience
            </h2>
            <div className="space-y-8 sm:space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex flex-col gap-1 mb-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:mb-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground sm:text-base">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="mt-1 w-fit shrink-0 rounded-md border-border/60 px-2 py-0.5 text-[10px] font-normal tabular-nums sm:mt-0 sm:px-2.5 sm:py-1 sm:text-xs"
                    >
                      {exp.startDate} — {exp.endDate}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed sm:gap-3">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-foreground/50 sm:mt-2" />
                        <span className="text-foreground/90">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 sm:gap-2.5 sm:mb-8">
              <GraduationCap className="h-4 w-4" />
              Education
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.school} · {edu.location}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="mt-1 w-fit shrink-0 rounded-md border-border/60 px-2 py-0.5 text-[10px] font-normal tabular-nums sm:mt-0 sm:px-2.5 sm:py-1 sm:text-xs"
                  >
                    {edu.year}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Skills - Badge chips with Show more */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 sm:mb-8">
              Technical Skills
            </h2>
            <SkillsSection skills={skills} />
          </div>

          {/* Download CTA */}
          <div className="rounded-lg border border-border/40 bg-muted/30 p-6 text-center sm:rounded-xl sm:p-8 md:p-10">
            <h3 className="text-sm font-semibold text-foreground sm:text-base">
              Want the full details?
            </h3>
            <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
              Download my complete resume as a PDF
            </p>
            <div className="mt-4 sm:mt-6 flex justify-center">
              <ResumeDownloadLink className="h-12 w-full rounded-lg px-5 text-base sm:h-10 sm:w-auto sm:text-sm">
                <Download className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
                Download Resume
              </ResumeDownloadLink>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Last updated: {profile.resumeLastUpdated}
            </p>
          </div>
          </ResumeAuthProvider>
        </Container>
      </section>
    </>
  )
}
