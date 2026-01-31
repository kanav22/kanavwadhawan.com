"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Toggle theme"
    >
      <Sun 
        className="h-[18px] w-[18px] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" 
        aria-hidden="true"
      />
      <Moon 
        className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" 
        aria-hidden="true"
      />
    </Button>
  )
}
