export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  impact: string
  image: string
  tags: string[]
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  // Company info
  company: string
  companyLogo?: string // Path to logo, e.g., "/logos/weavr.svg"
  // App store links
  googlePlayUrl?: string
  appStoreUrl?: string
  // Extended fields for detail page
  role: string
  duration: string
  team?: string
  challenges: string[]
  solutions: string[]
  results: string[]
  screenshots?: string[]
}

export const projects: Project[] = [
  {
    id: "weavr-sdk",
    slug: "weavr-sdk",
    title: "Weavr Financial SDK",
    company: "Weavr.io",
    companyLogo: "/logos/weavr.svg",
    description: "Cross-platform SDK enabling seamless integration of financial products into mobile applications.",
    longDescription: "Developed a comprehensive SDK that allows third-party applications to integrate banking, payments, and financial management features. The SDK supports both Android and React Native platforms with a unified API, enabling fintech startups to launch compliant financial products in days instead of months.",
    impact: "Reduced client integration time from weeks to days",
    image: "/projects/weavr-sdk.svg",
    tags: ["Mobile", "SDK", "FinTech"],
    stack: ["Kotlin", "React Native", "TypeScript", "REST APIs"],
    featured: true,
    role: "Senior Mobile Engineer",
    duration: "2024 - Present",
    team: "Cross-functional team of 8 engineers",
    challenges: [
      "Creating a unified API that works seamlessly across Android and React Native platforms",
      "Ensuring PCI-DSS compliance while maintaining developer-friendly integration",
      "Building robust error handling for financial transactions with proper rollback mechanisms"
    ],
    solutions: [
      "Designed a platform-agnostic abstraction layer with native bridges for performance-critical operations",
      "Implemented tokenization and secure storage patterns that meet regulatory requirements",
      "Created comprehensive error taxonomy with automatic retry logic and transaction state management"
    ],
    results: [
      "Reduced client integration time from 2-3 weeks to 2-3 days",
      "SDK adopted by multiple fintech startups for their product launches",
      "Zero critical security issues reported since launch"
    ]
  },
  {
    id: "paytm-mobile",
    slug: "paytm-mobile-banking",
    title: "Paytm Mobile Banking",
    company: "Paytm",
    companyLogo: "/logos/paytm.svg",
    description: "Led mobile engineering for one of the UK's leading digital payment platforms.",
    longDescription: "Managed the complete mobile application lifecycle for Paytm's UK operations, including payment processing, account management, and financial services integration. Led a global team of engineers while maintaining hands-on involvement in architecture decisions and code reviews.",
    impact: "Served 500K+ active users with 99.9% uptime",
    image: "/projects/paytm.svg",
    tags: ["Mobile", "Payments", "FinTech"],
    stack: ["Android", "Kotlin", "MVVM", "Firebase"],
    featured: true,
    role: "Mobile Engineering Manager",
    duration: "2021 - 2024",
    team: "Global team of 10 mobile engineers",
    challenges: [
      "Scaling the app to handle rapid user growth while maintaining performance",
      "Coordinating releases across multiple time zones with distributed team",
      "Implementing real-time payment status updates without draining battery"
    ],
    solutions: [
      "Implemented modular architecture allowing independent feature development and testing",
      "Established CI/CD pipelines with automated testing gates and staged rollouts",
      "Built efficient WebSocket connection management with intelligent reconnection strategies"
    ],
    results: [
      "Maintained 99.9% uptime serving 500K+ active users",
      "Reduced deployment cycle time by 40% through CI/CD automation",
      "Achieved 4.5+ star rating on app stores"
    ]
  },
  {
    id: "angel-trading",
    slug: "angel-one-trading",
    title: "Angel One Trading App",
    company: "Angel One",
    companyLogo: "/logos/angelone.svg",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.msf.angelbrokingapp",
    description: "Real-time stock trading platform serving millions of retail investors in India.",
    longDescription: "Led the mobile engineering team responsible for the core trading experience, including real-time market data, order execution, and portfolio management features. The platform handles millions of transactions daily during peak market hours.",
    impact: "Processed 1M+ daily transactions",
    image: "/projects/angel-one.svg",
    tags: ["Mobile", "Trading", "FinTech"],
    stack: ["Android", "Kotlin", "WebSocket", "Clean Architecture"],
    featured: true,
    role: "Senior Mobile Engineering Manager",
    duration: "2020 - 2021",
    team: "Team of engineering managers and 25+ engineers",
    challenges: [
      "Handling real-time market data updates for thousands of instruments simultaneously",
      "Ensuring order execution reliability during high-volatility market conditions",
      "Building offline-capable portfolio views with eventual consistency"
    ],
    solutions: [
      "Implemented efficient diff-based UI updates with RecyclerView optimizations",
      "Built redundant order submission paths with automatic failover",
      "Designed local-first architecture with background sync for portfolio data"
    ],
    results: [
      "Platform processed 1M+ daily transactions reliably",
      "Reduced order placement latency to under 100ms",
      "Zero trading outages during market hours"
    ]
  },
  {
    id: "indmoney-app",
    slug: "indmoney-personal-finance",
    title: "INDmoney Personal Finance",
    company: "INDmoney",
    companyLogo: "/logos/indmoney.svg",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.ind.money",
    description: "All-in-one personal finance app for tracking investments, expenses, and net worth.",
    longDescription: "Architected and led development of the Android application from ground up, implementing module-based architecture for scalability and comprehensive automated testing. The app aggregates financial data from multiple sources to provide unified wealth tracking.",
    impact: "Grew to 2M+ downloads with 4.5★ rating",
    image: "/projects/indmoney.svg",
    tags: ["Mobile", "Personal Finance", "FinTech"],
    stack: ["Android", "Kotlin", "Room", "Retrofit"],
    featured: false,
    role: "Lead Android Developer",
    duration: "2019 - 2020",
    team: "Android team of 5 engineers",
    challenges: [
      "Aggregating financial data from 50+ different institutions with varying APIs",
      "Building secure credential storage for bank account connections",
      "Creating intuitive visualizations for complex financial data"
    ],
    solutions: [
      "Designed plugin-based adapter system for institution integrations",
      "Implemented encrypted storage with biometric authentication",
      "Built custom charting components optimized for financial data display"
    ],
    results: [
      "App grew to 2M+ downloads organically",
      "Maintained 4.5+ star rating on Play Store",
      "Reduced app crash rate to under 0.1%"
    ]
  },
  {
    id: "aetna-health",
    slug: "aetna-health-insurance",
    title: "Aetna Health Insurance",
    company: "Aetna (via Infosys)",
    companyLogo: "/logos/aetna.svg",
    description: "Enterprise mobile application for health insurance management and claims processing.",
    longDescription: "Developed core features for Aetna's mobile health insurance platform, including claims submission, provider search, and benefits management for millions of policyholders. Worked on features that significantly improved the claims processing experience.",
    impact: "Reduced claims processing time by 60%",
    image: "/projects/aetna.svg",
    tags: ["Mobile", "Healthcare", "Enterprise"],
    stack: ["Android", "Java", "REST APIs", "SQLite"],
    featured: false,
    role: "Senior Android Developer",
    duration: "2013 - 2018",
    team: "Enterprise mobile team at Infosys",
    challenges: [
      "Digitizing complex paper-based claims submission workflows",
      "Ensuring HIPAA compliance for sensitive health data",
      "Supporting offline claims drafts for users with limited connectivity"
    ],
    solutions: [
      "Designed step-by-step claims wizard with document capture and validation",
      "Implemented end-to-end encryption with secure key management",
      "Built robust offline sync with conflict resolution for draft claims"
    ],
    results: [
      "Reduced average claims processing time by 60%",
      "Increased digital claims submission adoption by 40%",
      "Zero security incidents or compliance violations"
    ]
  },
  {
    id: "ci-cd-framework",
    slug: "mobile-cicd-framework",
    title: "Mobile CI/CD Framework",
    company: "Paytm",
    companyLogo: "/logos/paytm.svg",
    description: "Automated build and deployment pipeline for mobile applications.",
    longDescription: "Designed and implemented a comprehensive CI/CD framework using Jenkins and Fastlane, enabling automated testing, code quality checks, and deployment to app stores. The framework standardized release processes across multiple mobile teams.",
    impact: "Reduced release cycle from 2 weeks to 2 days",
    image: "/projects/cicd.svg",
    tags: ["DevOps", "Automation", "Mobile"],
    stack: ["Jenkins", "Fastlane", "CircleCI", "Gradle"],
    featured: false,
    role: "Mobile Engineering Manager",
    duration: "2021 - 2024",
    challenges: [
      "Standardizing build processes across multiple apps with different configurations",
      "Reducing manual intervention in release process while maintaining quality",
      "Managing code signing and provisioning profiles securely"
    ],
    solutions: [
      "Created templated pipeline configurations with environment-specific overrides",
      "Implemented automated test gates with coverage thresholds",
      "Built secure secrets management with rotating credentials"
    ],
    results: [
      "Reduced release cycle from 2 weeks to 2 days",
      "Achieved 95% automated test coverage across projects",
      "Eliminated release-blocking manual steps"
    ]
  }
]

export const allTags = Array.from(new Set(projects.flatMap(p => p.tags)))

// Helper to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

// Helper to get next project
export function getNextProject(currentSlug: string): Project | undefined {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug)
  if (currentIndex === -1 || currentIndex === projects.length - 1) return undefined
  return projects[currentIndex + 1]
}

// Helper to get previous project
export function getPreviousProject(currentSlug: string): Project | undefined {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug)
  if (currentIndex <= 0) return undefined
  return projects[currentIndex - 1]
}
