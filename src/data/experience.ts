export interface Experience {
  id: string
  company: string
  companyLogo?: string // Path to logo, e.g., "/logos/weavr.svg"
  role: string
  location: string
  startDate: string
  endDate: string
  description: string
  highlights: string[]
}

export const experiences: Experience[] = [
  {
    id: "weavr",
    company: "Weavr.io",
    companyLogo: "/logos/weavr.svg",
    role: "Senior Mobile Engineer",
    location: "United Kingdom",
    startDate: "2024",
    endDate: "Present",
    description: "Leading development of financial technology SDKs for mobile platforms.",
    highlights: [
      "Built Android and React Native SDKs with a unified API for third-party fintech apps, reducing client integration time from weeks to 2–3 days and enabling faster go-to-market for multiple startups.",
      "Delivered proof-of-concept implementations for new product features, validating 3 roadmap items and accelerating stakeholder decisions.",
      "Refactored core SDK architecture with PCI-DSS–aligned secure storage and error handling, cutting bug resolution time by 50% and improving maintainability."
    ]
  },
  {
    id: "paytm",
    company: "Paytm",
    companyLogo: "/logos/paytm.svg",
    role: "Mobile Engineering Manager",
    location: "United Kingdom",
    startDate: "2021",
    endDate: "2024",
    description: "Managed a global team building mobile payment solutions.",
    highlights: [
      "Led a team of 10 mobile engineers across time zones for Paytm UK's payment and account features, establishing code review standards that reduced production bugs by 35%.",
      "Implemented test automation (unit + UI) across the mobile stack, increasing code coverage from 40% to 85% and improving app stability for 500K+ active users.",
      "Built CI/CD pipelines with Jenkins and Fastlane with automated test gates and staged rollouts, cutting deployment time by 40% and enabling weekly releases."
    ]
  },
  {
    id: "angelone",
    company: "Angel One",
    companyLogo: "/logos/angelone.svg",
    role: "Senior Mobile Engineering Manager",
    location: "India",
    startDate: "2020",
    endDate: "2021",
    description: "Led engineering teams for India's leading stock trading platform.",
    highlights: [
      "Managed engineering managers and 25+ engineers for real-time trading and portfolio features, delivering capabilities used by millions of investors with zero trading outages during market hours.",
      "Drove adoption of engineering best practices (code reviews, test automation, modular architecture), reducing average bug fix time from 5 days to 2 days.",
      "Owned P&L-critical product lines processing 1M+ daily transactions, maintaining zero trading outages and sub-100ms order placement latency."
    ]
  },
  {
    id: "indmoney",
    company: "INDmoney",
    companyLogo: "/logos/indmoney.svg",
    role: "Lead Android Developer",
    location: "India",
    startDate: "2019",
    endDate: "2020",
    description: "Architected and scaled the Android application for personal finance management.",
    highlights: [
      "Designed module-based architecture for aggregation across 50+ institutions, supporting 10x user growth to 2M+ downloads without performance degradation.",
      "Implemented memory and stability optimizations across the Android app, reducing crash rate from 2% to under 0.1% and maintaining a 4.5+ Play Store rating.",
      "Built automated testing with JUnit and Espresso for core flows, achieving 80% code coverage and faster, safer releases."
    ]
  },
  {
    id: "infosys",
    company: "Infosys",
    companyLogo: "/logos/infosys.svg",
    role: "Senior Android Developer",
    location: "India",
    startDate: "2013",
    endDate: "2018",
    description: "Developed enterprise mobile applications for Fortune 500 healthcare clients.",
    highlights: [
      "Recognized as top 5% performer (Job Band A) among 200,000+ employees for consistently exceeding delivery targets on enterprise mobile projects.",
      "Architected Aetna mobile features for claims submission and provider search, reducing claims processing time by 60% for millions of policyholders.",
      "Established CI/CD with Jenkins for enterprise release workflows, cutting release preparation from 3 days to 4 hours."
    ]
  }
]

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  year: string
}

export const education: Education[] = [
  {
    id: "btech",
    degree: "Bachelor of Technology in Information Technology",
    school: "Guru Gobind Singh Indraprastha University",
    location: "New Delhi, India",
    year: "2013"
  },
  {
    id: "nanodegree",
    degree: "Android Nanodegree",
    school: "Google - Udacity",
    location: "Online",
    year: "2016"
  }
]
