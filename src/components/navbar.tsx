"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Container } from "@/components/container"
import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-semibold tracking-tight text-foreground transition-colors duration-200 hover:text-foreground/80"
          >
            <span className="hidden sm:inline">Kanav Wadhawan</span>
            <span className="sm:hidden">KW</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
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
          <div className="hidden md:flex md:items-center md:gap-1">
            <ThemeToggle />
            <Button 
              asChild 
              size="sm" 
              className="ml-2 h-8 rounded-lg px-3 text-xs font-medium"
            >
              <a href={`mailto:${profile.email}`}>
                <Mail className="mr-1.5 h-3.5 w-3.5" />
                Email me
              </a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200",
                        pathname === link.href
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button asChild className="w-full">
                      <a href={`mailto:${profile.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email me
                      </a>
                    </Button>
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
