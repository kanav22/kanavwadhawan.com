export interface Experience {
  id: string
  company: string
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
    role: "Senior Mobile Engineer",
    location: "United Kingdom",
    startDate: "2024",
    endDate: "Present",
    description: "Leading development of financial technology SDKs for mobile platforms.",
    highlights: [
      "Built Android and React Native SDKs that reduced client integration time from weeks to days, enabling faster go-to-market for fintech startups",
      "Delivered proof-of-concept implementations that validated 3 new product features, accelerating roadmap decisions",
      "Refactored core SDK architecture to improve maintainability, reducing bug resolution time by 50%"
    ]
  },
  {
    id: "paytm",
    company: "Paytm",
    role: "Mobile Engineering Manager",
    location: "United Kingdom",
    startDate: "2021",
    endDate: "2024",
    description: "Managed a global team building mobile payment solutions.",
    highlights: [
      "Led 10 mobile engineers across time zones, establishing code review standards that reduced production bugs by 35%",
      "Implemented test automation strategy (unit + UI tests) that increased code coverage from 40% to 85%, improving app stability",
      "Built CI/CD pipelines with Jenkins and Fastlane that cut deployment time by 40%, enabling weekly releases"
    ]
  },
  {
    id: "angelone",
    company: "Angel One",
    role: "Senior Mobile Engineering Manager",
    location: "India",
    startDate: "2020",
    endDate: "2021",
    description: "Led engineering teams for India's leading stock trading platform.",
    highlights: [
      "Managed team of engineering managers overseeing 25+ engineers, delivering trading features used by millions of investors",
      "Drove engineering best practices adoption that reduced average bug fix time from 5 days to 2 days",
      "Owned P&L-critical product lines, maintaining zero trading outages during market hours"
    ]
  },
  {
    id: "indmoney",
    company: "INDmoney",
    role: "Lead Android Developer",
    location: "India",
    startDate: "2019",
    endDate: "2020",
    description: "Architected and scaled the Android application for personal finance management.",
    highlights: [
      "Designed scalable module-based architecture that supported 10x user growth without performance degradation",
      "Implemented memory optimization techniques that reduced app crash rate from 2% to under 0.1%",
      "Built automated testing framework with JUnit and Espresso, achieving 80% code coverage"
    ]
  },
  {
    id: "infosys",
    company: "Infosys",
    role: "Senior Android Developer",
    location: "India",
    startDate: "2013",
    endDate: "2018",
    description: "Developed enterprise mobile applications for Fortune 500 healthcare clients.",
    highlights: [
      "Recognized as top 5% performer (Job Band A) among 200,000+ employees for consistently exceeding delivery targets",
      "Architected Aetna Insurance mobile app features that reduced claims processing time by 60% for millions of users",
      "Established CI/CD pipeline using Jenkins that reduced release preparation time from 3 days to 4 hours"
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
