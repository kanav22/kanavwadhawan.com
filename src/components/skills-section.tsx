"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Skill } from "@/data/profile"

interface SkillGroup {
  title: string
  category: Skill["category"]
}

const skillGroups: SkillGroup[] = [
  { title: "Languages", category: "languages" },
  { title: "Mobile & Frameworks", category: "frameworks" },
  { title: "Tools & Testing", category: "tools" },
  { title: "Cloud & Services", category: "cloud" },
]

interface SkillCategoryProps {
  title: string
  skills: Skill[]
  defaultVisible?: number
}

function SkillCategory({ title, skills, defaultVisible = 8 }: SkillCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasMore = skills.length > defaultVisible
  const visibleSkills = isExpanded ? skills : skills.slice(0, defaultVisible)

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {visibleSkills.map((skill) => (
          <Badge
            key={skill.name}
            variant="secondary"
            className="rounded-md px-2 py-1 text-xs font-normal transition-colors sm:px-2.5 sm:text-sm"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? "Show less" : `Show ${skills.length - defaultVisible} more`}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
            aria-hidden="true"
          />
        </Button>
      )}
    </div>
  )
}

interface SkillsSectionProps {
  skills: Skill[]
}

/**
 * Skills section with grouped badges and collapsible "Show more".
 * Mobile-first: shows limited badges by default with expand option.
 */
export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
      {skillGroups.map((group) => {
        const groupSkills = skills.filter((s) => s.category === group.category)
        if (groupSkills.length === 0) return null
        
        return (
          <SkillCategory
            key={group.category}
            title={group.title}
            skills={groupSkills}
            defaultVisible={8}
          />
        )
      })}
    </div>
  )
}
