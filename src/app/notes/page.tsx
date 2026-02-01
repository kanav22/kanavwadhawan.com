import { Container } from "@/components/container"
import { FeaturedNoteCard } from "@/components/notes/FeaturedNoteCard"
import { NotesListSection } from "@/components/notes/NotesListSection"
import {
  getNotesSortedByDate,
  getNoteTags,
} from "@/data/notes"

export default function NotesPage() {
  const sortedNotes = getNotesSortedByDate()
  const featuredNote = sortedNotes[0]
  const restNotes = sortedNotes.slice(1)
  const allTags = [...new Set(sortedNotes.flatMap((n) => getNoteTags(n)))].sort()

  return (
    <main className="min-w-0 overflow-x-hidden py-8 sm:py-12 md:py-16">
      <Container size="narrow" className="space-y-10 sm:space-y-12">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Engineering memos
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Engineering Notes
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Practical notes on mobile architecture, fintech reliability, performance culture, and engineering leadership.
          </p>
          <p className="text-xs text-muted-foreground/80 mt-1">
            Written as working notes, not tutorials.
          </p>
        </header>

        {featuredNote && (
          <section aria-labelledby="start-here-heading" className="space-y-3">
            <h2 id="start-here-heading" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Start here
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you read one thing to understand how I think about mobile systems at scale, start here.
            </p>
            <FeaturedNoteCard note={featuredNote} />
          </section>
        )}

        {restNotes.length > 0 && (
          <NotesListSection restNotes={restNotes} allTags={allTags} />
        )}
      </Container>
    </main>
  )
}
