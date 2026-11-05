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
      en: "Offline-first transit network & private trip charter platform designed for Gaza's connectivity conditions.",
      ar: "شبكة مواصلات حية تعمل دون اتصال بالإنترنت ومنصة لطلب الرحلات الخاصة مصممة لتحديات الاتصال في غزة.",
    },
    category: "flagship",
    ownership: {
      en: "Independent Build (AI-assisted engineering workflow)",
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
        "Offline-first multi-leg trip planning using client-cached transit route graph data without requiring active internet connectivity once cached",
        "Live transit corridor and active vehicle tracking displaying last-known GPS coordinates with human-readable GPS Data Freshness Indicators (e.g. 'Last location: Kuwait Roundabout, 3 mins ago')",
        "Live connectivity boundary: real-time corridor tracking, driver quote bidding, and messaging synchronize when cellular connection is available",
        "Private point-to-point charter trip requests with driver bidding and quote acceptance",
        "Privacy-gated messaging system between riders and verified drivers",
        "Role-specific vehicle classification: private cars, microbuses, and passenger trailers/carts ('Ajala)",
        "Automated CI/CD pipeline running SQLite test suites on push and deploying to Dokku",
      ],
      ar: [
        "تخطيط رحلات متعددة المراحل دون إنترنت بالاعتماد على التخزين المؤقت لشبكة المسارات دون الحاجة لاتصال بالشبكة بعد الحفظ الأولي",
        "تتبع حي لمسارات ومركبات النقل مع عرض إحداثيات GPS الأخيرة ومؤشرات حداثة بيانات مقروءة (GPS Data Freshness Indicators مثل: 'آخر موقع: دوار الكويت، منذ 3 دقائق')",
        "حدود الاتصال الحي: تتبع المركبات اللحظي، عروض أسعار الرحلات الخاصة، والمراسلة تعمل عند توفر الاتصال الخلوي",
        "طلب رحلات خاصة مع نظام عروض أسعار تفاعلي ومزايدة فورية للسائقين",
        "نظام مراسلة محمي الخصوصية بين الركاب والسائقين المعتمدين",
        "تصنيف أنواع المركبات: سيارات خاصة، حافلات صغيرة، وعربات نقل ركاب (عجلة)",
        "مسار نشر آلي (CI/CD) ينفذ اختبارات آلية عبر SQLite ويحدث النشر تلقائياً على Dokku",
      ],
    },
    verifiedHighlights: {
      en: [
        "End-to-end product engineering with automated continuous integration and active deployment",
        "Client-side route graph search algorithm enabling functional multi-leg itinerary planning under complete cellular data loss",
        "Visual honesty in telemetry: explicit elapsed-age indicators on last-known positions rather than speculative algorithmic arrival estimates",
        "Deployment & testing infrastructure: FrankenPHP / Caddy application server on PHP 8.4, automated SQLite CI test suite on GitHub Actions, and Dokku deployment",
      ],
      ar: [
        "ملكية وهندسة متكاملة للمنتج مع خط نشر آلي واختبارات برمجية مستمرة ونشر فعلي نشط",
        "خوارزمية بحث مسارات محلية تمكن الراكب من حساب مسار رحلته حتى عند انقطاع الإنترنت الكامل",
        "الشفافية في بيانات التتبع: إظهار عمر الإحداثية المنقضي بدقة بدلاً من التوقعات التقريبية المضللة",
        "بيئة التشغيل والاختبار والنشر: خادم FrankenPHP / Caddy على PHP 8.4، واختبارات SQLite في GitHub Actions، ونشر آلي عبر Dokku",
      ],
    },
    architectureHighlights: {
      en: [
        "Offline Route Planning: In-memory route graph of Gaza transit corridors (Salah al-Din, Coastal Road) cached locally on client devices for zero-network itinerary searches",
        "Live Location Data Flow: Synchronizes active vehicle coordinates when connected, paired with explicit elapsed-age indicators and route drift detection",
        "Deployment & Testing Infrastructure: FrankenPHP application runner with worker mode, automated SQLite testing harness for CI, and continuous Dokku deployment",
      ],
      ar: [
        "تخطيط المسارات دون إنترنت: شبكة مسارات مدمجة لمحاور قطاع غزة (صلاح الدين، الرشيد) تُحفظ محلياً على جهاز المستخدم للبحث دون اتصال",
        "تدفق بيانات الموقع الحي: مزامنة إحداثيات المركبات عند توفر الاتصال، مع بيان عمر الإحداثية المنقضي والتنبيه عند الخروج عن المسار",
        "بيئة التشغيل والاختبار والنشر: بيئة FrankenPHP بوضع العمال، واختبارات SQLite معزولة للـ CI، ونشر آلي على منصة Dokku",
      ],
    },
    overview: {
      en: "Mishwar is an offline-resilient transit and private charter platform designed to address the severe communication and mobility disruptions in the Gaza Strip. Built with Laravel 13, PHP 8.4, and FrankenPHP, it allows passengers to plan multi-leg transit routes even during complete mobile network outages using client-cached route graphs, while providing real-time corridor tracking, private charter bidding, and privacy-gated messaging whenever network connectivity is restored.",
      ar: "مشوار هي منصة نقل مقاومة لانقطاع الشبكة صُممت لمواجهة أزمة التنقل والتواصل المعقدة في قطاع غزة. بُنيت المنصة باستخدام Laravel 13 وPHP 8.4 وFrankenPHP لتمكين الركاب من تخطيط مسارات النقل حتى في ظل انقطاع الاتصال الخلوي عبر تخزين شبكة الخطوط محلياً، مع توفير تتبع لحظي للمركبات، طلب رحلات خاصة، ومراسلة آمنة عند توفر الاتصال.",
    },
    problem: {
      en: "In low-connectivity and post-conflict environments, mobile networks are frequently disrupted or congested. Traditional ride-hailing apps fail completely when servers cannot be continuously reached, leaving passengers unable to plan journeys and transit drivers unable to coordinate routes or vehicle availability.",
      ar: "في بيئات انقطاع وتذبذب الاتصالات، تعجز تطبيقات النقل التقليدية عن العمل تماماً بمجرد فقدان الاتصال بالخادم، مما يحرم المواطنين من معرفة مسارات النقل المتاحة أو طلب رحلات خاصة آمنة.",
    },
    solution: {
      en: "An offline-first architecture pre-compiling transit corridors into structured client storage, enabling zero-network multi-leg journey planning. When cellular connectivity is restored, the system synchronizes live vehicle positions with human-readable elapsed-age indicators, verifies driver corridor alignment via route drift detection, and routes private charter requests through a privacy-gated bidding flow.",
      ar: "معمارية قائمة على التخزين المحلي لشبكة النقل، تتيح احتساب مسارات الرحلات وتكاليفها دون الحاجة لاتصال لحظي بالإنترنت. وعند استعادة الاتصال، تقوم المنصة بمزامنة مواقع المركبات مع بيان عمر الإحداثية، واكتشاف الانحراف عن المسار، وفتح المراسلات المحمية لطلبات النقل الخاص.",
    },
    challenges: {
      en: [
        "Designing deterministic graph search algorithms suitable for execution in lightweight client-side JavaScript under limited device specifications",
        "Communicating GPS latency transparently to riders without displaying misleading vehicle positions or speculative arrival estimates",
        "Maintaining strict user data privacy between charter requesters and prospective drivers prior to booking confirmation",
      ],
      ar: [
        "بناء خوارزمية بحث مسارات حتمية وخفيفة تعمل بسلاسة على أجهزة الهواتف المحدودة المواصفات",
        "إظهار تأخر وصول إحداثيات GPS بوضوح للراكب دون تضليله ببيانات غير دقيقة أو تخمينات وصول غير مؤكدة",
        "حماية خصوصية بيانات الاتصال بين الركاب والسائقين لحين تأكيد حجز الرحلة",
      ],
    },
    lessonsLearned: {
      en: [
        "Offline resilience must be designed at the core data layer rather than retrofitted as an afterthought on top of standard REST endpoints",
        "Visual honesty regarding data freshness (explicit elapsed age) establishes greater user trust than optimistic approximations in unstable network conditions",
        "Separating offline route search from online features (bidding and messaging) establishes clear user expectations and system boundaries",
      ],
      ar: [
        "القدرة على العمل دون اتصال يجب أن تُصمم منذ البداية في بنية البيانات وليس كمجرد إضافة لاحقة للـ APIs التقليدية",
        "الشفافية في بيان عمر بيانات الموقع (عمر إحداثية GPS المنقضي) تمنح المستخدم ثقة أعلى بكثير من التوقعات التقريبية غير المؤكدة",
        "فصل وظائف العمل دون اتصال (البحث والتخطيط) عن الوظائف المتطلبة للشبكة (المزايدة والمراسلة) يوضح حدود النظام للمستخدم",
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
      github: undefined, // Organization repository pending confirmation
    },
    techStack: [
      "PHP",
      "Laravel",
      "REST APIs",
      "MySQL",
      "Relational Data Modeling",
      "Role-Based Access Control",
      "Task & Workflow Automation",
    ],
    keyFeatures: {
      en: [
        "Human resources and volunteer lifecycle management",
        "Field operations and on-the-ground activity tracking",
        "TaskWorkflow module: multi-step operational task delegation, internal orders, polymorphic comments, attachments, and activity logs",
        "ModuleManagement module: modular screen APIs and employee-module assignment relations",
        "Supply chain, inventory tracking, and logistics allocation",
        "Multi-tier organization management and role-based permissions",
      ],
      ar: [
        "إدارة دورة حياة الكوادر البشرية والمتطوعين في المنظمات",
        "متابعة العمليات الميدانية والأنشطة الإغاثية والتنموية",
        "وحدة سير المهام (TaskWorkflow): إسناد المهام، الطلبات الداخلية، التعليقات والمرفقات متعددة الأشكال، وسجل الأنشطة",
        "وحدة إدارة الحزم (ModuleManagement): واجهات برمجية لإدارة الشاشات وربط صلاحيات الموظفين بالوحدات",
        "إدارة سلاسل الإمداد والمخزون واللوجستيات الإغاثية",
        "إدارة متعددة المستويات للمؤسسات والتحكم في صلاحيات الوصول",
      ],
    },
    verifiedHighlights: {
      en: [
        "Engineered relational database models and modular backend APIs supporting complex non-profit organizational hierarchies",
        "Individually developed the TaskWorkflow module (task delegation, internal orders, polymorphic comments/attachments, and activity logs)",
        "Individually implemented ModuleManagement screen APIs and employee-module assignment relational mappings",
        "Active demonstration deployed on the Taqat application cluster",
      ],
      ar: [
        "تصميم وبناء نماذج قواعد بيانات علائقية وواجهات برمجية تدعم الهياكل الإدارية المعقدة للمنظمات الإنسانية",
        "التطوير الفردي لوحدة سير المهام TaskWorkflow (إسناد المهام، الطلبات الداخلية، المرفقات والتعليقات متعددة الأشكال، وسجلات النشاط)",
        "التطوير الفردي لواجهات إدارة الحزم ModuleManagement وتعيين الوحدات للموظفين في النظام",
        "نسخة استعراض حية ونشطة تعمل على منصة تطبيقات طاقات (Taqat)",
      ],
    },
    architectureHighlights: {
      en: [
        "Relational Schema Normalization: Designed to handle diverse operational entities across logistics, staffing, and field task assignments",
        "Scoped Organization Permissions: Enforces cross-organizational data isolation and role boundaries across administrative departments",
        "Polymorphic Activity & Workflow Logging: Attaches structured audit trails, comments, and file attachments across diverse operational entities",
      ],
      ar: [
        "هيكلة علائقية معيارية: مصممة لإدارة كيانات تشغيلية متنوعة تشمل اللوجستيات والموظفين والمهام الميدانية",
        "عزل بيانات المؤسسات: ضمان فصل بيانات المنظمات وصلاحيات الأدوار بشكل آمن ودقيق بين الأقسام",
        "سجلات أنظمة سير العمل متعددة الأشكال: ربط سجلات التدقيق والتعليقات والمرفقات بمختلف الكيانات التشغيلية",
      ],
    },
    overview: {
      en: "Masar is an integrated ERP platform tailored specifically for the logistical, human, and operational needs of non-profit and humanitarian development organizations. Nabil contributed as a Backend Developer within a project team, designing relational data schemas, building core REST APIs, implementing organizational access controls, and developing the TaskWorkflow and ModuleManagement modules.",
      ar: "مسار هي منصة متكاملة لتخطيط الموارد مصممة خصيصاً لتلبية الاحتياجات التشغيلية واللوجستية للمنظمات الإنسانية والتنموية. شارك نبيل كمطور أنظمة خلفية ضمن فريق المشروع، وركز على تصميم قواعد البيانات وبناء واجهات الـ REST API وتطبيق صلاحيات الوصول الإداري، إلى جانب تطوير وحدتي سير المهام وإدارة الحزم البرمجية.",
    },
    problem: {
      en: "Humanitarian organizations face fragmented workflows across field volunteer management, supply logistics, and multi-department task coordination, often relying on insecure spreadsheets and disconnected communication channels.",
      ar: "تواجه المنظمات الإنسانية تشتتاً تشغيلياً بين إدارة المتطوعين وسلاسل الإمداد ومتابعة المهام الميدانية، مما يؤدي لضعف التنسيق والاعتماد على جداول بيانات غير مركزية.",
    },
    solution: {
      en: "A unified ERP backend consolidating staff management, logistical tracking, internal orders, and task coordination with strict organizational access boundaries, enabling transparent, coordinated relief operations.",
      ar: "نظام خلفي موحد يجمع إدارة الموارد البشرية واللوجستيات والطلبات الداخلية ومتابعة المهام مع تطبيق سياسات وصول دقيقة تضمن كفاءة التنسيق وسرعة الاستجابة.",
    },
    challenges: {
      en: [
        "Modeling complex relational dependencies connecting volunteers, field supplies, and task assignments",
        "Maintaining performant query access across nested organization divisions without data leakage",
      ],
      ar: [
        "نمذجة العلاقات المترابطة بين المتطوعين والمخزون والمهام الميدانية بدقة",
        "الحفاظ على كفاءة الاستعلامات وقواعد البيانات مع تعدد أقسام المؤسسة دون تسريب بيانات",
      ],
    },
    lessonsLearned: {
      en: [
        "Clear entity boundary definitions early in system modeling prevent severe migration overhead later in development",
        "Modular decomposition (e.g. isolating TaskWorkflow and ModuleManagement) allows team members to implement independent features without code conflicts",
      ],
      ar: [
        "التحديد الدقيق لحدود الكيانات والعلاقات في بداية النمذجة يوفر جهداً كبيراً في التعديلات اللاحقة",
        "التقسيم المعياري للحزم (مثل فصل TaskWorkflow وModuleManagement) يتيح لأعضاء الفريق تطوير ميزات مستقلة بسلاسة دون تعارضات برمجية",
      ],
    },
    disclaimers: {
      en: [
        "The project repository is hosted under the MASAR-V-1 organization and is currently private pending public confirmation. Live demonstration is accessible on the Taqat cluster.",
      ],
      ar: [
        "المستودع البرمجي للمشروع تابع لمؤسسة MASAR-V-1 وهو خاص حالياً قيد تأكيد الإتاحة العامة. النسخة التجريبية الحية متاحة على منصة طاقات.",
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
      en: "Full Stack Build (AI-assisted engineering workflow)",
      ar: "تطوير شامل (بالاستعانة بأدوات هندسة البرمجيات بالذكاء الاصطناعي)",
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
        "Role-specific views and interaction flows for property owners, tenants, maintenance technicians, and administrators",
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
        "Multi-role application architecture with role-specific views for each user group",
      ],
      ar: [
        "تطبيق منشور ويعمل مباشرة على Vercel مع مستودع برمجي عام ومتاح على GitHub",
        "تجربة مستخدم عربية أصيلة مصممة خصيصاً لبيئة إدارة وصيانة العقارات في المنطقة",
        "معمارية متعددة الأدوار تقدم شاشات مخصصة لكل فئة من المستخدمين",
      ],
    },
    architectureHighlights: {
      en: [
        "Next.js App Router Architecture: Server Components handling database queries alongside client boundary interactive forms",
        "Authentication via Better Auth: Secure credential management and session tokens across diverse user roles with clean role-specific access boundaries",
      ],
      ar: [
        "معمارية Next.js App Router: استعلامات خادم مباشرة لقاعدة البيانات مع مكونات تفاعلية للنماذج",
        "مصادقة Better Auth: إدارة جلسات وبيانات تسجيل دخول آمنة لمختلف أدوار المنصة دون ادعاء صلاحيات معقدة غير موثقة",
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
      en: "A structured digital marketplace where maintenance requests are logged, assigned, and tracked through transparent status stages with dedicated role-specific views for all involved parties.",
      ar: "سوق رقمي منظم يتيح تسجيل طلبات الصيانة ومتابعة حالتها بشفافية مع توفير تجربة مخصصة لكل مستخدم حسب دوره في العملية.",
    },
    challenges: {
      en: [
        "Designing intuitive Arabic RTL layouts that feel native across all viewport dimensions",
        "Structuring multi-role session boundaries and role-specific views without overcomplicating data access patterns",
      ],
      ar: [
        "تصميم واجهات عربية تدعم RTL بسلاسة تامة على الهواتف والشاشات الكبيرة",
        "ضبط حدود الجلسات والشاشات المخصصة لكل دور دون تعقيد غير مبرر في نماذج البيانات",
      ],
    },
    lessonsLearned: {
      en: [
        "Prisma schema typing significantly reduces runtime contract bugs in full-stack applications",
        "Designing Arabic-first avoids the costly CSS restructuring often required when retrofitting RTL support later",
      ],
      ar: [
        "أمان الأنواع الذي يوفره Prisma يقلل بشكل ملموس من أخطاء البيانات غير المتوقعة",
        "التصميم بالعربية منذ البداية يوفر وقتاً كبيراً مقارنة بمحاولة إضافة دعم RTL لاحقاً",
      ],
    },
    disclaimers: {
      en: [
        "Developed utilizing an AI-assisted engineering workflow with verified role-specific views.",
      ],
      ar: [
        "طُوّر بالاستعانة بأدوات هندسة البرمجيات بالذكاء الاصطناعي مع شاشات مخصصة للأدوار.",
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
      en: "Cross-platform productivity ecosystem for tasks, habits, focus sessions, and AI-assisted goal milestones.",
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
      liveDemo: undefined, // Live demo is unavailable
      github: undefined, // Organization repository pending confirmation
    },
    techStack: [
      "PHP 8.4",
      "Laravel 13",
      "REST APIs",
      "MySQL",
      "JWT Authentication",
      "Gemini API (AI Goal Milestones)",
      "Task & Habit Management",
    ],
    keyFeatures: {
      en: [
        "Stateless JWT authentication using php-open-source-saver/jwt-auth with token refresh and profile lifecycle endpoints",
        "Dual login supporting phone number and email with verification and password reset flows",
        "Google OAuth authentication endpoint for mobile client integration",
        "AI-powered goal milestone breakdown suggestions integrated via Gemini API (AiGoalController)",
        "Structured RESTful API endpoints for tasks, habits, daily logs, and categories",
        "Focus session tracking engine with pause and resume state endpoints",
      ],
      ar: [
        "مصادقة لاحالة (Stateless JWT) باستخدام php-open-source-saver/jwt-auth مع تجديد التوكن وإدارة الملف الشخصي",
        "تسجيل دخول مزدوج يدعم البريد الإلكتروني أو رقم الهاتف مع تأكيد الحساب واستعادة كلمة المرور",
        "واجهة تكامل مصادقة Google OAuth لتطبيقات الهواتف الذكية",
        "اقتراح مراحل فرعية ذكية للأهداف بالاعتماد على Gemini API (AiGoalController)",
        "واجهات REST API مهيكلة لإدارة المهام والعادات وسجلات الإنجاز والتصنيفات",
        "محرك لتتبع جلسات التركيز مع دعم الإيقاف المؤقت والاستئناف",
      ],
    },
    verifiedHighlights: {
      en: [
        "Engineered the core backend REST APIs in Laravel implementing stateless JWT authentication for cross-platform mobile access",
        "Individually developed AI goal milestone suggestions connecting backend endpoints with the Gemini API",
        "Implemented authentication lifecycle: phone/email login, email verification, Google OAuth endpoint, password reset, and avatar management",
        "Authored complete API contract documentation in API_DOCUMENTATION.md for mobile engineering integration",
      ],
      ar: [
        "بناء الواجهات الخلفية (REST APIs) في Laravel باستخدام مصادقة JWT للمنصات المتعددة",
        "التطوير الفردي لخدمة اقتراح مراحل الأهداف الذكية عبر الربط مع Gemini API",
        "بناء دورة حياة المصادقة: الدخول بالهاتف/البريد، التحقق من البريد، OAuth جوجل، استعادة كلمة المرور، وإدارة الصور الرمزية",
        "توثيق كافة واجهات النظام البرمجية في ملف API_DOCUMENTATION.md لتسهيل ربط مطوري تطبيقات الموبايل",
      ],
    },
    architectureHighlights: {
      en: [
        "Stateless Token Security: JWT token generation, refresh strategies, and request validation middleware for cross-platform mobile clients",
        "AI Milestone Integration: Structured server-side schema contracts returning validated milestone arrays via Gemini API",
        "Time-Series Focus Tracking: Normalized relational schemas capturing focus session intervals and habit consistency streaks",
      ],
      ar: [
        "أمان التوكنات: توليد وتجديد توكنات JWT مع وسيط برمجي (Middleware) للتحقق من طلبات تطبيقات الهواتف الذكية",
        "تكامل مراحل الأهداف بالذكاء الاصطناعي: التحقق الصارم من مخرجات Gemini لضمان عودة مصفوفات مراحل مطابقة للمخطط",
        "تتبع جلسات التركيز: جداول علائقية لتسجيل فترات التركيز ومتابعة استمرارية العادات اليومية",
      ],
    },
    overview: {
      en: "Orbit is a cross-platform productivity and personal development ecosystem. Nabil served as Backend Developer within the team, building Laravel REST APIs, implementing JWT authentication, modeling database schemas for habit tracking and focus sessions, authoring API documentation, and connecting Gemini AI milestone suggestion endpoints.",
      ar: "أوربت هو نظام بيئي للإنتاجية والتطوير الشخصي. عمل نبيل كمطور للأنظمة الخلفية ضمن الفريق، حيث بنى واجهات الـ REST API في Laravel، وطبق مصادقة الـ JWT، وصمم قواعد البيانات الخاصة بالعادات وجلسات التركيز، وتكامل مع خدمات الاقتراحات الذكية للأهداف عبر Gemini API، ووثق عقود الـ APIs بالكامل.",
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
        "Designing performant queries to calculate habit streaks and focus analytics across client time zones",
        "Structuring AI prompt contracts to return consistent, schema-validated milestone arrays from the Gemini API",
      ],
      ar: [
        "بناء استعلامات فعالة لحساب استمرارية العادات (Streaks) مع اختلاف المناطق الزمنية للمستخدمين",
        "ضبط صياغة مخرجات الذكاء الاصطناعي لضمان عودة مصفوفات مهيكلة ومطابقة للمخطط من Gemini API",
      ],
    },
    lessonsLearned: {
      en: [
        "Stateless JWT architectures simplify cross-platform mobile client integration and eliminate server session state overhead",
        "Validating AI responses with strict server-side schemas prevents malformed payloads from breaking client views",
      ],
      ar: [
        "استخدام مصادقة JWT غير المقيدة بالحالة يسهل كثيراً ربط تطبيقات الهواتف الذكية ويقلل عبء إدارة الجلسات",
        "التحقق الصارم من مخرجات الذكاء الاصطناعي على الخادم يمنع وصول بيانات غير متوقعة للواجهات",
      ],
    },
    disclaimers: {
      en: [
        "Live demonstration is currently unavailable. The repository is an organization repository under BBD Select Digital Training (pending confirmation).",
      ],
      ar: [
        "العرض الحي غير متاح حالياً. المستودع البرمجي تابع لمؤسسة BBD Select للتدريب الرقمي (قيد تأكيد الإتاحة).",
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
      en: "Hierarchical university workflow and grievance management system designed to track and resolve student issues systematically.",
      ar: "نظام لإدارة ومتابعة قضايا وشكاوى الطلاب الجامعيين يعتمد على سير عمل إداري وتوجيه هرمي منظم.",
    },
    category: "academic",
    ownership: {
      en: "Academic Project (Individual Codebase)",
      ar: "مشروع أكاديمي (تطوير فردي)",
    },
    role: {
      en: "Backend & System Developer",
      ar: "مطور النظام والأنظمة الخلفية",
    },
    period: {
      en: "Academic Build",
      ar: "مشروع أكاديمي",
    },
    featured: false,
    status: "verified-code",
    links: {
      liveDemo: undefined, // Live demo is unavailable
      github: "https://github.com/NabilDawud/University-Issues",
    },
    techStack: [
      "PHP 8.3+",
      "Laravel 13",
      "MySQL",
      "Spatie Permission (Roles & Permissions)",
      "Hierarchical Issue Routing & Status Workflow",
      "Dynamic Category Forms",
      "Blade",
    ],
    keyFeatures: {
      en: [
        "Student grievance submission with dynamic category-specific form fields (form_data)",
        "Hierarchical routing assigning issues to Department Heads based on student major and academic department",
        "Multi-tier issue reassignment workflow allowing escalation between Department Heads, Deans, and Administrators",
        "Explicit status transition actions (approve, reject, close, reassign) executed in database transactions",
        "Issue assignment tracking history logging chronological reviewer actions and status updates",
        "Role-based authorization using Spatie Laravel-permission and Laravel policies/gates for Admins, Deans, Department Heads, Instructors, and Students",
        "Collaborative issue comments and multipart file attachment management",
      ],
      ar: [
        "تقديم شكاوى وقضايا الطلاب إلكترونياً مع حقول نماذج متغيرة ديناميكياً حسب التصنيف (form_data)",
        "توجيه هرمي يربط القضية تلقائياً برئيس القسم المختص بناءً على تخصص الطالب وقسمه الأكاديمي",
        "سير عمل لإعادة توجيه القضايا يتيح التصعيد بين رؤساء الأقسام، العمداء، وإدارة النظام",
        "إجراءات تغيير حالة صريحة (موافقة، رفض، إغلاق، إعادة توجيه) تُنفذ ضمن معاملات قواعد بيانات آمنة (Transactions)",
        "سجل تاريخي لإسناد القضايا يوثق الإجراءات المتخذة وملاحظات المراجعين مرحلياً",
        "نظام صلاحيات معتمد على Spatie Laravel-permission وسياسات Laravel للأدوار: الأدمن، العميد، رئيس القسم، المحاضر، والطالب",
        "نظام تعليقات ومرفقات متعددة الأشكال لمتابعة تفاصيل القضية والمستندات الثبوتية",
      ],
    },
    verifiedHighlights: {
      en: [
        "Engineered the Laravel backend with verified Git authorship on the public GitHub repository",
        "Built automated hierarchical grievance routing connecting Students, Department Heads, Deans, and System Administrators",
        "Engineered transactional status workflows (approve, reject, close, reassign) with comprehensive assignment audit logging",
        "Implemented multi-role permission control with Spatie Laravel-permission and authorization policies",
      ],
      ar: [
        "تطوير النظام الخلفي في Laravel بتوثيق مساهمات برمجية مباشرة على مستودع GitHub",
        "بناء مسار توجيه هرمي آلي يربط الطلاب برؤساء الأقسام والعمداء وإدارة النظام",
        "تطبيق سير عمل الحالات (موافقة، رفض، إغلاق، إعادة توجيه) مع توثيق سجل الإسناد والمراجعة",
        "تطبيق نظام صلاحيات متعدد الأدوار بالاعتماد على Spatie Laravel-permission وسياسات الوصول",
      ],
    },
    architectureHighlights: {
      en: [
        "Hierarchical Issue Routing & Status Workflow: Routes grievances from students through department heads to deans or admins with transactional history logging",
        "Dynamic Category Schema: Validates and stores custom form data fields per grievance category",
        "Role-Based Access Control: Granular authorization policies separating student requests from departmental and administrative review actions",
      ],
      ar: [
        "مسار التوجيه الهرمي وسير العمل: توجيه الشكاوى من الطلاب إلى رؤساء الأقسام والعمداء مع توثيق تاريخ المعاملات",
        "مخطط التصنيفات الديناميكي: التحقق وتخزين حقول النماذج المخصصة لكل تصنيف قضية",
        "التحكم في الوصول حسب الدور: سياسات تحقق تفصل بين صلاحيات تقديم الطلبات وصلاحيات المراجعة والاعتماد",
      ],
    },
    overview: {
      en: "A structured university workflow and grievance management system built with Laravel 13, PHP 8.3, and MySQL. It enables academic institutions to record, route, and resolve student issues systematically through an automated hierarchical workflow connecting students with department heads, deans, and administrators.",
      ar: "نظام مهيكل لإدارة ومتابعة قضايا وشكاوى الطلاب الجامعيين بُني باستخدام Laravel 13 وPHP 8.3 وMySQL. يمكن المؤسسات الجامعية من تسجيل وفرز ومعالجة مشكلات الطلاب بصورة منظمة عبر سير عمل هرمي آلي يربط الطالب برؤساء الأقسام والعمداء والإدارة.",
    },
    problem: {
      en: "Universities frequently handle student grievances through informal, paper-based, or fragmented channels, making it difficult to maintain accountability, track resolution times, or assign complaints to the responsible academic departments.",
      ar: "غالباً ما تتعامل المؤسسات التعليمية مع مشكلات الطلاب بطرق ورقية أو غير مركزية، مما يصعب توثيق الشكاوى أو معرفة أوقات الاستجابة ومتابعة التوجيه للقسم الأكاديمي المختص.",
    },
    solution: {
      en: "A digital grievance workflow system that routes complaints to appropriate department heads based on major, supports multi-tier escalation to deans and administrators, and maintains transparent status transitions with complete assignment history.",
      ar: "نظام رقمي منظم يوجه الشكاوى لرئيس القسم المختص تلقائياً، ويدعم التصعيد للعمداء والإدارة، ويوثق مراحل المعالجة والحل مع سجل تاريخي كامل للإجراءات.",
    },
    challenges: {
      en: [
        "Designing dynamic category form schemas that accommodate diverse academic inquiry types without requiring constant database migrations",
        "Implementing hierarchical authorization rules that adapt issue visibility according to the reviewer's departmental scope",
      ],
      ar: [
        "تصميم نماذج إدخال متغيرة حسب نوع القضية دون الحاجة لتعديل جداول قاعدة البيانات عند إضافة تصنيف جديد",
        "تطبيق قواعد صلاحيات هرمية تضبط ظهور القضايا حسب النطاق الأكاديمي لكل مراجع",
      ],
    },
    lessonsLearned: {
      en: [
        "Explicit status transition actions encapsulated in database transactions guarantee data integrity across complex administrative workflows",
        "Tracking full assignment history provides essential accountability in multi-tier grievance resolution systems",
      ],
      ar: [
        "حصر إجراءات تغيير الحالة في معاملات قواعد بيانات آمنة يضمن تكامل وصحة البيانات في سير العمل الإداري",
        "توثيق سجل الإسناد الكامل يوفر الشفافية والمسؤولية اللازمة في أنظمة معالجة الشكاوى الأكاديمية",
      ],
    },
    disclaimers: {
      en: [
        "Live demonstration is currently unavailable. Source code is publicly accessible on GitHub.",
      ],
      ar: [
        "العرض الحي غير متاح حالياً. الشفرة المصدرية متاحة وموثقة على مستودع GitHub.",
      ],
    },
  },
];
