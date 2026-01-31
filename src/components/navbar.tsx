"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Container } from "@/components/container"
import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
]

/**
 * Responsive navbar with mobile Sheet navigation.
 * - Mobile: Brand + ThemeToggle + Hamburger
 * - Desktop: Brand + Nav links + ThemeToggle + CTA
 */
export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="shrink-0 font-semibold tracking-tight text-foreground transition-colors duration-200 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            <span className="hidden sm:inline">{profile.name}</span>
            <span className="sm:hidden">KW</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative min-h-[48px] flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute inset-x-3 -bottom-[1.5px] h-px bg-foreground" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <ThemeToggle />
            <Button 
              asChild 
              size="sm" 
              className="ml-1 h-9 rounded-lg px-4 text-sm font-medium"
            >
              <a href={`mailto:${profile.email}`} aria-label="Email me">
                <Mail className="mr-2 h-4 w-4" />
                Email me
              </a>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon-lg" 
                  className="shrink-0 rounded-lg" 
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full max-w-xs p-0"
                showCloseButton={false}
              >
                <SheetHeader className="flex flex-row items-center justify-between border-b border-border/40 px-4 py-3">
                  <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
                  <SheetClose asChild>
                    <Button 
                      variant="ghost" 
                      size="icon-lg" 
                      className="rounded-lg"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </SheetHeader>
                
                <nav className="flex flex-col p-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex min-h-[48px] items-center rounded-lg px-4 text-base font-medium transition-colors duration-200",
                          pathname === link.href
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  
                  {/* Mobile CTA */}
                  <div className="mt-6 pt-6 border-t border-border/40">
                    <SheetClose asChild>
                      <Button asChild size="touch" className="w-full min-h-[48px] text-base rounded-lg">
                        <a href={`mailto:${profile.email}`} aria-label="Email me">
                          <Mail className="mr-2 h-5 w-5" />
                          Email me
                        </a>
                      </Button>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </Container>
    </header>
  )
}
