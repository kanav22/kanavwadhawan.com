import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "article" | "main"
  size?: "default" | "narrow" | "wide"
}

/**
 * Responsive container with mobile-first padding.
 * - Mobile (320px+): px-4 (16px)
 * - Small (640px+): px-6 (24px)
 * - Large (1024px+): px-8 (32px)
 */
export function Container({
  children,
  className,
  as: Component = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-5xl",
        size === "wide" && "max-w-6xl",
        className
      )}
    >
      {children}
    </Component>
  )
}
