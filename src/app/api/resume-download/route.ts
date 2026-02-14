import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { readFile } from "fs/promises"
import { join } from "path"

const COOKIE_NAME = "resume_access"
const RESUME_FILENAME = "Kanav_wadhawan_resume.pdf"

export async function GET() {
  const cookieStore = await cookies()
  const access = cookieStore.get(COOKIE_NAME)
  if (!access?.value) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const filePath = process.env.RESUME_PDF_PATH ?? join(process.cwd(), "private", RESUME_FILENAME)
  let buffer: Buffer
  try {
    buffer = await readFile(filePath)
  } catch (err) {
    console.error("Resume file read error:", err)
    return NextResponse.json(
      { error: "Resume file not found" },
      { status: 404 }
    )
  }

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${RESUME_FILENAME}"`,
      "Content-Length": String(buffer.length),
    },
  })
}
