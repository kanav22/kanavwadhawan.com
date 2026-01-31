import type { Metadata } from "next"
import { profile } from "@/data/profile"

/**
 * Base metadata configuration derived from profile.ts
 * This ensures all SEO data is centralized and editable in one place.
 */
export const siteConfig = {
  name: profile.name,
  title: `${profile.name} | ${profile.title}`,
  description: profile.shortBio,
  url: profile.website, // Should include www for canonical
  ogImage: profile.ogImage,
  links: {
    github: profile.github,
    linkedin: profile.linkedinUrl,
    twitter: profile.twitter,
  },
}

/**
 * Generate page-specific metadata with OpenGraph and Twitter cards.
 * Use this in each page's metadata export.
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage

  return {
    title,
    description,
    keywords: profile.keywords,
    authors: [{ name: profile.name, url: profile.website }],
    creator: profile.name,
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: profile.name,
      title: `${title} | ${profile.name}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${profile.name} - ${profile.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.name}`,
      description,
      images: [ogImage],
      creator: profile.twitter ? `@${profile.twitter.split("/").pop()}` : undefined,
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

/**
 * Default metadata for the root layout.
 * Includes comprehensive SEO configuration.
 * Canonical URL uses www subdomain.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${profile.name}`,
  },
  description: siteConfig.description,
  keywords: profile.keywords,
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: profile.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${profile.name} - ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: profile.twitter ? `@${profile.twitter.split("/").pop()}` : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
}
