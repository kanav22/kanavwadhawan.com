"use client"

import { useState, useCallback } from "react"
import { Linkedin, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLinkedInShareUrl, getLinkedInCaption, type Note } from "@/data/notes"
import { siteConfig } from "@/lib/metadata"
import { cn } from "@/lib/utils"

interface NoteShareButtonsProps {
  note: Note
  className?: string
}

/**
 * Share on LinkedIn (opens share URL) + Copy LinkedIn caption (copies to clipboard).
 * Mobile: 48px min tap targets; grouped and minimal.
 */
export function NoteShareButtons({ note, className }: NoteShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const postUrl = `${siteConfig.url}/notes/${note.slug}`
  const shareUrl = getLinkedInShareUrl(postUrl)
  const caption = getLinkedInCaption(note)

  const handleCopyCaption = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(caption)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }, [caption])

  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      role="group"
      aria-label="Share options"
    >
      <Button
        asChild
        variant="outline"
        size="touch"
        className="min-h-[48px] gap-2 rounded-lg"
      >
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-5 w-5" aria-hidden />
          Share on LinkedIn
        </a>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="touch"
        className="min-h-[48px] gap-2 rounded-lg"
        onClick={handleCopyCaption}
        aria-label={copied ? "Copied" : "Copy LinkedIn caption"}
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-600" aria-hidden />
        ) : (
          <Copy className="h-5 w-5" aria-hidden />
        )}
        {copied ? "Copied" : "Copy LinkedIn caption"}
      </Button>
    </div>
  )
}
