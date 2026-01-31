export interface ExpertiseItem {
  name: string
  value: string
}

export interface ExpertiseCategory {
  title: string
  items: (string | ExpertiseItem)[]
}

export interface Profile {
  // Personal Info
  name: string
  firstName: string
  lastName: string
  title: string
  tagline: string
  email: string
  phone: string
  location: string
  country: string
  
  // About (short bio for homepage)
  about: string
  
  // Proof chips (social proof items for hero section)
  proofChips: string[]
  
  // Social Links
  linkedin: string
  linkedinUrl: string // Canonical - use this for all LinkedIn links
  github: string
  twitter?: string
  
  // Website
  website: string
  resumeUrl: string
  resumeLastUpdated: string // e.g., "January 2026"
  ogImage: string
  
  // SEO & Bio
  bio: string
  shortBio: string
  
  // Keywords for SEO
  keywords: string[]
  
  // Leadership highlights (for Leadership section)
  leadershipHighlights: string[]
  
  // Impact stats (for hero/stats section)
  impactStats: { value: string; label: string }[]
  
  // Expertise categories (professional grouping)
  expertiseCategories: ExpertiseCategory[]
  
  // Job Info (for structured data)
  jobTitle: string
  worksFor: {
    name: string
    url?: string
  }
  
  // Alumni (for structured data)
  alumniOf: {
    name: string
    url?: string
  }[]
}

export const profile: Profile = {
  // Personal Info
  name: "Kanav Wadhawan",
  firstName: "Kanav",
  lastName: "Wadhawan",
  title: "Mobile Engineering Leader & Fintech Architect",
  tagline: "10+ years architecting scalable systems for millions of users at companies like Paytm, Weavr, and Angel One. Leading mobile teams and building fintech products that ship.",
  email: "Kwadhawan.business@outlook.com",
  phone: "+44 7749 706240",
  location: "United Kingdom",
  country: "GB",
  
  // About (short bio for homepage - 3-5 lines)
  about: "I'm a hands-on engineering leader passionate about mobile technology. With over a decade of experience shipping Android, iOS, and React Native apps, I've led teams at fintech companies like Paytm and Angel One, and built SDKs used by thousands of developers. I drive cross-functional collaboration with Product and Design, focus on engineering process optimization, and mentor engineers from junior to senior level. I thrive at the intersection of technical excellence and product thinking.",
  
  // Proof chips (social proof shown in hero section)
  proofChips: [
    "10M+ users impacted",
    "4.5+ Play Store rating",
    "30% build time improvement",
    "10+ years experience",
  ],
  
  // Social Links
  linkedin: "https://www.linkedin.com/in/kanav-wadhawan/",
  linkedinUrl: "https://www.linkedin.com/in/kanav-wadhawan/",
  github: "https://github.com/kanav22",
  twitter: undefined,
  
  // Website - Using www subdomain as canonical
  website: "https://www.kanavwadhawan.com",
  resumeUrl: "/Kanav_wadhawan_resume.pdf",
  resumeLastUpdated: "January 2026",
  ogImage: "/og.png",
  
  // SEO & Bio
  bio: "Mobile Engineering Leader and Fintech Architect with 10+ years of experience architecting scalable systems for millions of users. I excel in leading complex mobile development projects, driving architectural decisions, and building high-performing teams at companies like Paytm, Weavr, and Angel One.",
  shortBio: "Mobile Engineering Leader & Fintech Architect with 10+ years architecting scalable systems for millions of users. Specializing in Android, iOS, and React Native.",
  
  // Keywords for SEO
  keywords: [
    "Mobile Engineering Leader",
    "Fintech Architect",
    "Engineering Manager",
    "Mobile Tech Lead",
    "Android Architect",
    "Fintech Mobile",
    "Kotlin",
    "Swift",
    "React Native",
    "UK Software Engineer",
    "Kanav Wadhawan",
  ],
  
  // Impact stats
  impactStats: [
    { value: "10M+", label: "Users impacted" },
    { value: "4.5+", label: "Play Store rating" },
    { value: "30%", label: "Build time improvement" },
    { value: "10+", label: "Years experience" },
  ],
  
  // Expertise categories (skill + business value for "So What?" factor)
  expertiseCategories: [
    {
      title: "Core Architecture",
      items: [
        { name: "Clean Architecture", value: "scalable, testable codebases" },
        { name: "MVI/MVVM", value: "predictable state and faster feature delivery" },
        { name: "Modularization", value: "parallel teams and faster builds" },
        { name: "Dagger/Hilt", value: "testable dependencies and maintainability" },
      ],
    },
    {
      title: "Fintech & Security",
      items: [
        { name: "Biometrics", value: "secure, low-friction auth" },
        { name: "Secure Storage", value: "PCI-DSS and compliance readiness" },
        { name: "Encryption", value: "data protection at rest and in transit" },
        { name: "Payment Gateways", value: "reliable checkout and reconciliation" },
      ],
    },
    {
      title: "Leadership",
      items: [
        { name: "Team Mentorship", value: "junior-to-senior growth" },
        { name: "Agile/Scrum", value: "predictable delivery and visibility" },
        { name: "CI/CD Pipelines", value: "shorter release cycles and quality gates" },
        { name: "Product Strategy", value: "alignment and impact-focused roadmaps" },
      ],
    },
  ],
  
  // Leadership highlights (real metrics from experience)
  leadershipHighlights: [
    "Led teams of 10–25+ engineers across multiple time zones, establishing code review standards that reduced production bugs by 35%",
    "Built CI/CD pipelines with Jenkins and Fastlane that cut deployment cycles from 2 weeks to 2 days, enabling weekly releases",
    "Implemented test automation strategies increasing code coverage from 40% to 85%, reducing app crash rates to under 0.1%",
    "Owned P&L-critical product lines, maintaining zero trading outages during market hours while processing 1M+ daily transactions",
    "Mentoring junior-to-senior engineers through structured code reviews, pair programming, and architecture design sessions",
    "Cross-functional collaboration with Product, Design, and Backend—driving alignment and features used by millions of users",
    "Engineering process optimization: standardized CI/CD, test gates, and release workflows across mobile teams",
  ],
  
  // Job Info (for structured data)
  jobTitle: "Mobile Engineering Leader & Fintech Architect",
  worksFor: {
    name: "Weavr.io",
    url: "https://weavr.io",
  },
  
  // Alumni (for structured data)
  alumniOf: [
    {
      name: "Guru Gobind Singh Indraprastha University",
      url: "http://www.ipu.ac.in",
    },
    {
      name: "Udacity",
      url: "https://www.udacity.com",
    },
  ],
}

