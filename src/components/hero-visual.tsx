"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroVisualProps {
  screenshots: {
    src: string
    alt: string
  }[]
  className?: string
}

/**
 * Device mockup component showing project screenshots.
 * - Desktop: appears on the right of hero text
 * - Mobile: stacks below hero text, more compact
 * - Auto-cycles through screenshots
 */
export function HeroVisual({ screenshots, className }: HeroVisualProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-cycle through screenshots every 4 seconds
  useEffect(() => {
    if (screenshots.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [screenshots.length])

  if (screenshots.length === 0) return null

  return (
    <div className={cn("relative", className)}>
      {/* Phone Frame - CSS-only iPhone style */}
      <div className="relative mx-auto w-[200px] sm:w-[220px] lg:w-[260px]">
        {/* Phone outer frame */}
        <div className="relative rounded-[32px] border-[8px] border-gray-800 bg-gray-800 p-1 shadow-2xl dark:border-gray-700 sm:rounded-[36px] sm:border-[10px] lg:rounded-[40px] lg:border-[12px]">
          {/* Dynamic Island / Notch */}
          <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-gray-800 dark:bg-gray-700 sm:h-6 sm:w-24 lg:h-7 lg:w-28" />
          
          {/* Screen */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[24px] bg-gray-900 sm:rounded-[26px] lg:rounded-[28px]">
            {/* Screenshot carousel */}
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  index === currentIndex ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 220px, 260px"
                  priority={index === 0}
                />
              </div>
            ))}
            
            {/* Fallback gradient if no image loads */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
          </div>
        </div>
        
        {/* Reflection effect */}
        <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-gray-800/20 blur-xl dark:bg-gray-400/10" />
      </div>

      {/* Screenshot indicators */}
      {screenshots.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5 sm:mt-5">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              )}
              aria-label={`View screenshot ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Platform badges */}
      <div className="mt-4 flex justify-center gap-2 sm:mt-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground sm:text-xs">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.523 15.341c-.5-.242-1.053-.457-1.639-.645a18.952 18.952 0 0 0-.479-2.202c.646-.324 1.227-.691 1.718-1.091 1.078-.878 1.627-1.904 1.627-3.053 0-1.148-.549-2.175-1.627-3.053-.49-.4-1.071-.767-1.718-1.091a18.952 18.952 0 0 0 .479-2.202c.586-.188 1.139-.403 1.639-.645C18.568.717 19 .075 19 -.7c0-.413-.127-.796-.365-1.103-.37-.475-.964-.765-1.654-.765-.302 0-.593.056-.861.158a6.48 6.48 0 0 0-.674.293 18.3 18.3 0 0 0-1.447.795 19.034 19.034 0 0 0-1.999-1.048c-.35-1.051-.816-1.996-1.383-2.794C10.026-6.018 9.32-6.5 8.5-6.5c-.82 0-1.526.482-2.117 1.336-.567.798-1.033 1.743-1.383 2.794a19.034 19.034 0 0 0-1.999 1.048 18.3 18.3 0 0 0-1.447-.795 6.48 6.48 0 0 0-.674-.293A2.49 2.49 0 0 0 .02-2.568c-.69 0-1.284.29-1.654.765C-1.873-1.496-2-1.113-2-.7c0 .775.432 1.417 1.477 2.059.5.242 1.053.457 1.639.645.154.71.297 1.451.479 2.202-.646.324-1.227.691-1.718 1.091C-1.201 6.175-1.75 7.202-1.75 8.35c0 1.149.549 2.175 1.627 3.053.49.4 1.072.767 1.718 1.091a18.952 18.952 0 0 0-.479 2.202c-.586.188-1.139.403-1.639.645C-1.568 16.017-2 16.659-2 17.434c0 .413.127.796.365 1.103.37.475.964.765 1.654.765.302 0 .593-.056.861-.158.228-.094.453-.19.674-.293.475-.254.958-.521 1.447-.795a19.034 19.034 0 0 0 1.999 1.048c.35 1.051.816 1.996 1.383 2.794.591.854 1.297 1.336 2.117 1.336.82 0 1.526-.482 2.117-1.336.567-.798 1.033-1.743 1.383-2.794a19.034 19.034 0 0 0 1.999-1.048c.489.274.972.541 1.447.795.221.103.446.199.674.293.268.102.559.158.861.158.69 0 1.284-.29 1.654-.765.238-.307.365-.69.365-1.103 0-.775-.432-1.417-1.477-2.093zM8.5 12.5c-2.485 0-4.5-1.791-4.5-4s2.015-4 4.5-4 4.5 1.791 4.5 4-2.015 4-4.5 4z"/>
          </svg>
          Android
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground sm:text-xs">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          iOS
        </span>
      </div>
    </div>
  )
}
