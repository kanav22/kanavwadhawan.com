import type { Metadata } from "next"
import Link from "next/link"
import { SafeImage } from "@/components/ui/safe-image"
import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NoteShareButtons } from "@/components/notes/NoteShareButtons"
import { getNoteBySlug, getNotesSortedByDate } from "@/data/notes"
import { generatePageMetadata } from "@/lib/metadata"
import { ArrowLeft } from "lucide-react"

interface NotePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getNotesSortedByDate().map((note) => ({
    slug: note.slug,
  }))
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) return {}

  // Use segment opengraph-image (generated PNG) so note posts get a custom OG image
  const ogImage = note.ogImage ?? `/notes/${note.slug}/opengraph-image`
  return generatePageMetadata({
    title: note.title,
    description: note.excerpt,
    path: `/notes/${note.slug}`,
    image: ogImage,
  })
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params
  const note = getNoteBySlug(slug)

  if (!note) notFound()

  return (
    <main className="min-w-0 overflow-x-hidden py-8 sm:py-12 md:py-16">
      <Container size="narrow" className="space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/notes"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm w-fit"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Engineering Notes
          </Link>
          <Badge variant="secondary" className="w-fit text-xs font-medium uppercase tracking-wider">
            Engineering Notes
          </Badge>
        </div>

        <article>
          {note.heroImage && (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border/50 bg-muted mb-8 shadow-sm">
              <SafeImage
                src={note.heroImage}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          )}
          <header className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {note.title}
            </h1>
            <p className="text-sm text-muted-foreground tabular-nums">
              {new Date(note.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {note.excerpt}
            </p>
          </header>

          <div className="mt-6">
            <NoteShareButtons note={note} />
          </div>

          <Separator className="my-8" />

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section aria-labelledby="tldr-heading">
              <h2 id="tldr-heading" className="text-lg font-semibold tracking-tight text-foreground">
                TL;DR
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {note.tldr}
              </p>
            </section>

            <section aria-labelledby="architecture-heading">
              <h2 id="architecture-heading" className="text-lg font-semibold tracking-tight text-foreground">
                Architecture
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {note.architecture}
              </p>
            </section>

            <section aria-labelledby="failure-modes-heading">
              <h2 id="failure-modes-heading" className="text-lg font-semibold tracking-tight text-foreground">
                Failure modes
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                {note.failureModes.map((mode, i) => (
                  <li key={i}>{mode}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="testing-heading">
              <h2 id="testing-heading" className="text-lg font-semibold tracking-tight text-foreground">
                Testing checklist
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                {note.testingChecklist.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="differently-heading">
              <h2 id="differently-heading" className="text-lg font-semibold tracking-tight text-foreground">
                What I&apos;d do differently next time
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {note.whatIdDoDifferently}
              </p>
            </section>
          </div>
        </article>

        <footer className="border-t border-border/40 pt-8">
          <Link
            href="/notes"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All Engineering Notes
          </Link>
        </footer>
      </Container>
    </main>
  )
}