export interface Skill {
  name: string
  category: "languages" | "frameworks" | "tools" | "cloud"
}

export const skills: Skill[] = [
  // Languages
  { name: "Kotlin", category: "languages" },
  { name: "Swift", category: "languages" },
  { name: "Java", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  
  // Frameworks
  { name: "Android SDK", category: "frameworks" },
  { name: "Jetpack Compose", category: "frameworks" },
  { name: "iOS/UIKit", category: "frameworks" },
  { name: "React Native", category: "frameworks" },
  { name: "MVVM", category: "frameworks" },
  { name: "MVI", category: "frameworks" },
  { name: "Clean Architecture", category: "frameworks" },
  { name: "RxJava", category: "frameworks" },
  { name: "Kotlin Coroutines", category: "frameworks" },
  { name: "Kotlin Flow", category: "frameworks" },
  
  // Tools
  { name: "Android Studio", category: "tools" },
  { name: "Xcode", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "Gradle", category: "tools" },
  { name: "Jenkins", category: "tools" },
  { name: "CircleCI", category: "tools" },
  { name: "Fastlane", category: "tools" },
  { name: "JUnit", category: "tools" },
  { name: "Espresso", category: "tools" },
  { name: "Mockito", category: "tools" },
  
  // Cloud & Services
  { name: "Firebase", category: "cloud" },
  { name: "REST APIs", category: "cloud" },
  { name: "OAuth 2.0", category: "cloud" },
  { name: "OpenID Connect", category: "cloud" },
  { name: "Play Store", category: "cloud" },
  { name: "App Store", category: "cloud" },
]

// Derived skill names for SEO
export const skillNames = skills.map((s) => s.name)
