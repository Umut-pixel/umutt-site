import { Icons } from "@/components/icons";
import type { Localized } from "@/data/i18n";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Umut Erol",
  initials: "UE",
  url: "https://umuterol.net",
  location: "Izmir, Turkey",
  locationLink: "https://maps.app.goo.gl/i4EeCGPhwjNsAZAg9",
  description: {
    en: "Software developer building products, not just projects. Right now I'm focused on Celixion, an AI-powered platform for dry cargo shipping brokerage, and figuring out how to make it work in the real world.",
    tr: "Sadece proje değil, ürün geliştiren bir yazılımcıyım. Şu anda kuru yük gemi brokerliği için yapay zekâ destekli bir platform olan Celixion'a odaklanmış durumdayım ve onu gerçek dünyada nasıl çalıştıracağımı çözmeye uğraşıyorum.",
  } as Localized,
  summary: {
    en: "At the end of 2025 I stepped away from contract work and university projects to focus fully on building my own product. [I studied computer programming](/#education) in İzmir, worked as a [freelance full-stack developer](/#work), and picked up experience across web, AI, and maritime logistics along the way. Now I'm building [Celixion](https://celixion.com) with React, Next.js, Node.js, Supabase, and modern AI tooling to ship fast, practical solutions for maritime brokers.",
    tr: "2025'in sonunda, tamamen kendi ürünümü geliştirmeye odaklanmak için sözleşmeli işlerden ve üniversite projelerinden çekildim. İzmir'de [bilgisayar programcılığı okudum](/tr/#education), [serbest full-stack geliştirici](/tr/#work) olarak çalıştım ve bu süreçte web, yapay zekâ ve denizcilik lojistiği alanlarında deneyim biriktirdim. Şimdi denizcilik brokerlarına hızlı ve pratik çözümler sunmak için React, Next.js, Node.js, Supabase ve güncel yapay zekâ araçlarıyla [Celixion](https://celixion.com) platformunu geliştiriyorum.",
  } as Localized,
  avatarUrl: "/me.webp",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
    "n8n",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, labelKey: "home" as const },
    { href: "/blog", icon: NotebookIcon, labelKey: "blog" as const },
  ],
  contact: {
    email: "umut@celixion.com",
    tel: "-",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Umut-pixel",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/umut-erol",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/BomboloaCat",
        icon: Icons.x,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Celixion",
      href: "https://www.celixion.com",
      badges: [],
      location: "Izmir, TR",
      title: {
        en: "Software Developer & Founder",
        tr: "Yazılım Geliştirici & Kurucu",
      } as Localized,
      logoUrl: "/celixion.png",
      start: { en: "July 2025", tr: "Temmuz 2025" } as Localized,
      end: { en: "Active...", tr: "Devam ediyor..." } as Localized,
      description: {
        en: "I work on Celixion, a system that turns messy maritime brokerage emails into structured, queryable data. I build the parsing pipelines and AI-supported classification prompts, maintain the Supabase backend, and develop the internal dashboards brokers use to see ships, cargos, and match suggestions in real time. The aim is replacing manual brokerage routines with an automated matching system.",
        tr: "Celixion üzerinde çalışıyorum; dağınık denizcilik brokerliği e-postalarını yapılandırılmış ve sorgulanabilir veriye çeviren bir sistem. Ayrıştırma hatlarını ve yapay zekâ destekli sınıflandırma promptlarını ben kuruyorum, Supabase altyapısını yönetiyorum ve brokerların gemileri, kargoları ve eşleşme önerilerini anlık gördüğü iç panelleri geliştiriyorum. Amaç, manuel brokerlik rutinini otomatik bir eşleştirme sistemiyle değiştirmek.",
      } as Localized,
    },
    {
      company: "Aygıt Software",
      href: "https://aygityazilim.com",
      badges: [],
      location: "Izmir , TR",
      title: {
        en: "Software Developer",
        tr: "Yazılım Geliştirici",
      } as Localized,
      logoUrl: "/aygit.jpeg",
      start: { en: "Aug 2025", tr: "Ağu 2025" } as Localized,
      end: { en: "Oct 2025", tr: "Eki 2025" } as Localized,
      description: {
        en: "I build the core SaaS platform that lets small businesses generate and manage their websites through an AI-assisted builder — the React/Next.js frontend, the Node.js/Supabase backend, and the AI layer that turns prompts into themes, content, and layouts. I own the component architecture, auth, and database modeling, and keep the system fast and stable in production. The goal: a website generator anyone can use, no technical knowledge required.",
        tr: "Küçük işletmelerin yapay zekâ destekli bir kurucu üzerinden kendi web sitelerini üretip yönetebildiği SaaS platformunun çekirdeğini geliştirdim — React/Next.js arayüzü, Node.js/Supabase arka ucu ve promptları temaya, içeriğe ve düzene çeviren yapay zekâ katmanı. Bileşen mimarisi, kimlik doğrulama ve veritabanı modellemesi bana aitti; sistemi üretimde hızlı ve kararlı tuttum. Hedef: teknik bilgi gerektirmeyen, herkesin kullanabileceği bir site üreticisi.",
      } as Localized,
    },
    {
      company: "Monotis Digital Innovation",
      badges: [],
      href: "https://www.linkedin.com/company/monotis-digital-solutions",
      location: "Izmir, TR",
      title: {
        en: "SAP - ABAP Internship",
        tr: "SAP - ABAP Stajı",
      } as Localized,
      logoUrl: "/monotis.jpeg",
      start: { en: "January 2024", tr: "Ocak 2024" } as Localized,
      end: { en: "November 2024", tr: "Kasım 2024" } as Localized,
      description: {
        en: "I developed and maintained backend modules in the SAP ERP environment — small ABAP reports, function modules, and updates to existing code for performance and accuracy. I worked with tables, data dictionary objects, and ALV reports, and supported debugging on live client issues. This is where I learned how enterprise systems actually run in production.",
        tr: "SAP ERP ortamında arka uç modülleri geliştirdim ve bakımını yaptım — küçük ABAP raporları, fonksiyon modülleri ve mevcut kodda performans ile doğruluk iyileştirmeleri. Tablolar, veri sözlüğü nesneleri ve ALV raporlarıyla çalıştım, canlı müşteri sorunlarının hata ayıklamasına destek verdim. Kurumsal sistemlerin üretimde gerçekte nasıl işlediğini burada öğrendim.",
      } as Localized,
    },
  ],
  education: [
    {
      school: "Yasar University",
      href: "https://www.yasar.edu.tr",
      degree: {
        en: "Associate's Degree of Computer Science",
        tr: "Bilgisayar Programcılığı Ön Lisans",
      } as Localized,
      logoUrl: "/yasar.jpeg",
      start: "2023",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "Locus",
      slug: "locus",
      href: "/projects/locus",
      dates: {
        en: "July 2026 - Active",
        tr: "Temmuz 2026 - Devam ediyor",
      } as Localized,
      active: true,
      description: {
        en: "An operations tool for Peritas Pet Food, a pet shop and veterinary distributor in the Aegean region. It merges five fragmented Panorama ERP exports into a single mappable view of 1,426 customers, answering \"which customer is overdue a delivery, which one is a payment risk\" at a glance instead of by hand in Excel.",
        tr: "Ege bölgesinde faaliyet gösteren bir petshop/veteriner distribütörü (Peritas Pet Food) için geliştirilen operasyon aracı. Panorama ERP'den gelen parçalı Excel raporlarını 1.426 müşterilik tek bir haritalanabilir görünümde birleştiriyor; \"hangi müşteride teslimat gecikmiş, hangisinde ödeme riski var\" sorusunu Excel'de manuel pivot/VLOOKUP yapmadan tek bakışta yanıtlıyor.",
      } as Localized,
      technologies: [
        "Next.js",
        "Mapbox GL JS",
        "Supabase",
        "PostgreSQL",
        "Python",
        "n8n",
        "Vercel",
      ],
      links: [
        {
          typeKey: "website" as const,
          href: "https://locus-two-delta.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/locus-mark.png",
      imageFit: "cover",
      video: "",
    },
    {
      title: "Celixion",
      slug: "celixion",
      href: "https://celixion.com",
      dates: {
        en: "September 2025 - Active",
        tr: "Eylül 2025 - Devam ediyor",
      } as Localized,
      active: true,
      description: {
        en: "An operations hub for maritime and dry cargo brokers. The moment a quote email lands, Celixion parses it, files the vessel or cargo, and surfaces the best match — replacing the inbox-and-Excel routine with live fleet tracking, market signals, and automated matching. In daily use by broker teams: 23,000+ emails processed into 2,450 vessels and 5,339 cargo offers, at 92% auto-match accuracy.",
        tr: "Denizcilik ve kuru yük brokerları için bir operasyon merkezi. Bir teklif e-postası düştüğü anda Celixion onu ayrıştırıyor, gemiyi ya da kargoyu kaydediyor ve en uygun eşleşmeyi öne çıkarıyor — gelen kutusu ile Excel arasında gidip gelme rutinini canlı filo takibi, piyasa sinyalleri ve otomatik eşleştirmeyle değiştiriyor. Broker ekipleri tarafından günlük kullanımda: 23.000'den fazla e-posta işlenerek 2.450 gemi ve 5.339 kargo teklifine dönüştü, otomatik eşleşmede %92 doğruluk.",
      } as Localized,
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL + Supabase",
        "Prisma",
        "Mapbox",
        "Recharts",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "n8n",
        "Python",
        "Cloudflare Workers",
      ],
      links: [
        {
          typeKey: "website" as const,
          href: "https://celixion.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/blog/building-celixion-v2.png",
      imageFit: "cover",
      video: "",
    },
    {
      title: "Landing Page Designs",
      slug: "",
      href: "https://github.com/Umut-pixel/aygit-themes-2",
      dates: {
        en: "April 2024 - Active",
        tr: "Nisan 2024 - Devam ediyor",
      } as Localized,
      active: true,
      description: {
        en: "Landing page design and development for a range of customers and companies, built as a freelancer with Aygıt Software. Delivered as reusable Next.js themes — component-driven, responsive layouts that can be restyled per client rather than rebuilt from scratch.",
        tr: "Aygıt Software ile serbest çalışırken çeşitli müşteri ve şirketler için tanıtım sayfası tasarımı ve geliştirmesi. Yeniden kullanılabilir Next.js temaları olarak teslim edildi — bileşen tabanlı, duyarlı düzenler; her müşteri için sıfırdan yazmak yerine yeniden biçimlendirilebiliyor.",
      } as Localized,
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          typeKey: "source" as const,
          href: "https://github.com/Umut-pixel/aygit-themes-2",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      imageFit: "cover",
      video: "/rota-landing.mp4",
    },
  ],
  hackathons: [
    {
      title: {
        en: "IEEE CORE Workshops",
        tr: "IEEE CORE Atölyeleri",
      } as Localized,
      dates: {
        en: "April 23rd - 29th, 2018",
        tr: "23 - 29 Nisan 2018",
      } as Localized,
      location: "Yasar University, Izmir, TR",
      description: {
        en: "Organized series of workshops on various topics related to computer science and technology.",
        tr: "Bilgisayar bilimi ve teknoloji alanında çeşitli konularda bir atölye serisi düzenledim.",
      } as Localized,
      image: "/ieee.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: {
        en: "IEEE Computer Society Summit",
        tr: "IEEE Computer Society Zirvesi",
      } as Localized,
      dates: {
        en: "March 19th, 2025",
        tr: "19 Mart 2025",
      } as Localized,
      location: "Yasar University, Izmir, TR",
      description: {
        en: "Developed a mobile application which delivers university campus wide events in real time to all students.",
        tr: "Kampüs genelindeki etkinlikleri tüm öğrencilere anlık ileten bir mobil uygulama geliştirdim.",
      } as Localized,
      image: "/ieee.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: {
        en: "IEEEXTREME Programming Competition",
        tr: "IEEEXTREME Programlama Yarışması",
      } as Localized,
      dates: { en: "October, 2024", tr: "Ekim 2024" } as Localized,
      location: "",
      description: {
        en: "Competed in the 24-hour international programming challenge organized by IEEE. Solved algorithmic problems involving graph traversal, dynamic programming, string processing, and optimization under strict time constraints. Worked with Python and C++ to implement efficient solutions within the competition environment.",
        tr: "IEEE tarafından düzenlenen 24 saatlik uluslararası programlama yarışmasına katıldım. Sıkı zaman kısıtı altında graf gezinme, dinamik programlama, metin işleme ve optimizasyon içeren algoritmik problemler çözdüm. Yarışma ortamında verimli çözümler için Python ve C++ kullandım.",
      } as Localized,
      image: "/ieeextreme.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: {
        en: "Climate and Sustainability Camp",
        tr: "İklim ve Sürdürülebilirlik Kampı",
      } as Localized,
      dates: { en: "July, 2024", tr: "Temmuz 2024" } as Localized,
      location: "Seferihisar, Izmir, TR",
      description: {
        en: "Organized the Climate and Sustainability Camp with Izmir City Council and hosted 50+ university students to learn about climate and sustainability and develop projects to solve climate problems within Izmir.",
        tr: "İzmir Kent Konseyi ile İklim ve Sürdürülebilirlik Kampı'nı düzenledim; 50'den fazla üniversite öğrencisini iklim ve sürdürülebilirlik üzerine öğrenmek ve İzmir'deki iklim sorunlarına çözüm projeleri geliştirmek üzere ağırladık.",
      } as Localized,
      image: "/camp.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
  ],
} as const;
