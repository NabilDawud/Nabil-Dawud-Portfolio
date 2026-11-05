export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

export interface Localized<T = string> {
  en: T;
  ar: T;
}

export type ProjectCategory =
  | "flagship"
  | "backend-api"
  | "fullstack"
  | "academic";

export type ProjectVerificationStatus =
  | "verified-production"
  | "verified-demo"
  | "verified-code"
  | "pending-verification"
  | "provisional";

export interface ProjectLinks {
  liveDemo?: string;
  github?: string;
  cicd?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: Localized;
  tagline: Localized;
  category: ProjectCategory;
  ownership: Localized;
  role: Localized;
  period?: Localized;
  featured: boolean;
  status: ProjectVerificationStatus;
  links: ProjectLinks;
  techStack: string[];
  keyFeatures: Localized<string[]>;
  verifiedHighlights: Localized<string[]>;
  architectureHighlights: Localized<string[]>;
  overview: Localized;
  problem: Localized;
  solution: Localized;
  challenges: Localized<string[]>;
  lessonsLearned: Localized<string[]>;
  disclaimers?: Localized<string[]>;
}

export type SkillLevel = "core" | "familiar" | "workflow";

export interface SkillItem {
  name: string;
  level: SkillLevel;
  verifiedInProjects?: string[]; // IDs of projects referencing this competency
}

export interface SkillGroup {
  id: string;
  title: Localized;
  description: Localized;
  skills: SkillItem[];
}

export type JourneyType = "experience" | "program" | "education";

export interface JourneyEntry {
  id: string;
  type: JourneyType;
  title: Localized;
  organization: Localized;
  period: Localized;
  location: Localized;
  role?: Localized;
  description: Localized;
  highlights: Localized<string[]>;
  verified: boolean;
  disclaimer?: Localized;
}

export interface TawjihiHighlight {
  title: Localized;
  score: number;
  displayScore: Localized;
  context: Localized;
}

export interface EducationEntry {
  degree: Localized;
  institution: Localized;
  faculty: Localized;
  grade: Localized;
  percentage: number;
  location: Localized;
  period: Localized;
  tawjihiHighlight?: TawjihiHighlight;
}

export interface Certification {
  id: string;
  title: Localized;
  issuer: Localized;
  trainingCenter?: Localized;
  hours?: number;
  grade?: Localized;
  dateRange: Localized;
  imagePlaceholder: string;
  verified: boolean;
}

export interface AIWorkflowTool {
  name: string;
  category: Localized;
  description: Localized;
  tasks: Localized<string[]>;
}
