"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface NotesToolbarProps {
  query: string
  onQueryChange: (value: string) => void
  selectedTag: string | null
  onSelectedTagChange: (tag: string | null) => void
  allTags: string[]
}

export function NotesToolbar({
  query,
  onQueryChange,
  selectedTag,
  onSelectedTagChange,
  allTags,
}: NotesToolbarProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden
        />
        <Input
          type="search"
          placeholder="Search by title, excerpt, or tag…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-9 min-h-[44px] rounded-lg border-border/60 bg-background focus-visible:ring-2"
          aria-label="Search notes"
        />
      </div>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <span className="sr-only">Filter by tag:</span>
          <button
            type="button"
            onClick={() => onSelectedTagChange(null)}
            className={`rounded px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              selectedTag === null
                ? "border border-primary/50 bg-primary/10 text-primary"
                : "border border-transparent bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectedTagChange(selectedTag === tag ? null : tag)}
              className={`rounded px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                selectedTag === tag
                  ? "border border-primary/50 bg-primary/10 text-primary"
                  : "border border-transparent bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
