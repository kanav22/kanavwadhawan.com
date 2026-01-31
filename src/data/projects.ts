export interface Project {
  id: string
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
}

export const projects: Project[] = [
  {
    id: "weavr-sdk",
    title: "Weavr Financial SDK",
    description: "Cross-platform SDK enabling seamless integration of financial products into mobile applications.",
    longDescription: "Developed a comprehensive SDK that allows third-party applications to integrate banking, payments, and financial management features. The SDK supports both Android and React Native platforms with a unified API.",
    impact: "Reduced client integration time from weeks to days",
    image: "/projects/weavr-sdk.svg",
    tags: ["Mobile", "SDK", "FinTech"],
    stack: ["Kotlin", "React Native", "TypeScript", "REST APIs"],
    featured: true
  },
  {
    id: "paytm-mobile",
    title: "Paytm Mobile Banking",
    description: "Led mobile engineering for one of the UK's leading digital payment platforms.",
    longDescription: "Managed the complete mobile application lifecycle for Paytm's UK operations, including payment processing, account management, and financial services integration.",
    impact: "Served 500K+ active users with 99.9% uptime",
    image: "/projects/paytm.svg",
    tags: ["Mobile", "Payments", "FinTech"],
    stack: ["Android", "Kotlin", "MVVM", "Firebase"],
    featured: true
  },
  {
    id: "angel-trading",
    title: "Angel One Trading App",
    description: "Real-time stock trading platform serving millions of retail investors in India.",
    longDescription: "Led the mobile engineering team responsible for the core trading experience, including real-time market data, order execution, and portfolio management features.",
    impact: "Processed 1M+ daily transactions",
    image: "/projects/angel-one.svg",
    tags: ["Mobile", "Trading", "FinTech"],
    stack: ["Android", "Kotlin", "WebSocket", "Clean Architecture"],
    featured: true
  },
  {
    id: "indmoney-app",
    title: "INDmoney Personal Finance",
    description: "All-in-one personal finance app for tracking investments, expenses, and net worth.",
    longDescription: "Architected and led development of the Android application from ground up, implementing module-based architecture for scalability and comprehensive automated testing.",
    impact: "Grew to 2M+ downloads with 4.5★ rating",
    image: "/projects/indmoney.svg",
    tags: ["Mobile", "Personal Finance", "FinTech"],
    stack: ["Android", "Kotlin", "Room", "Retrofit"],
    featured: false
  },
  {
    id: "aetna-health",
    title: "Aetna Health Insurance",
    description: "Enterprise mobile application for health insurance management and claims processing.",
    longDescription: "Developed core features for Aetna's mobile health insurance platform, including claims submission, provider search, and benefits management for millions of policyholders.",
    impact: "Reduced claims processing time by 60%",
    image: "/projects/aetna.svg",
    tags: ["Mobile", "Healthcare", "Enterprise"],
    stack: ["Android", "Java", "REST APIs", "SQLite"],
    featured: false
  },
  {
    id: "ci-cd-framework",
    title: "Mobile CI/CD Framework",
    description: "Automated build and deployment pipeline for mobile applications.",
    longDescription: "Designed and implemented a comprehensive CI/CD framework using Jenkins and Fastlane, enabling automated testing, code quality checks, and deployment to app stores.",
    impact: "Reduced release cycle from 2 weeks to 2 days",
    image: "/projects/cicd.svg",
    tags: ["DevOps", "Automation", "Mobile"],
    stack: ["Jenkins", "Fastlane", "CircleCI", "Gradle"],
    featured: false
  }
]

export const allTags = Array.from(new Set(projects.flatMap(p => p.tags)))
