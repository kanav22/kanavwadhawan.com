import Link from "next/link"
import { ArrowRight, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"

/**
 * Simplified architecture diagram wireframe for visual hook.
 */
function BlueprintDiagramPreview() {
  return (
    <div
      className="relative hidden aspect-[4/3] w-full max-w-[280px] overflow-hidden rounded-lg border border-border/40 bg-muted/30 lg:block"
      aria-hidden="true"
    >
      {/* Wireframe nodes */}
      <svg
        viewBox="0 0 280 210"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        <path
          d="M140 40 L140 80 M140 120 L140 160 M80 100 L200 100 M100 60 L180 60 M100 140 L180 140"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        
        {/* Top node - App Shell */}
        <rect x="100" y="20" width="80" height="32" rx="6" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" />
        <text x="140" y="40" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5">App Shell</text>
        
        {/* Middle row */}
        <rect x="20" y="70" width="70" height="28" rx="5" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" />
        <text x="55" y="88" textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity="0.4">Offline Sync</text>
        
        <rect x="105" y="70" width="70" height="28" rx="5" className="fill-primary/10 stroke-primary/30" />
        <text x="140" y="88" textAnchor="middle" fontSize="8" className="fill-primary/70">Auth</text>
        
        <rect x="190" y="70" width="70" height="28" rx="5" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" />
        <text x="225" y="88" textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity="0.4">Biometrics</text>
        
        {/* Bottom row */}
        <rect x="40" y="120" width="65" height="26" rx="5" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.12" />
        <text x="72" y="137" textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.35">API Gateway</text>
        
        <rect x="115" y="120" width="50" height="26" rx="5" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.12" />
        <text x="140" y="137" textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.35">Storage</text>
        
        <rect x="175" y="120" width="65" height="26" rx="5" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.12" />
        <text x="207" y="137" textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.35">Observability</text>
        
        {/* Bottom - Payments */}
        <rect x="90" y="165" width="100" height="28" rx="5" className="fill-primary/5 stroke-primary/20" />
        <text x="140" y="183" textAnchor="middle" fontSize="8" className="fill-primary/60">Payments · Risk</text>
      </svg>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <span className="text-xs font-medium text-muted-foreground">Click to explore</span>
      </div>
    </div>
  )
}

/**
 * Prominent Blueprints preview card for homepage — flagship product demo.
 * Includes a visual SVG wireframe as a "visual hook".
 */
export function BlueprintsPreviewCard() {
  return (
    <section className="border-t border-border/40 py-12 md:py-16 lg:py-20" aria-labelledby="blueprints-preview-heading">
      <Container>
        <Card className="overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg">
          <CardContent className="p-5 sm:p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
              {/* Text content */}
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Layers className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 id="blueprints-preview-heading" className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    Architecture Blueprints
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base line-clamp-3">
                  Interactive diagram of my standard fintech mobile ecosystem: App Shell, Auth & Session, Offline Sync, API Gateway, Secure Storage, Observability, Release & CI/CD.
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground/90 sm:text-sm">
                  Shows how I design mobile systems that handle money and identity.
                </p>
                <div className="mt-4">
                  <Button asChild size="lg" className="h-12 min-h-[48px] w-full rounded-lg px-6 text-base sm:w-auto" aria-label="Explore Architecture Blueprints">
                    <Link href="/blueprints" className="gap-2">
                      Explore Blueprints
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Visual SVG placeholder - desktop only */}
              <Link href="/blueprints" className="shrink-0">
                <BlueprintDiagramPreview />
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}
