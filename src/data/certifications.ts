import { Certification } from "./types";

export const certifications: Certification[] = [
  {
    id: "web-dev-diploma",
    title: {
      en: "Web Development Training Diploma",
      ar: "دبلوم التدريب في تطوير تطبيقات الويب",
    },
    issuer: {
      en: "Palestinian Ministry of Education and Higher Education",
      ar: "وزارة التربية والتعليم العالي الفلسطينية",
    },
    trainingCenter: {
      en: "Al-Hims Training Center",
      ar: "مركز الحمص للتدريب",
    },
    hours: 230,
    grade: {
      en: "Excellent",
      ar: "ممتاز",
    },
    dateRange: {
      en: "05 March 2023 – 17 June 2026",
      ar: "05 مارس 2023 – 17 يونيو 2026",
    },
    imagePlaceholder: "/assets/certificates/web-dev-diploma.webp",
    verified: true,
  },
  {
    id: "bbd-backend-training",
    title: {
      en: "Professional Training in Back-End Development",
      ar: "تدريب مهني متخصص في تطوير الأنظمة الخلفية",
    },
    issuer: {
      en: "BBD Select / BBD Agency",
      ar: "وكالة BBD Select / BBD Agency",
    },
    dateRange: {
      en: "15 July 2026",
      ar: "15 يوليو 2026",
    },
    imagePlaceholder: "/assets/certificates/bbd-backend.webp",
    verified: true,
  },
];
