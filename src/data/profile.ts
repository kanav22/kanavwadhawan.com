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
  
  // Social Links
  linkedin: string
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
  title: "Software Engineering Manager",
  tagline: "Building exceptional mobile experiences that scale. 10+ years leading teams and shipping products used by millions.",
  email: "Kwadhawan.business@outlook.com",
  phone: "+44 7749 706240",
  location: "United Kingdom",
  country: "GB",
  
  // About (short bio for homepage - 3-5 lines)
  about: "I'm a hands-on engineering leader passionate about mobile technology. With over a decade of experience shipping Android, iOS, and React Native apps, I've led teams at fintech companies like Paytm and Angel One, and built SDKs used by thousands of developers. I thrive at the intersection of technical excellence and product thinking.",
  
  // Social Links - UPDATE THESE WITH YOUR ACTUAL URLS
  linkedin: "https://www.linkedin.com/in/kanav-wadhawan",
  github: "https://github.com/kanav22",
  twitter: undefined, // Add your Twitter/X handle if you have one: "https://twitter.com/yourhandle"
  
  // Website - Using www subdomain as canonical
  website: "https://www.kanavwadhawan.com",
  resumeUrl: "/resume.pdf",
  resumeLastUpdated: "January 2026", // UPDATE THIS when you update your resume
  ogImage: "/og.png",
  
  // SEO & Bio
  bio: "Accomplished software engineering manager with a proven track record of improving operational efficiency, employee productivity, product reliability, and user experiences. I excel in leading complex mobile development projects, consistently meeting tight timelines while maintaining high quality standards.",
  shortBio: "Software Engineering Manager with 10+ years building mobile apps and leading high-performing teams. Specializing in Android, iOS, and React Native.",
  
  // Keywords for SEO
  keywords: [
    "Software Engineer",
    "Engineering Manager",
    "Mobile Developer",
    "Android Developer",
    "iOS Developer",
    "React Native Developer",
    "Kotlin",
    "Swift",
    "Mobile Engineering Lead",
    "UK Software Engineer",
    "Kanav Wadhawan",
  ],
  
  // Job Info (for structured data)
  jobTitle: "Senior Mobile Engineer",
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
