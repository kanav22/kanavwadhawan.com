"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCard } from "@/components/project-card"
import { JsonLd } from "@/components/json-ld"
import { profile } from "@/data/profile"
import { projects, allTags } from "@/data/projects"

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

  const hasActiveFilters = searchQuery !== "" || selectedTag !== null

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

      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <Container>
          <SectionHeading
            title="Projects"
            subtitle="A collection of work throughout my career"
          />

          {/* Filters - Stack on mobile */}
          <div className="mb-8 space-y-4 sm:mb-10">
            {/* Search - Full width on mobile */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-lg border-border/60 bg-background pl-10 pr-10 text-base placeholder:text-muted-foreground/50 sm:h-10 sm:max-w-sm sm:text-sm"
                aria-label="Search projects"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Tag Filters - Wrap on mobile */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="h-10 rounded-lg px-4 text-sm font-medium sm:h-8 sm:px-3 sm:text-xs"
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="h-10 rounded-lg border-border/60 px-4 text-sm font-medium sm:h-8 sm:px-3 sm:text-xs"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="mb-6 text-sm text-muted-foreground/80 sm:mb-8">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </p>

          {/* Projects Grid - 1 col mobile, 2 col sm, 3 col lg */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center sm:py-16">
              <p className="text-muted-foreground">
                No projects found.
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedTag(null)
                  }}
                  className="mt-4 h-10 rounded-lg"
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
