"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

type ResumeAuthContextValue = { authorized: boolean | null; setAuthorized: (v: boolean) => void }
const ResumeAuthContext = createContext<ResumeAuthContextValue | null>(null)

function useResumeAuth() {
  const ctx = useContext(ResumeAuthContext)
  if (!ctx) return { authorized: null as boolean | null, setAuthorized: () => {} }
  return ctx
}

interface ResumeDownloadGateProps {
  /** Shown when user is authorized (has valid cookie) */
  children: React.ReactNode
  /** Optional label for the download link when authorized */
  downloadFilename?: string
}

export function ResumeAuthProvider({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  useEffect(() => {
    fetch("/api/resume-download", { method: "HEAD", credentials: "include" })
      .then((res) => setAuthorized(res.ok))
      .catch(() => setAuthorized(false))
  }, [])
  return (
    <ResumeAuthContext.Provider value={{ authorized, setAuthorized }}>
      {children}
    </ResumeAuthContext.Provider>
  )
}

export function ResumeDownloadGate({ children }: ResumeDownloadGateProps) {
  const { authorized, setAuthorized } = useResumeAuth()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/resume-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setAuthorized(true)
        setPassword("")
      } else {
        setError(data.error ?? "Incorrect password")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (authorized === null) {
    return (
      <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-border/40 bg-muted/20">
        <span className="text-sm text-muted-foreground">Checking access…</span>
      </div>
    )
  }

  if (authorized) {
    return <>{children}</>
  }

  return (
    <div className="rounded-xl border border-border/50 bg-muted/20 p-6 sm:p-8" aria-label="Resume PDF access">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Lock className="h-4 w-4" aria-hidden />
        <span className="text-sm font-medium">Resume PDF is password-protected</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
        <label htmlFor="resume-password" className="sr-only">
          Enter password to download resume
        </label>
        <Input
          id="resume-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="min-h-[44px]"
          autoComplete="current-password"
          disabled={loading}
          aria-invalid={!!error}
        />
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" className="min-h-[44px] w-full sm:w-auto" disabled={loading}>
          {loading ? "Checking…" : "Unlock download"}
        </Button>
      </form>
    </div>
  )
}

/** Renders the download link when authorized; otherwise a short message. Use inside ResumeAuthProvider. */
export function ResumeDownloadLink({
  className,
  asButton = true,
  children = "Download PDF",
}: {
  className?: string
  asButton?: boolean
  children?: React.ReactNode
}) {
  const { authorized } = useResumeAuth()
  if (authorized !== true) {
    return (
      <span className="text-sm text-muted-foreground">
        Enter password above to download
      </span>
    )
  }
  const link = (
    <a href="/api/resume-download" download="Kanav_wadhawan_resume.pdf">
      {children}
    </a>
  )
  if (asButton) {
    return (
      <Button asChild className={className}>
        {link}
      </Button>
    )
  }
  return <span className={className}>{link}</span>
}
