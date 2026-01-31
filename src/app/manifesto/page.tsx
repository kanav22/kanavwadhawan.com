import { Container } from "@/components/container"
import { ManifestoCard } from "@/components/manifesto/ManifestoCard"
import { manifestoIntro, manifestoFeatures } from "@/data/manifesto"

export default function ManifestoPage() {
  return (
    <main className="py-8 sm:py-12 md:py-16 lg:py-20">
      <Container size="narrow" className="space-y-10 sm:space-y-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Technical Manifesto
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-6">
            {manifestoIntro}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {manifestoFeatures.map((feature) => (
            <ManifestoCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </main>
  )
}
