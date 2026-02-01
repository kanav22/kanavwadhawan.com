import Link from "next/link"
import { NoteHeroImage } from "@/components/notes/NoteHeroImage"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getNotesSortedByDate } from "@/data/notes"
import { ArrowRight } from "lucide-react"

export default function NotesPage() {
  const sortedNotes = getNotesSortedByDate()

  return (
    <main className="min-w-0 overflow-x-hidden py-8 sm:py-12 md:py-16">
      <Container size="narrow" className="space-y-8">
        <header>
          <Badge variant="secondary" className="mb-3 text-xs font-medium uppercase tracking-wider">
            Engineering Notes
          </Badge>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Engineering Notes
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Practical notes on mobile architecture, fintech reliability, performance culture, and engineering leadership.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/90 italic">
            Written as working notes, not tutorials.
          </p>
        </header>

        {sortedNotes.length > 0 && (
          <section aria-labelledby="start-here-heading" className="space-y-3">
            <h2 id="start-here-heading" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Start here
            </h2>
            <Link
              href={`/notes/${sortedNotes[0].slug}`}
              className="block min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
            >
              <Card className="border-primary/30 bg-primary/5 transition-all hover:border-primary/50 hover:bg-primary/10 overflow-hidden group">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {sortedNotes[0].title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {sortedNotes[0].excerpt}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </section>
        )}

        <h2 id="all-notes-heading" className="sr-only">
          All notes
        </h2>
        <ul className="space-y-4" aria-labelledby="all-notes-heading">
          {sortedNotes.slice(1).map((note) => (
            <li key={note.slug}>
              <Link
                href={`/notes/${note.slug}`}
                className="block min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
              >
                <Card className="border-border/50 bg-card/50 transition-all hover:border-border hover:bg-card hover:shadow-md overflow-hidden group">
                  {(note.heroImage ?? note.ogImage) && (
                    <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted rounded-t-xl">
                      <NoteHeroImage
                        src={note.heroImage ?? note.ogImage ?? ""}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 720px"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold tracking-tight text-foreground">
                        {note.title}
                      </h2>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {new Date(note.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {note.excerpt}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read more
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  )
}
