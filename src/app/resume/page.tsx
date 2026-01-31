import type { Metadata } from "next"
import { Download, Linkedin, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/container"
import { ProfilePageJsonLd, JsonLd } from "@/components/json-ld"
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

      <section className="py-20 sm:py-24">
        <Container>
          {/* Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between mb-16">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Resume
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                Professional background and qualifications
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-10 rounded-lg px-4">
                <a href={profile.resumeUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-lg px-4">
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

          {/* Summary */}
          <div className="mb-16">
            <p className="text-base leading-relaxed text-muted-foreground max-w-3xl">
              {profile.bio}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-16">
            <h2 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              <Briefcase className="h-4 w-4" />
              Experience
            </h2>
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="mt-1 w-fit shrink-0 rounded-md border-border/60 px-2.5 py-1 text-xs font-normal tabular-nums sm:mt-0"
                    >
                      {exp.startDate} — {exp.endDate}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                        <span className="text-foreground/90">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-16">
            <h2 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              <GraduationCap className="h-4 w-4" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.school} · {edu.location}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="mt-1 w-fit shrink-0 rounded-md border-border/60 px-2.5 py-1 text-xs font-normal tabular-nums sm:mt-0"
                  >
                    {edu.year}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Technical Skills
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground/80">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === "languages")
                    .map((skill) => (
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
                <h3 className="mb-3 text-sm font-medium text-foreground/80">
                  Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === "frameworks")
                    .map((skill) => (
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
                <h3 className="mb-3 text-sm font-medium text-foreground/80">
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === "tools")
                    .map((skill) => (
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
                <h3 className="mb-3 text-sm font-medium text-foreground/80">
                  Cloud & Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === "cloud")
                    .map((skill) => (
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
          </div>

          {/* Download CTA */}
          <div className="rounded-xl border border-border/40 bg-muted/30 p-8 text-center sm:p-10">
            <h3 className="text-base font-semibold text-foreground">
              Want the full details?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Download my complete resume as a PDF
            </p>
            <Button asChild className="mt-6 h-10 rounded-lg px-5">
              <a href={profile.resumeUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
