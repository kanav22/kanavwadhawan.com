import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Container } from "@/components/container"
import { profile } from "@/data/profile"

const socialLinks = [
  {
    href: profile.github,
    label: "GitHub",
    icon: Github,
  },
  {
    href: profile.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: `mailto:${profile.email}`,
    label: "Email",
    icon: Mail,
  },
]

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-8" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
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
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="rounded-lg p-2.5 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40">
          <p className="text-center text-sm text-muted-foreground/80">
            © {currentYear} {profile.name}
          </p>
        </div>
      </Container>
    </footer>
  )
}
