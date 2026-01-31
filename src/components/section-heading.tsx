import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
}

/**
 * Responsive section heading with proper mobile typography.
 */
export function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-10 md:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
