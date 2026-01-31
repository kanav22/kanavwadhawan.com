"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCard } from "@/components/project-card"
import { JsonLd } from "@/components/json-ld"
import { profile } from "@/data/profile"
import { projects, allTags } from "@/data/projects"

// Note: metadata must be in a separate file for client components
// See projects/metadata.ts or use generateMetadata in a server component wrapper

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesTag =
        selectedTag === null || project.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  return (
    <>
      {/* JSON-LD for Projects page */}
      <JsonLd 
        type="webpage" 
        data={{
          title: "Projects",
          description: "A collection of software engineering projects by " + profile.name,
          url: `${profile.website}/projects`,
        }}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Projects"
            subtitle="A collection of work throughout my career"
          />

          {/* Filters */}
          <div className="mb-10 space-y-5">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 rounded-lg border-border/60 bg-background pl-10 text-sm placeholder:text-muted-foreground/50"
                aria-label="Search projects"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="h-8 rounded-lg px-3 text-xs font-medium"
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="h-8 rounded-lg border-border/60 px-3 text-xs font-medium"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="mb-8 text-sm text-muted-foreground/80">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </p>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">
                No projects found.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTag(null)
                }}
                className="mt-2 text-sm"
              >
                Clear filters
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
