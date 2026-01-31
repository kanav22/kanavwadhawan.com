import { ArrowUpRight, Layers, TestTube, Boxes } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { profile } from "@/data/profile"

/**
 * Featured Technical Deep Dive — showcases Multi-module Clean Architecture
 * with emphasis on scalability and testability. Positions as architect-level
 * thinking rather than just "link to repos."
 */
export function FeaturedTechnicalDeepDive() {
  return (
    <section className="border-t border-border/40 bg-muted/30 py-12 sm:py-16 md:py-20 lg:py-24">
      <Container>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-3">
          Featured Technical Deep Dive
        </h2>
        <p className="mb-6 max-w-2xl text-sm text-muted-foreground sm:mb-8 sm:text-base">
          High-level architecture I implement and advocate for in production mobile codebases.
        </p>

        <Card className="overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg">
          <CardContent className="p-5 sm:p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2 sm:mb-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Multi-module Clean Architecture
              </h3>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              I structure apps into feature and core modules with clear boundaries: presentation (UI), domain (business logic), and data (repositories, APIs). Each layer depends inward only, which keeps the codebase scalable as teams and features grow and makes dependencies easy to mock for unit and integration tests.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Boxes className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span><strong className="text-foreground">Scalability:</strong> New features and teams can own modules without stepping on each other; build times stay manageable with incremental compilation and optional dynamic delivery.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <TestTube className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span><strong className="text-foreground">Testability:</strong> Domain and use cases are pure logic with no framework dependencies, so they’re covered by fast, deterministic tests; UI and data layers are tested in isolation with fakes.</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="border-t border-border/50 p-4 sm:p-5">
            <Button
              asChild
              variant="outline"
              size="touch"
              className="w-full sm:w-auto gap-1.5 font-medium"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View architectural samples and open source contributions on GitHub"
              >
                View architectural samples on GitHub
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </section>
  )
}
