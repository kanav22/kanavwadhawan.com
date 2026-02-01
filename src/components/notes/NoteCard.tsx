import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Note } from "@/data/notes"
import { getReadingTimeMinutes, getNoteTags } from "@/data/notes"
import { ArrowRight } from "lucide-react"

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const readingMin = getReadingTimeMinutes(note)
  const allTags = getNoteTags(note)
  const tags = allTags.slice(0, 2)
  const extraCount = allTags.length > 2 ? allTags.length - 2 : 0
  const dateStr = new Date(note.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <li>
      <Link
        href={`/notes/${note.slug}`}
        className="block h-full min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
      >
        <Card className="h-full flex flex-col border-border/50 bg-card/50 transition-all hover:border-border hover:bg-card hover:shadow-md text-left">
          <CardHeader className="pb-2 pt-4 px-4 sm:pt-5 sm:px-5 flex-1 flex flex-col">
            <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {note.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {note.excerpt}
            </p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
              <span className="tabular-nums">{dateStr}</span>
              <span aria-hidden>·</span>
              <span>{readingMin} min</span>
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
                    {extraCount > 0 && (
                      <span className="text-[10px] text-muted-foreground/70 tabular-nums">
                        +{extraCount}
                      </span>
                    )}
                  </span>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-4 sm:pb-5 sm:px-5 mt-auto">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary min-h-[44px] min-w-[44px] justify-end w-fit ml-auto">
              Read
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </CardContent>
        </Card>
      </Link>
    </li>
  )
}
