import { profile, skillNames } from "@/data/profile"

/**
 * JSON-LD Structured Data for SEO
 * These schemas help search engines understand the content better
 * and can enable rich snippets in search results.
 */

interface JsonLdProps {
  type: "person" | "website" | "webpage" | "breadcrumb"
  data?: Record<string, unknown>
}

export function JsonLd({ type, data }: JsonLdProps) {
  let structuredData: Record<string, unknown>

  switch (type) {
    case "person":
      structuredData = getPersonSchema()
      break
    case "website":
      structuredData = getWebSiteSchema()
      break
    case "webpage":
      structuredData = getWebPageSchema(data as { title: string; description: string; url: string })
      break
    case "breadcrumb":
      structuredData = getBreadcrumbSchema(data as { items: { name: string; url: string }[] })
      break
    default:
      return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

/**
 * Person Schema - Represents Kanav Wadhawan
 * https://schema.org/Person
 */
function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${profile.website}/#person`,
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.jobTitle,
    description: profile.shortBio,
    url: profile.website,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    image: `${profile.website}${profile.ogImage}`,
    sameAs: [
      profile.linkedinUrl,
      profile.github,
      profile.twitter,
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressCountry: profile.country,
      addressLocality: profile.location,
    },
    worksFor: {
      "@type": "Organization",
      name: profile.worksFor.name,
      url: profile.worksFor.url,
    },
    alumniOf: profile.alumniOf.map((school) => ({
      "@type": "EducationalOrganization",
      name: school.name,
      url: school.url,
    })),
    knowsAbout: skillNames,
    nationality: {
      "@type": "Country",
      name: profile.location,
    },
  }
}

/**
 * WebSite Schema - Represents the portfolio website
 * https://schema.org/WebSite
 */
function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${profile.website}/#website`,
    name: `${profile.name} - Portfolio`,
    description: profile.shortBio,
    url: profile.website,
    inLanguage: "en-GB",
    author: {
      "@id": `${profile.website}/#person`,
    },
    publisher: {
      "@id": `${profile.website}/#person`,
    },
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@id": `${profile.website}/#person`,
    },
  }
}

/**
 * WebPage Schema - For individual pages
 * https://schema.org/WebPage
 */
function getWebPageSchema(data: { title: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": data.url,
    name: data.title,
    description: data.description,
    url: data.url,
    inLanguage: "en-GB",
    isPartOf: {
      "@id": `${profile.website}/#website`,
    },
    about: {
      "@id": `${profile.website}/#person`,
    },
    author: {
      "@id": `${profile.website}/#person`,
    },
    dateModified: new Date().toISOString(),
  }
}

/**
 * BreadcrumbList Schema - For navigation
 * https://schema.org/BreadcrumbList
 */
function getBreadcrumbSchema(data: { items: { name: string; url: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Combined schema for the home page
 * Includes both Person and WebSite schemas
 */
export function HomePageJsonLd() {
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [getPersonSchema(), getWebSiteSchema()],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
    />
  )
}

/**
 * Profile Page JSON-LD (for resume page)
 */
export function ProfilePageJsonLd() {
  return <JsonLd type="person" />
}
