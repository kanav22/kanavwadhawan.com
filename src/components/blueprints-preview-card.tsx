import Link from "next/link"
import { ArrowRight, Layers } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"

/**
 * Prominent Blueprints preview card for homepage — flagship product demo.
 */
export function BlueprintsPreviewCard() {
  return (
    <section className="border-t border-border/40 py-12 md:py-16 lg:py-20" aria-labelledby="blueprints-preview-heading">
      <Container>
        <Card className="overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg">
          <CardContent className="p-5 sm:p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Layers className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 id="blueprints-preview-heading" className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    Architecture Blueprints
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Interactive diagram of my standard fintech mobile ecosystem: App Shell, Offline Cache & Sync, Auth & Session, Biometric Bridge, Secure Storage, API Gateway, Risk Engine, Payments, Feature Flags, Observability, Push/Messaging, Release & CI/CD. Click a node to see my preferred approach, trade-offs, failure modes, and testing strategy.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg" className="h-12 min-h-[48px] w-full rounded-lg px-6 text-base sm:w-auto" aria-label="Explore Architecture Blueprints">
                  <Link href="/blueprints" className="gap-2">
                    Explore Blueprints
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/50 bg-muted/30 px-5 py-3 sm:px-6 sm:py-4">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Click nodes to see trade-offs, failure modes, and how I test.
            </p>
          </CardFooter>
        </Card>
      </Container>
    </section>
  )
}
