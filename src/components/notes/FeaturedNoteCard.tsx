import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Note } from "@/data/notes"
import { getReadingTimeMinutes, getNoteTags } from "@/data/notes"
import { ArrowRight } from "lucide-react"

interface FeaturedNoteCardProps {
  note: Note
}

export function FeaturedNoteCard({ note }: FeaturedNoteCardProps) {
  const readingMin = getReadingTimeMinutes(note)
  const tags = getNoteTags(note).slice(0, 2)
  const dateStr = new Date(note.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const learnBullets = note.linkedinSummary?.slice(0, 3) ?? []

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
    >
      <Card className="border-primary/40 bg-primary/5 transition-all hover:border-primary/60 hover:bg-primary/10 overflow-hidden text-left">
        <CardHeader className="pb-2 pt-3 px-4 sm:pt-4 sm:px-5">
          <h2 id="featured-note-title" className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {note.title}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {note.excerpt}
          </p>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
            <span className="tabular-nums">{dateStr}</span>
            <span aria-hidden>·</span>
            <span>{readingMin} min read</span>
            {tags.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <span className="flex flex-wrap items-center gap-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/90 bg-muted/50 border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
          <div className="mt-3 flex justify-end">
            <span className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
              Read note
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </span>
          </div>
        </CardHeader>
        {learnBullets.length > 0 && (
          <CardContent className="hidden border-t border-border/30 pt-3 pb-4 px-4 sm:px-5 md:block">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
              What you&apos;ll learn
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {learnBullets.map((bullet, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
