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
      "Led development of advanced Android and React Native SDKs, integrating financial products seamlessly into client applications",
      "Implemented proof of concepts to validate feasibility of new features, accelerating product innovation",
      "Optimized application performance through strategic code refactoring, improving maintainability and scalability"
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
      "Led a global team of 10 mobile engineers, establishing standards for technical excellence and ownership",
      "Spearheaded test automation strategies including unit and UI testing, significantly improving application robustness",
      "Managed CI/CD pipelines with Jenkins and Fastlane, reducing deployment time by 40%"
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
      "Headed a team of engineering managers focused on delivering high-impact trading features",
      "Led implementation of engineering best practices, driving continuous efficiency improvements",
      "Owned critical product lines, demonstrating strategic achievement through measurable business impact"
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
      "Defined architecture and design emphasizing scalability and maintainability for rapid growth",
      "Spearheaded module-based programming to scale the app while minimizing memory leaks",
      "Implemented automated testing strategies with JUnit and Espresso for comprehensive code validation"
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
      "Recognized as top 5% performer (Job Band A) among 200,000+ employees for outstanding contributions",
      "Architected Aetna Insurance mobile applications, delivering scalable and maintainable solutions",
      "Established CI/CD pipelines using Jenkins, streamlining development and release processes"
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
