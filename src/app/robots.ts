import type { MetadataRoute } from "next"
import { profile } from "@/data/profile"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = profile.website // Uses www subdomain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
