import { timingSafeEqual } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const COOKIE_NAME = "resume_access"
const COOKIE_MAX_AGE = 60 * 60 // 1 hour

export async function POST(request: NextRequest) {
  const password = process.env.RESUME_PASSWORD
  if (!password) {
    return NextResponse.json(
      { error: "Resume download is not configured" },
      { status: 503 }
    )
  }

  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }

  const submitted = body.password?.trim()
  if (!submitted) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    )
  }

  // Constant-time comparison to reduce timing attacks
  const a = Buffer.from(submitted, "utf8")
  const b = Buffer.from(password, "utf8")
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json(
      { error: "Incorrect password" },
      { status: 401 }
    )
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  })

  return NextResponse.json({ success: true })
}
