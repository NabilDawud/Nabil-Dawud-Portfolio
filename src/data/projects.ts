import { Project } from "./types";

export const projects: Project[] = [
  {
    id: "meshwar",
    slug: "meshwar",
    title: {
      en: "Mishwar",
      ar: "مشوار",
    },
    tagline: {
      en: "Offline-first live transit network & private trip charter platform designed for Gaza's connectivity conditions.",
      ar: "شبكة مواصلات حية تعمل دون اتصال بالإنترنت ومنصة لطلب الرحلات الخاصة مصممة لتحديات الاتصال في غزة.",
    },
    category: "flagship",
    ownership: {
      en: "Independent Build (AI-assisted development)",
      ar: "بناء مستقل (بالاستعانة بأدوات هندسة البرمجيات بالذكاء الاصطناعي)",
    },
    role: {
      en: "Product Engineering & Backend Architecture",
      ar: "هندسة المنتج والأنظمة الخلفية وقواعد البيانات",
    },
    period: {
      en: "2024 — Present",
      ar: "2024 — مستمر",
    },
    featured: true,
    status: "verified-production",
    links: {
      liveDemo: "https://meshwar.apps.taqat.academy",
      github: "https://github.com/NabilDawud/meshwar",
      cicd: "https://github.com/NabilDawud/meshwar/actions/workflows/ci-cd.yml",
    },
    techStack: [
      "Laravel 13",
      "PHP 8.4",
      "FrankenPHP / Caddy",
      "MySQL",
      "SQLite (Testing)",
      "Blade",
      "Tailwind CSS",
      "Alpine.js",
      "MapLibre GL JS",
      "Google OAuth / Socialite",
      "GitHub Actions",
      "Dokku",
    ],
    keyFeatures: {
      en: [
        "Offline-first multi-leg trip planning using client-cached transit route graph data",
        "Live transit corridor and vehicle location tracking with GPS Data Freshness Indicators",
        "Private point-to-point charter trip requests with driver bidding and quote acceptance",
        "Privacy-gated messaging system between riders and verified drivers",
        "Role-specific vehicle classification: private cars, microbuses, and passenger trailers/carts",
        "Automated CI/CD pipeline running SQLite test suites on push and deploying to Dokku",
      ],
      ar: [
        "تخطيط رحلات متعددة المراحل دون إنترنت بالاعتماد على التخزين المؤقت لشبكة المسارات",
        "تتبع حي لمسارات ومركبات النقل مع مؤشرات حداثة بيانات نظام تحديد المواقع (GPS Data Freshness Indicators)",
        "طلب رحلات خاصة مع نظام عروض أسعار تفاعلي ومزايدة فورية للسائقين",
        "نظام مراسلة محمي الخصوصية بين الركاب والسائقين المعتمدين",
        "تصنيف أنواع المركبات: سيارات خاصة، حافلات صغيرة، وعربات نقل ركاب",
        "مسار نشر آلي (CI/CD) ينفذ اختبارات آلية عبر SQLite ويحدث النشر تلقائياً على Dokku",
      ],
    },
    verifiedHighlights: {
      en: [
        "End-to-end product ownership with automated continuous integration and active deployment",
        "Route graph caching algorithm allowing functional trip planning under complete cellular data loss",
        "FrankenPHP application runtime for high-concurrency worker performance",
      ],
      ar: [
        "ملكية وتصميم متكامل للمنتج مع خط نشر آلي واختبارات برمجية مستمرة ونشر فعلي نشط",
        "خوارزمية تخزين مؤقت لشبكة المسارات تمكن الراكب من حساب مسار رحلته حتى عند انقطاع الإنترنت الكامل",
        "بيئة تشغيل FrankenPHP لتوفير أداء متقدم ومعالجة عالية للتزامن",
      ],
    },
    architectureHighlights: {
      en: [
        "Hybrid Cache Architecture: Statically compiled transit route graphs served locally to client storage",
        "Stateful GPS Telemetry: Evaluates spatial staleness thresholds to visually communicate signal reliability",
        "Isolated Test Harness: In-memory SQLite suite replicating MySQL production constraints in GitHub Actions",
      ],
      ar: [
        "معمارية تخزين هجينة: توليد شبكة مسارات النقل كبيانات مدمجة تُحفظ محلياً على جهاز المستخدم",
        "قياس حداثة المواقع: احتساب عمر إحداثيات GPS وإظهار مدى دقة موقع المركبة للمستخدم",
        "بيئة اختبارات معزولة: تشغيل اختبارات شاملة في الذاكرة عبر SQLite تطابق بيئة MySQL الإنتاجية",
      ],
    },
    overview: {
      en: "Mishwar is an offline-resilient transit and private charter platform created to solve the severe communications and mobility breakdown in Gaza. Built with Laravel 13 and FrankenPHP, it allows passengers to plan transit routes even during complete mobile network outages using client-cached route graphs, alongside real-time corridors and point-to-point charter requests when connected.",
      ar: "مشوار هي منصة نقل مقاومة لانقطاع الشبكة تهدف لحل أزمة التنقل والتواصل المعقدة في قطاع غزة. بُنيت المنصة باستخدام Laravel 13 وFrankenPHP لتمكين الركاب من تخطيط مسارات النقل حتى في ظل انقطاع الاتصال الخلوي عبر تخزين شبكة الخطوط محلياً، مع توفير تتبع لحظي وطلب رحلات خاصة عند توفر الشبكة.",
    },
    problem: {
      en: "In low-connectivity and post-conflict environments, mobile networks are frequently disrupted or congested. Traditional ride-hailing and transit apps fail completely when servers cannot be pinged every second, leaving passengers stranded and transit operators unable to coordinate routes or vehicle availability.",
      ar: "في بيئات انقطاع وتذبذب الاتصالات، تعجز تطبيقات النقل التقليدية عن العمل تماماً بمجرد فقدان الاتصال بالخادم، مما يحرم المواطنين من معرفة توفر خطوط النقل أو طلب رحلات خاصة آمنة.",
    },
    solution: {
      en: "An offline-first architecture that pre-compiles transit corridors and node graphs into structured client storage, enabling zero-network multi-leg journey planning. When connectivity is available, the system synchronizes live vehicle positions with GPS Data Freshness Indicators and routes private charter requests through a privacy-gated driver bidding engine.",
      ar: "هندسة معمارية قائمة على التخزين المحلي لشبكة النقل، تتيح احتساب مسارات الرحلات وتكاليفها دون الحاجة لاتصال لحظي بالإنترنت. وعند استعادة الاتصال، تقوم المنصة بمزامنة مواقع المركبات فورياً مع بيان حداثة الإحداثيات وفتح المراسلات المحمية لطلبات النقل الخاص.",
    },
    challenges: {
      en: [
        "Designing deterministic graph search algorithms suitable for execution in lightweight client-side JavaScript",
        "Handling extreme GPS latency without displaying misleading vehicle locations to passengers",
        "Maintaining strict user data privacy between charter requesters and prospective drivers",
      ],
      ar: [
        "بناء خوارزمية بحث مسارات حتمية وخفيفة تعمل بسلاسة على أجهزة الهواتف المحدودة المواصفات",
        "التعامل مع تأخر وصول إحداثيات GPS دون تضليل الراكب ببيانات غير دقيقة",
        "حماية خصوصية بيانات الاتصال بين الركاب والسائقين لحين تأكيد العرض",
      ],
    },
    lessonsLearned: {
      en: [
        "Network resilience must be designed at the data layer, not patched on top of standard REST flows",
        "Visual honesty regarding data freshness (GPS age) builds significantly greater user trust than optimistic approximations",
        "FrankenPHP delivers tangible throughput improvements for PHP applications under concurrent loads",
      ],
      ar: [
        "القدرة على العمل دون اتصال يجب أن تُصمم منذ البداية في بنية البيانات وليس كمجرد طبقة لاحقة",
        "الشفافية في عرض حداثة البيانات (عمر إحداثية GPS) تمنح المستخدم ثقة أعلى بكثير من التوقعات التقريبية",
        "بيئة FrankenPHP توفر تحسيناً ملموساً في زمن الاستجابة وقدرة الخادم على استيعاب الطلبات المتزامنة",
      ],
    },
  },
  {
    id: "masar",
    slug: "masar",
    title: {
      en: "Masar",
      ar: "مسار",
    },
    tagline: {
      en: "ERP Platform for Humanitarian and Development Organizations.",
      ar: "منصة تخطيط موارد المؤسسات (ERP) للمنظمات الإنسانية والتنموية.",
    },
    category: "flagship",
    ownership: {
      en: "Backend Developer within a Project Team",
      ar: "مطور أنظمة خلفية ضمن فريق عمل هندسي",
    },
    role: {
      en: "Backend Architecture & Data Modeling",
      ar: "تطوير الأنظمة الخلفية وتصميم نماذج قواعد البيانات والصلاحيات",
    },
    period: {
      en: "Verified Team Build",
      ar: "مشروع عمل جماعي موثق",
    },
    featured: true,
    status: "verified-demo",
    links: {
      liveDemo: "https://masar-v1.apps.taqat.academy",
      github: undefined, // Pending confirmation
    },
    techStack: [
      "PHP",
      "Laravel",
      "REST APIs",
      "MySQL",
      "Relational Data Modeling",
      "Role-Based Access Control",
    ],
    keyFeatures: {
      en: [
        "Human resources and volunteer lifecycle management",
        "Field operations and on-the-ground activity tracking",
        "Multi-step task delegation and operational workflow automation",
        "Supply chain, inventory tracking, and logistics allocation",
        "Secure document and organizational asset repository",
        "Multi-tier organization management and role-based permissions",
      ],
      ar: [
        "إدارة دورة حياة الكوادر البشرية والمتطوعين في المنظمات",
        "متابعة العمليات الميدانية والأنشطة الإغاثية والتنموية",
        "أتمتة المهام وسير العمل الإداري والتنفيذي",
        "إدارة سلاسل الإمداد والمخزون واللوجستيات الإغاثية",
        "مستودع آمن للمستندات والملفات المشتركة الخاصة بالمؤسسة",
        "إدارة متعددة المستويات للمؤسسات والتحكم في صلاحيات الوصول",
      ],
    },
    verifiedHighlights: {
      en: [
        "Engineered relational database models supporting complex organizational hierarchies",
        "Implemented secure API endpoints and multi-level permission structures for organizational access control",
        "Active live demo available on the Taqat application cluster",
      ],
      ar: [
        "تصميم وبناء نماذج قواعد بيانات علائقية تدعم الهياكل الإدارية المعقدة للمؤسسات",
        "بناء واجهات برمجية آمنة (APIs) مع تطبيق نظام صلاحيات دقيق لإدارة وصول المستخدمين",
        "نسخة استعراض حية ونشطة تعمل على منصة تطبيقات طاقات (Taqat)",
      ],
    },
    architectureHighlights: {
      en: [
        "Relational Schema Normalization: Designed to handle diverse operational entities across logistics, staffing, and field tasks",
        "Scoped Organization Permissions: Ensures cross-organizational data isolation and role boundaries",
      ],
      ar: [
        "هيكلة علائقية معيارية: مصممة لإدارة كيانات تشغيلية متنوعة تشمل اللوجستيات والموظفين والمهام الميدانية",
        "عزل بيانات المؤسسات: ضمان فصل بيانات المنظمات وصلاحيات الأدوار بشكل آمن ودقيق",
      ],
    },
    overview: {
      en: "Masar is an integrated ERP platform tailored specifically for the logistical, human, and operational needs of non-profit and humanitarian development organizations. Nabil contributed as a Backend Developer within a project team, designing relational data schemas, building core REST APIs, and implementing role-based organizational access controls.",
      ar: "مسار هي منصة متكاملة لتخطيط الموارد مصممة خصيصاً لتلبية الاحتياجات التشغيلية واللوجستية للمنظمات الإنسانية والتنموية. شارك نبيل كمطور أنظمة خلفية ضمن فريق المشروع، وركز على تصميم قواعد البيانات وبناء واجهات الـ REST API وتطبيق صلاحيات الوصول الإداري.",
    },
    problem: {
      en: "Humanitarian organizations face fragmented workflows across field volunteer management, supply logistics, and multi-department task coordination, often relying on insecure spreadsheets and disconnected communication channels.",
      ar: "تواجه المنظمات الإنسانية تشتتاً تشغيلياً بين إدارة المتطوعين وسلاسل الإمداد ومتابعة المهام الميدانية، مما يؤدي لضعف التنسيق والاعتماد على جداول بيانات غير مركزية.",
    },
    solution: {
      en: "A unified ERP backend consolidating staff management, logistical tracking, and secure document sharing with organizational access boundaries, enabling coordinated relief and development initiatives.",
      ar: "نظام خلفي موحد يجمع إدارة الموارد البشرية واللوجستيات ومشاركة المستندات مع تطبيق سياسات وصول دقيقة تضمن كفاءة التنسيق وسرعة الاستجابة.",
    },
    challenges: {
      en: [
        "Modeling complex relational dependencies connecting volunteers, field supplies, and task assignments",
        "Maintaining performant query access across nested organization divisions",
      ],
      ar: [
        "نمذجة العلاقات المترابطة بين المتطوعين والمخزون والمهام الميدانية بدقة",
        "الحفاظ على كفاءة الاستعلامات وقواعد البيانات مع تعدد أقسام المؤسسة",
      ],
    },
    lessonsLearned: {
      en: [
        "Clear entity boundary definitions early in system modeling prevent severe migration overhead later",
        "Close collaboration between team members on API contracts streamlines frontend-backend integration",
      ],
      ar: [
        "التحديد الدقيق لحدود الكيانات والعلاقات في بداية النمذجة يوفر جهداً كبيراً في التعديلات اللاحقة",
        "الاتفاق المبكر والموثق على صيغ الـ APIs يعزز تكامل العمل بين مطوري الواجهات والخلفية",
      ],
    },
    disclaimers: {
      en: [
        "GitHub repository link is pending public availability confirmation.",
      ],
      ar: [
        "رابط مستودع GitHub قيد تأكيد الإتاحة العامة.",
      ],
    },
  },
  {
    id: "apartment-marketplace",
    slug: "apartment-marketplace",
    title: {
      en: "Apartment Maintenance Marketplace",
      ar: "سوق صيانة الشقق السكنية",
    },
    tagline: {
      en: "Arabic-first multi-role maintenance platform connecting owners, tenants, technicians, and administrators.",
      ar: "منصة متعددة الأدوار باللغة العربية تربط بين ملاك العقارات والمستأجرين وفنيي الصيانة والإدارة.",
    },
    category: "fullstack",
    ownership: {
      en: "Full Stack Build (AI-assisted workflow)",
      ar: "تطوير شامل (بالاستعانة بأدوات الذكاء الاصطناعي)",
    },
    role: {
      en: "Full Stack Developer",
      ar: "مطور ويب متكامل",
    },
    period: {
      en: "2024",
      ar: "2024",
    },
    featured: true,
    status: "verified-demo",
    links: {
      liveDemo: "https://apartment-maintenance-marketplace.vercel.app/",
      github: "https://github.com/NabilDawud/apartment-maintenance-marketplace",
    },
    techStack: [
      "Next.js 16",
      "Better Auth",
      "Prisma ORM",
      "PostgreSQL",
      "Tailwind CSS",
      "TypeScript",
    ],
    keyFeatures: {
      en: [
        "Arabic-first localized interface with native RTL layout",
        "Multi-role user authentication and session handling using Better Auth",
        "Role-specific views and interaction flows for property owners, tenants, maintenance technicians, and admins",
        "Maintenance ticket lifecycle tracking from request submission to fulfillment",
        "Type-safe database modeling with Prisma ORM and PostgreSQL",
      ],
      ar: [
        "واجهة عربية أصيلة مع دعم كامل وتلقائي لتخطيط الاتجاه من اليمين إلى اليسار (RTL)",
        "مصادقة مستخدمين متعددة الأدوار وإدارة الجلسات باستخدام Better Auth",
        "شاشات وسير عمل مخصص لكل دور: ملاك العقارات، المستأجرون، فنيو الصيانة، والإدارة",
        "تتبع دورة حياة طلبات الصيانة من مرحلة الإنشاء وحتى الإنجاز",
        "نمذجة قواعد بيانات آمنة الأنواع باستخدام Prisma ORM وPostgreSQL",
      ],
    },
    verifiedHighlights: {
      en: [
        "Production deployment running live on Vercel with a publicly accessible GitHub repository",
        "Native bilingual and Arabic-first user experience designed for regional property maintenance workflows",
        "Multi-role application architecture with role-specific views",
      ],
      ar: [
        "تطبيق منشور ويعمل مباشرة على Vercel مع مستودع برمجي عام ومتاح على GitHub",
        "تجربة مستخدم عربية أصيلة مصممة خصيصاً لبيئة إدارة وصيانة العقارات في المنطقة",
        "معمارية متعددة الأدوار تقدم شاشات مخصصة لكل فئة من المستخدمين",
      ],
    },
    architectureHighlights: {
      en: [
        "Next.js App Router Architecture: Server Components handling database reads alongside client boundary forms",
        "Authentication via Better Auth: Secure credential management and session tokens across diverse user roles",
      ],
      ar: [
        "معمارية Next.js App Router: استعلامات خادم مباشرة لقاعدة البيانات مع مكونات عميل تفاعلية للنماذج",
        "مصادقة Better Auth: إدارة جلسات وبيانات تسجيل دخول آمنة لمختلف أدوار المنصة",
      ],
    },
    overview: {
      en: "An Arabic-first multi-role web platform designed to streamline apartment and property maintenance requests. Built with Next.js 16, Prisma, Better Auth, and PostgreSQL, it provides dedicated workflows for tenants reporting issues, property owners reviewing quotes, technicians accepting jobs, and system administrators overseeing resolution.",
      ar: "منصة ويب متعددة الأدوار مصممة باللغة العربية لتسهيل طلبات صيانة الشقق والعقارات السكنية. بُنيت باستخدام Next.js 16 وPrisma وBetter Auth وPostgreSQL، وتوفر شاشات مخصصة لكل من المستأجرين، الملاك، فنيي الصيانة، ومديري النظام.",
    },
    problem: {
      en: "Property maintenance in the region typically relies on manual phone calls, leading to untracked repairs, delayed responses, and lack of accountability between tenants, property managers, and independent technicians.",
      ar: "تعتمد صيانة العقارات عادةً على الاتصالات الهاتفية غير الموثقة، مما يتسبب في تأخر معالجة الأعطال وغياب المتابعة الواضحة بين المستأجرين وملاك العقارات والفنيين.",
    },
    solution: {
      en: "A structured digital marketplace where maintenance requests are logged, assigned, and tracked through transparent status stages with role-based access for all involved parties.",
      ar: "سوق رقمي منظم يتيح تسجيل طلبات الصيانة ومتابعة حالتها بشفافية مع توفير تجربة مخصصة لكل مستخدم حسب دوره في العملية.",
    },
    challenges: {
      en: [
        "Designing intuitive Arabic RTL layouts that feel native across all viewport dimensions",
        "Structuring multi-role session boundaries without overcomplicating data access patterns",
      ],
      ar: [
        "تصميم واجهات عربية تدعم RTL بسلاسة تامة على الهواتف والشاشات الكبيرة",
        "ضبط صلاحيات الأدوار المختلفة دون تعقيد غير مبرر في نماذج البيانات",
      ],
    },
    lessonsLearned: {
      en: [
        "Prisma schema typing significantly reduces runtime contract bugs in full-stack applications",
        "Designing Arabic-first avoids the costly CSS restructuring often required when retrofitting RTL support",
      ],
      ar: [
        "أمان الأنواع الذي يوفره Prisma يقلل بشكل ملموس من أخطاء البيانات غير المتوقعة",
        "التصميم بالعربية منذ البداية يوفر وقتاً كبيراً مقارنة بمحاولة إضافة دعم RTL لاحقاً",
      ],
    },
    disclaimers: {
      en: [
        "Exact granular personal contributions and AI-assisted workflow details are being refined for complete technical fidelity.",
      ],
      ar: [
        "يجري تدقيق التفاصيل الدقيقة للمساهمات الفردية لضمان أقصى درجات الدقة الهندسية.",
      ],
    },
  },
  {
    id: "orbit",
    slug: "orbit",
    title: {
      en: "Orbit",
      ar: "أوربت",
    },
    tagline: {
      en: "Cross-platform productivity platform for tasks, habits, focus sessions, and AI milestone suggestions.",
      ar: "منصة إنتاجية لإدارة المهام والعادات وجلسات التركيز والتخطيط الذكي لمراحل الأهداف.",
    },
    category: "backend-api",
    ownership: {
      en: "Backend Developer within a Project Team",
      ar: "مطور أنظمة خلفية ضمن فريق عمل هندسي",
    },
    role: {
      en: "Backend Developer — APIs, Database & Authentication",
      ar: "مطور أنظمة خلفية — واجهات برمجية، قواعد بيانات، ومصادقة JWT",
    },
    period: {
      en: "Team Build",
      ar: "مشروع عمل جماعي",
    },
    featured: false,
    status: "verified-code",
    links: {
      liveDemo: undefined, // Not currently available
      github: undefined, // To be confirmed
    },
    techStack: [
      "PHP",
      "Laravel",
      "REST APIs",
      "Relational Database Design",
      "JWT Authentication",
      "Task & Habit Management",
      "AI Goal Milestones",
    ],
    keyFeatures: {
      en: [
        "Stateless JWT authentication for secure cross-platform client access",
        "Structured RESTful API endpoints for tasks, habits, and recurring daily workflows",
        "Focus session tracking engine with time-series logging",
        "Goal management with AI-powered milestone breakdown suggestions",
        "Relational database design tailored for low-latency activity analytics",
      ],
      ar: [
        "مصادقة لاحالة (Stateless JWT) لتأمين وصول تطبيقات المنصات المختلفة",
        "واجهات REST API مهيكلة لإدارة المهام والعادات وسير العمل اليومي",
        "محرك لتسجيل ومتابعة جلسات التركيز والإنتاجية الزمنية",
        "إدارة الأهداف الكبرى مع اقتراح مراحل فرعية ذكية بالاعتماد على الذكاء الاصطناعي",
        "تصميم قواعد بيانات علائقية مهيأة للاستعلامات السريعة وتحليل الأنشطة",
      ],
    },
    verifiedHighlights: {
      en: [
        "Developed core backend APIs in Laravel implementing JWT authentication for stateless cross-platform access",
        "Engineered the database schema supporting habit tracking and focus sessions",
        "Integrated backend services to deliver AI-generated goal milestone suggestions",
      ],
      ar: [
        "تطوير الواجهات الخلفية (APIs) في Laravel باستخدام مصادقة JWT للمنصات المتعددة",
        "تصميم وتطبيق مخطط قاعدة البيانات لدعم تتبع العادات وجلسات التركيز بدقة",
        "ربط الخدمات الخلفية لتزويد المستخدم باقتراحات مراحل الأهداف بالذكاء الاصطناعي",
      ],
    },
    architectureHighlights: {
      en: [
        "Stateless Token Security: JWT token generation, refresh strategies, and request validation middleware",
        "Time-Series Focus Tracking: Normalized schemas capturing focus intervals and habit streaks",
      ],
      ar: [
        "أمان التوكنات: توليد وتجديد توكنات JWT مع وسيط برمجي (Middleware) للتحقق من الطلبات",
        "تتبع الإنتاجية: جداول علائقية لتسجيل فترات التركيز واستمرارية العادات اليومية",
      ],
    },
    overview: {
      en: "Orbit is a cross-platform productivity and personal development ecosystem. Nabil served as Backend Developer within the team, building Laravel REST APIs, implementing JWT authentication, modeling database schemas for habit tracking and focus sessions, and connecting AI milestone suggestion endpoints.",
      ar: "أوربت هو نظام بيئي للإنتاجية والتطوير الشخصي. عمل نبيل كمطور للأنظمة الخلفية ضمن الفريق، حيث بنى واجهات الـ REST API في Laravel، وطبق مصادقة الـ JWT، وصمم قواعد البيانات الخاصة بالعادات وجلسات التركيز، وتكامل مع خدمات الاقتراحات الذكية للأهداف.",
    },
    problem: {
      en: "Productivity tracking often separates habits, daily tasks, and long-term goals into disparate apps, making it difficult for users to connect daily micro-actions to overarching achievements.",
      ar: "غالباً ما تنفصل تطبيقات تتبع العادات عن المهام اليومية والأهداف الكبرى، مما يصعب على المستخدم ربط جهده اليومي بأهدافه الأساسية.",
    },
    solution: {
      en: "A unified backend API providing synchronized endpoints for habit consistency, time-blocked focus intervals, and AI-assisted goal breakdowns for client applications.",
      ar: "واجهات برمجية موحدة تتيح مزامنة متكاملة بين العادات، فترات التركيز، وتقسيم الأهداف الذكية لتطبيقات المستخدمين.",
    },
    challenges: {
      en: [
        "Designing performant queries to calculate habit streaks across multiple time zones",
        "Structuring AI prompt contracts to return consistent, schema-validated milestone arrays",
      ],
      ar: [
        "بناء استعلامات فعالة لحساب استمرارية العادات (Streaks) مع اختلاف المناطق الزمنية",
        "ضبط صياغة مخرجات الذكاء الاصطناعي لضمان عودة مصفوفات مهيكلة ومطابقة للمخطط",
      ],
    },
    lessonsLearned: {
      en: [
        "Stateless JWT architectures simplify cross-platform mobile client integration",
        "Validating AI responses with strict server-side schemas prevents malformed payloads from breaking client views",
      ],
      ar: [
        "استخدام مصادقة JWT غير المقيدة بالحالة يسهل كثيراً ربط تطبيقات الهواتف الذكية",
        "التحقق الصارم من مخرجات الذكاء الاصطناعي على الخادم يمنع وصول بيانات غير متوقعة للواجهات",
      ],
    },
    disclaimers: {
      en: [
        "Live demo is currently not available; GitHub repository visibility is to be confirmed.",
      ],
      ar: [
        "العرض الحي غير متاح حالياً؛ وحالة إتاحة مستودع GitHub قيد التأكيد.",
      ],
    },
  },
  {
    id: "university-issues",
    slug: "university-issues",
    title: {
      en: "University Issues Management",
      ar: "نظام إدارة قضايا ومشكلات الطلبة الجامعيين",
    },
    tagline: {
      en: "System designed to help academic institutions organize, track, and resolve student issues and grievances.",
      ar: "نظام مخصص لمساعدة المؤسسات الجامعية على تنظيم ومتابعة وحل قضايا وشكاوى الطلاب.",
    },
    category: "academic",
    ownership: {
      en: "System Developer",
      ar: "مطور النظام",
    },
    role: {
      en: "System Developer",
      ar: "مطور النظام",
    },
    featured: false,
    status: "provisional",
    links: {
      liveDemo: undefined, // Not available
      github: "https://github.com/NabilDawud/University-Issues",
    },
    techStack: [
      "PHP",
      "Web Architecture",
      "Relational Database",
      "Issue Tracking Workflow",
    ],
    keyFeatures: {
      en: [
        "Student grievance submission and categorization",
        "Administrative triage and issue assignment workflow",
        "Status tracking for submitted academic and administrative concerns",
      ],
      ar: [
        "تقديم وتصنيف قضايا وشكاوى الطلاب إلكترونياً",
        "سير عمل إداري لفرز المشكلات وتوجيهها للجهات المعنية بالجامعة",
        "متابعة حالة القضايا من التقديم حتى المعالجة النهائية",
      ],
    },
    verifiedHighlights: {
      en: [
        "Publicly accessible GitHub repository demonstrating academic administrative workflow systems",
      ],
      ar: [
        "مستودع برمجي متاح على GitHub يوضح نظام سير العمل الإداري والأكاديمي",
      ],
    },
    architectureHighlights: {
      en: [
        "Issue Lifecycle State Machine: Directs student complaints through formal review stages",
      ],
      ar: [
        "مخطط دورة حياة القضايا: توجيه الشكاوى عبر مراحل مراجعة إدارية وأكاديمية محددة",
      ],
    },
    overview: {
      en: "A workflow and issue management system developed to help universities record, categorize, and address student problems and administrative concerns systematically.",
      ar: "نظام لإدارة ومتابعة قضايا الطلاب مصمم لمساعدة المؤسسات الجامعية على توثيق وفرز ومعالجة الشكاوى الأكاديمية والإدارية بصورة منظمة.",
    },
    problem: {
      en: "Universities frequently handle student grievances through informal, paper-based, or fragmented channels, making it difficult to maintain accountability and track resolution times.",
      ar: "غالباً ما تتعامل المؤسسات التعليمية مع مشكلات الطلاب بطرق ورقية أو غير مركزية، مما يصعب توثيق الشكاوى أو معرفة أوقات الاستجابة والحل.",
    },
    solution: {
      en: "A structured digital issue tracker allowing students to log concerns and administrators to monitor resolution status through defined stages.",
      ar: "نظام رقمي منظم يمكن الطلاب من تسجيل مشكلاتهم ويسمح للإدارة بمتابعة خطوات المعالجة والحل بوضوح.",
    },
    challenges: {
      en: [
        "Modeling appropriate status states for academic grievance handling",
      ],
      ar: [
        "تحديد وتنسيق مراحل دورة حياة الشكاوى بما يناسب الإجراءات الجامعية",
      ],
    },
    lessonsLearned: {
      en: [
        "Clear status definitions are the most critical component of dispute resolution software",
      ],
      ar: [
        "وضوح حالات ومراحل المتابعة هو العنصر الأهم في نجاح أنظمة معالجة الطلبات والشكاوى",
      ],
    },
    disclaimers: {
      en: [
        "Project scope and detailed technical feature list are provisional and subject to refinement upon source code review.",
      ],
      ar: [
        "نطاق المشروع وتفاصيله الفنية تعتبر أولية وقيد التدقيق الإضافي بعد مراجعة شفرة المصدر.",
      ],
    },
  },
];
