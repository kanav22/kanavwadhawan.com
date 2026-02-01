import Image from "next/image"
import { Container } from "@/components/container"
import { ManifestoCard } from "@/components/manifesto/ManifestoCard"
import { manifestoIntro, manifestoFeatures } from "@/data/manifesto"

export default function ManifestoPage() {
  return (
    <main className="min-w-0 overflow-x-hidden py-8 sm:py-12 md:py-16 lg:py-20">
      <Container size="narrow" className="space-y-10 sm:space-y-12">
        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-muted">
          <div className="relative aspect-[3/1] w-full min-h-[200px] sm:min-h-[240px]">
            <Image
              src="/manifesto-hero.svg"
              alt=""
              fill
              priority
              unoptimized
              className="object-cover object-left"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        </div>
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
