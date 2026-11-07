import { Localized } from "./types";

export interface PersonalBrand {
  name: Localized;
  title: Localized;
  location: Localized;
  availability: Localized;
  headline: {
    lead: Localized;
    accent: Localized;
  };
  supportingStatement: Localized;
  bioPreview: Localized;
  socials: {
    github: string;
    linkedin: string;
  };
}

export interface CVConfig {
  isAvailable: boolean;
  statusMessage: Localized;
}

export const cvConfig: CVConfig = {
  isAvailable: false,
  statusMessage: {
    en: "CV available upon request",
    ar: "السيرة الذاتية متاحة عند الطلب",
  },
};

export const personalBrand: PersonalBrand = {
  name: {
    en: "Nabil Dawud",
    ar: "نبيل داود",
  },
  title: {
    en: "Software Engineer — Backend / Full Stack",
    ar: "مهندس برمجيات — أنظمة خلفية وتطوير شامل",
  },
  location: {
    en: "Gaza, Palestine",
    ar: "غزة، فلسطين",
  },
  availability: {
    en: "Open to Work & Collaboration",
    ar: "متاح للعمل والتعاون المهني",
  },
  headline: {
    lead: {
      en: "Thoughtful Engineering.",
      ar: "هندسة رصينة.",
    },
    accent: {
      en: "Powerful Backends.",
      ar: "أنظمة خلفية قوية.",
    },
  },
  supportingStatement: {
    en: "Software Engineer focused on Laravel, APIs, and scalable systems.",
    ar: "مهندس برمجيات متخصص في Laravel، والواجهات البرمجية (APIs)، والأنظمة القابلة للتوسع.",
  },
  bioPreview: {
    en: "Computer Systems Engineering graduate from Al-Azhar University building resilient systems, high-throughput APIs, and offline-first architectures.",
    ar: "خريج هندسة أنظمة الحاسوب من جامعة الأزهر، متخصص في بناء الأنظمة المقاومة لانقطاع الشبكات، وتطوير الـ APIs عالية الكفاءة، والمعماريات البرمجية القابلة للتوسع.",
  },
  socials: {
    github: "https://github.com/NabilDawud",
    linkedin: "https://linkedin.com/in/nabil-dawud",
  },
};
