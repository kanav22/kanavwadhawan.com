import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

const ALLOWED = ["token-refresh.svg", "offline-sync.svg", "performance-budgets.svg"]

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params
  if (!filename || !ALLOWED.includes(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  try {
    const filePath = join(process.cwd(), "public", "note-images", filename)
    const content = await readFile(filePath, "utf-8")
    return new NextResponse(content, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}
