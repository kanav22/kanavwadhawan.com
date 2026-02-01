import { Container } from "@/components/container"
import { ManifestoCard } from "@/components/manifesto/ManifestoCard"
import { manifestoIntro, manifestoFeatures, manifestoPrinciples } from "@/data/manifesto"

export default function ManifestoPage() {
  return (
    <main className="min-w-0 overflow-x-hidden py-8 sm:py-12 md:py-16 lg:py-20">
      <Container size="narrow" className="space-y-10 sm:space-y-12">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Technical Manifesto
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-4">
            {manifestoIntro}
          </p>
        </header>

        <section aria-labelledby="principles-heading" className="space-y-4">
          <h2 id="principles-heading" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Principles
          </h2>
          <ul className="space-y-4 sm:space-y-5">
            {manifestoPrinciples.map((principle) => (
              <li
                key={principle.id}
                className="rounded-xl border border-border/50 bg-card/50 px-4 py-4 sm:px-5 sm:py-5"
              >
                <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {principle.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="explore-heading" className="space-y-4">
          <h2 id="explore-heading" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Explore
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
            {manifestoFeatures.map((feature) => (
              <ManifestoCard key={feature.id} feature={feature} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  )
}
