import { JourneyEntry } from "./types";

export const journeyEntries: JourneyEntry[] = [
  {
    id: "masar-backend",
    type: "experience",
    title: {
      en: "Backend Developer — Masar ERP Platform",
      ar: "مطور أنظمة خلفية — منصة مسار (ERP)",
    },
    organization: {
      en: "Engineering Project Team / Taqat",
      ar: "فريق العمل الهندسي / منصة طاقات",
    },
    period: {
      en: "Verified Project Experience",
      ar: "خبرة عملية موثقة في مشروع جماعي",
    },
    location: {
      en: "Gaza, Palestine",
      ar: "غزة، فلسطين",
    },
    role: {
      en: "Backend Developer",
      ar: "مطور أنظمة خلفية",
    },
    description: {
      en: "Collaborated within a cross-functional engineering team to build an ERP platform for humanitarian and development organizations, focusing on relational data schemas, REST APIs, and organization access control.",
      ar: "المشاركة ضمن فريق هندسي متكامل لتطوير منصة تخطيط موارد المنظمات الإنسانية والتنموية، مع التركيز على نمذجة قواعد البيانات، بناء الـ APIs، وتطبيق سياسات الوصول الإداري.",
    },
    highlights: {
      en: [
        "Structured normalized relational schemas for volunteers, field logistics, and operational tasks",
        "Implemented organization-level access permissions ensuring data isolation between relief divisions",
        "Collaborated with frontend developers on API contracts and payload specifications",
      ],
      ar: [
        "هيكلة قواعد بيانات علائقية معيارية لإدارة المتطوعين، اللوجستيات الميدانية، والمهام التنفيذية",
        "تطبيق صلاحيات وصول على مستوى المؤسسات لضمان عزل البيانات بين الأقسام الإغاثية",
        "التنسيق المستمر مع مطوري الواجهات لتوثيق وتوحيد صيغ تبادل البيانات للواجهات البرمجية",
      ],
    },
    verified: true,
  },
  {
    id: "orbit-backend",
    type: "experience",
    title: {
      en: "Backend Developer — Orbit Productivity",
      ar: "مطور أنظمة خلفية — منصة أوربت الإنتاجية",
    },
    organization: {
      en: "Engineering Project Team",
      ar: "فريق هندسي تقني",
    },
    period: {
      en: "Team Build",
      ar: "مشروع عمل جماعي",
    },
    location: {
      en: "Gaza, Palestine",
      ar: "غزة، فلسطين",
    },
    role: {
      en: "Backend Developer",
      ar: "مطور أنظمة خلفية",
    },
    description: {
      en: "Engineered stateless REST APIs in Laravel for habit tracking, focus sessions, and AI goal milestone recommendations within a collaborative team environment.",
      ar: "تطوير واجهات REST API لاحالة (Stateless) في Laravel لتتبع العادات وجلسات التركيز ومراحل الأهداف الذكية ضمن بيئة فريق عمل مشترك.",
    },
    highlights: {
      en: [
        "Implemented JWT authentication middleware for stateless multi-client access",
        "Engineered relational database models for time-series focus interval logging",
        "Built backend integration endpoints for AI-driven milestone decomposition",
      ],
      ar: [
        "تطبيق وسيط برمجي لمصادقة JWT لضمان أمان الاتصال عبر مختلف تطبيقات المستخدم",
        "تصميم نماذج قواعد بيانات علائقية لتسجيل فترات التركيز واستمرارية العادات",
        "ربط الواجهات الخلفية مع خدمات الذكاء الاصطناعي لتوليد مراحل الأهداف التفصيلية",
      ],
    },
    verified: true,
  },
  {
    id: "netloopers-program",
    type: "program",
    title: {
      en: "Modern Software Engineering with AI",
      ar: "هندسة البرمجيات الحديثة المعززة بالذكاء الاصطناعي",
    },
    organization: {
      en: "NetLoopers",
      ar: "برنامج NetLoopers التدريبي",
    },
    period: {
      en: "Professional Development Program",
      ar: "برنامج تدريب وتطوير مهني متخصص",
    },
    location: {
      en: "Remote",
      ar: "عن بُعد",
    },
    description: {
      en: "Intensive engineering development focusing on leveraging AI agents, CLI tooling, and modern automated workflows while maintaining rigorous software quality and testing standards.",
      ar: "برنامج هندسي مكثف ركز على توظيف وكلاء الذكاء الاصطناعي، أدوات الطرفية، ومسارات العمل المؤتمتة مع الالتزام الصارم بمعايير جودة واختبار البرمجيات.",
    },
    highlights: {
      en: [
        "Applied test-driven thinking and architectural planning using modern developer tools",
        "Practiced rapid prototyping combined with strict code verification and refactoring",
      ],
      ar: [
        "تطبيق التخطيط المعماري والتفكير القائم على الاختبارات باستخدام أحدث أدوات المطورين",
        "الموازنة بين سرعة بناء النماذج والتدقيق البرمجي وإعادة الهيكلة المنظمة",
      ],
    },
    verified: true,
  },
  {
    id: "web-dev-diploma-journey",
    type: "program",
    title: {
      en: "Web Development Training Diploma (230 Hours)",
      ar: "دبلوم التدريب في تطوير تطبيقات الويب (230 ساعة)",
    },
    organization: {
      en: "Ministry of Education & Higher Education / Al-Hims Center",
      ar: "وزارة التربية والتعليم العالي / مركز الحمص للتدريب",
    },
    period: {
      en: "05 March 2023 – 17 June 2026",
      ar: "05 مارس 2023 – 17 يونيو 2026",
    },
    location: {
      en: "Gaza, Palestine",
      ar: "غزة، فلسطين",
    },
    description: {
      en: "Comprehensive 230-hour accredited technical training covering full-stack web technologies, relational databases, PHP, and modern web application development, completed with an Excellent grade.",
      ar: "تدريب فني معتمد بواقع 230 ساعة تدريبية غطى تقنيات الويب الشاملة، قواعد البيانات العلائقية، لغة PHP، وتطوير التطبيقات الحديثة، وأُنجز بتقدير ممتاز.",
    },
    highlights: {
      en: [
        "Extensive practical coursework in backend programming, relational schemas, and responsive web design",
        "Awarded Excellent grade by the Palestinian Ministry of Education and Higher Education",
      ],
      ar: [
        "تدريب عملي مكثف على برمجة الأنظمة الخلفية، تصميم قواعد البيانات، وتطوير الواجهات التفاعلية",
        "الحصول على تقدير ممتاز معتمد من وزارة التربية والتعليم العالي الفلسطينية",
      ],
    },
    verified: true,
  },
  {
    id: "al-azhar-degree",
    type: "education",
    title: {
      en: "B.Sc. in Computer Systems Engineering",
      ar: "بكالوريوس هندسة أنظمة الحاسوب",
    },
    organization: {
      en: "Al-Azhar University — College of Engineering and Information Technology",
      ar: "جامعة الأزهر — كلية الهندسة وتكنولوجيا المعلومات",
    },
    period: {
      en: "Graduation Grade: Excellent (91.44%)",
      ar: "تقدير التخرج: ممتاز (91.44%)",
    },
    location: {
      en: "Gaza, Palestine",
      ar: "غزة، فلسطين",
    },
    description: {
      en: "Comprehensive 5-year engineering curriculum covering computer architecture, operating systems, algorithm design, database theory, data communications, and software engineering principles.",
      ar: "منهاج هندسي متعمق شمل معمارية الحواسيب، نظم التشغيل، تحليل الخوارزميات، نظريات قواعد البيانات، شبكات الاتصال، ومبادئ هندسة البرمجيات المتقدمة.",
    },
    highlights: {
      en: [
        "Graduated with distinction: 91.44% (Excellent)",
        "Deep theoretical and practical foundation in systems architecture and computational performance",
      ],
      ar: [
        "التخرج بمرتبة الشرف والامتياز بنسبة 91.44%",
        "تأسيس نظري وعملي عميق في معمارية الأنظمة الحاسوبية وكفاءة المعالجة",
      ],
    },
    verified: true,
  },
];
