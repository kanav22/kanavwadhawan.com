import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Container } from "@/components/container"
import { profile } from "@/data/profile"

const socialLinks = [
  {
    href: profile.github,
    label: "GitHub",
    icon: Github,
    external: true,
  },
  {
    href: profile.linkedinUrl,
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
  },
  {
    href: `mailto:${profile.email}`,
    label: "Email",
    icon: Mail,
    external: false,
  },
]

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
]

/**
 * Responsive footer with proper tap targets.
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <Container className="py-8 sm:py-12 md:py-16">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-8">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-[44px] flex items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm sm:min-h-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="h-11 w-11 flex items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-10 sm:w-10"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/40 sm:mt-8 sm:pt-8">
          <p className="text-center text-xs text-muted-foreground/80 sm:text-sm">
            © {currentYear} {profile.name}
          </p>
        </div>
      </Container>
    </footer>
  )
}
