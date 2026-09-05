export const LOCALES = ["en", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** A string that exists in both languages. */
export type Localized = { en: string; tr: string };

/** Read a localized field. Plain strings pass through untouched (URLs, dates). */
export function t(value: Localized | string, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

/**
 * English lives at the root (`/blog`), Turkish under a prefix (`/tr/blog`), so
 * existing URLs never changed when the second locale was added.
 */
export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? "/tr" : `/tr${clean}`;
}

/** Strip the locale prefix off a browser pathname. */
export function stripLocale(pathname: string): {
  locale: Locale;
  path: string;
} {
  if (pathname === "/tr") return { locale: "tr", path: "/" };
  if (pathname.startsWith("/tr/")) {
    return { locale: "tr", path: pathname.slice(3) };
  }
  return { locale: "en", path: pathname };
}

type Dictionary = {
  nav: { home: string; blog: string; theme: string; language: string };
  home: {
    greeting: (firstName: string) => string;
    about: string;
    work: string;
    education: string;
    skills: string;
    projectsBadge: string;
    projectsTitle: string;
    projectsBlurb: string;
    blogBadge: string;
    blogTitle: string;
    blogBlurb: string;
    viewAllPosts: string;
    eventsBadge: string;
    eventsTitle: string;
    eventsBlurb: (count: number) => string;
    contactBadge: string;
    contactTitle: string;
    contactBefore: string;
    contactAfter: string;
  };
  blog: {
    title: string;
    badge: string;
    blurb: string;
    metaDescription: string;
    empty: string;
    allPosts: string;
    share: string;
  };
  project: {
    visitWebsite: string;
    source: string;
    allProjects: string;
    caseStudy: string;
  };
};

export const DICTIONARY: Record<Locale, Dictionary> = {
  en: {
    nav: { home: "Home", blog: "Blog", theme: "Theme", language: "Language" },
    home: {
      greeting: (firstName) => `Hi, I'm ${firstName} 👋`,
      about: "About",
      work: "Work Experience",
      education: "Education",
      skills: "Skills",
      projectsBadge: "My Projects",
      projectsTitle: "Check out my latest work",
      projectsBlurb:
        "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
      blogBadge: "Blog",
      blogTitle: "Latest writing",
      blogBlurb:
        "A few recent notes on building products, shipping software, and the things I'm learning along the way.",
      viewAllPosts: "View all posts",
      eventsBadge: "Events",
      eventsTitle: "I like building things",
      eventsBlurb: (count) =>
        `During my time in university, I attended ${count}+ hackathons. People from around the country would come together and build incredible things in 2-3 days. It was eye-opening to see the endless possibilities brought to life by a group of motivated and passionate individuals.`,
      contactBadge: "Contact",
      contactTitle: "Get in Touch",
      contactBefore: "Want to chat? Just shoot me an email at",
      contactAfter:
        "and I'll respond whenever I can. I will ignore all soliciting.",
    },
    blog: {
      title: "Writing",
      badge: "Blog",
      blurb:
        "Notes on building products, shipping software, and the things I'm learning along the way.",
      metaDescription:
        "Notes on building products, shipping software, and learning.",
      empty: "No posts yet.",
      allPosts: "All posts",
      share: "Share the link",
    },
    project: {
      visitWebsite: "Visit website",
      source: "Source",
      allProjects: "All projects",
      caseStudy: "Case study",
    },
  },
  tr: {
    nav: {
      home: "Ana sayfa",
      blog: "Blog",
      theme: "Tema",
      language: "Dil",
    },
    home: {
      greeting: (firstName) => `Merhaba, ben ${firstName} 👋`,
      about: "Hakkımda",
      work: "İş Deneyimi",
      education: "Eğitim",
      skills: "Yetkinlikler",
      projectsBadge: "Projelerim",
      projectsTitle: "Son çalışmalarıma göz at",
      projectsBlurb:
        "Basit tanıtım sitelerinden karmaşık web uygulamalarına kadar pek çok proje geliştirdim. İşte en sevdiklerimden birkaçı.",
      blogBadge: "Blog",
      blogTitle: "Son yazılar",
      blogBlurb:
        "Ürün geliştirmek, yazılım yayına almak ve yol boyunca öğrendiklerim üzerine birkaç not.",
      viewAllPosts: "Tüm yazılar",
      eventsBadge: "Etkinlikler",
      eventsTitle: "Bir şeyler inşa etmeyi seviyorum",
      eventsBlurb: (count) =>
        `Üniversite yıllarımda ${count}'ten fazla hackathona katıldım. Ülkenin dört bir yanından gelen insanlar 2-3 gün içinde inanılmaz işler çıkarıyordu. Motive ve tutkulu bir grubun ortaya koyabileceği sonsuz olasılığı görmek gözümü açtı.`,
      contactBadge: "İletişim",
      contactTitle: "Bana ulaş",
      contactBefore: "Konuşmak ister misin? Bana şu adresten e-posta gönder:",
      contactAfter:
        "elimden geldiğince hızlı dönerim. Reklam ve tanıtım mesajlarını dikkate almıyorum.",
    },
    blog: {
      title: "Yazılar",
      badge: "Blog",
      blurb:
        "Ürün geliştirmek, yazılım yayına almak ve yol boyunca öğrendiklerim üzerine notlar.",
      metaDescription:
        "Ürün geliştirmek, yazılım yayına almak ve öğrenmek üzerine notlar.",
      empty: "Henüz yazı yok.",
      allPosts: "Tüm yazılar",
      share: "Bağlantıyı paylaş",
    },
    project: {
      visitWebsite: "Siteyi ziyaret et",
      source: "Kaynak kod",
      allProjects: "Tüm projeler",
      caseStudy: "İnceleme",
    },
  },
};

export function dict(locale: Locale): Dictionary {
  return DICTIONARY[locale];
}
