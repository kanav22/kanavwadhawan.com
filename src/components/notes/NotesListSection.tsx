"use client"

import { useMemo, useState } from "react"
import { NoteCard } from "@/components/notes/NoteCard"
import { NotesToolbar } from "@/components/notes/NotesToolbar"
import type { Note } from "@/data/notes"
import { getNoteTags } from "@/data/notes"

interface NotesListSectionProps {
  restNotes: Note[]
  allTags: string[]
}

export function NotesListSection({ restNotes, allTags }: NotesListSectionProps) {
  const [query, setQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byQuery = q
      ? restNotes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.excerpt.toLowerCase().includes(q) ||
            getNoteTags(n).some((t) => t.toLowerCase().includes(q))
        )
      : restNotes
    const byTag = selectedTag
      ? byQuery.filter((n) => getNoteTags(n).includes(selectedTag))
      : byQuery
    return byTag
  }, [restNotes, query, selectedTag])

  return (
    <section aria-labelledby="all-notes-heading" className="space-y-6">
      <h2 id="all-notes-heading" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        All notes
      </h2>
      <NotesToolbar
        query={query}
        onQueryChange={setQuery}
        selectedTag={selectedTag}
        onSelectedTagChange={setSelectedTag}
        allTags={allTags}
      />
      <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No notes match your search. Try a different query or tag.
        </p>
      )}
    </section>
  )
}
