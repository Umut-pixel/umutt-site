import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Umut Erol",
  initials: "UE",
  url: "https://umuterol.net",
  location: "Izmir, Turkey",
  locationLink: "https://maps.app.goo.gl/i4EeCGPhwjNsAZAg9",
  description:
    "Software developer building products, not just projects. Right now I'm focused on Celixion, an AI-powered platform for dry cargo shipping brokerage, and figuring out how to make it work in the real world.",
  summary:
    "At the end of 2025 I stepped away from contract work and university projects to focus fully on building my own product. [I studied computer programming](/#education) in İzmir, worked as a [freelance full-stack developer](/#work), and picked up experience across web, AI, and maritime logistics along the way. Now I'm building [Celixion](https://celixion.com) with React, Next.js, Node.js, Supabase, and modern AI tooling to ship fast, practical solutions for maritime brokers.",
  avatarUrl: "/me.png",
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
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "umuteroltr097@gmail.com",
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
      title: "Software Developer & Founder",
      logoUrl: "/celixion.png",
      start: "July 2025",
      end: "Active...",
      description:
        "I work on Celixion, a system that turns messy maritime brokerage emails into structured, queryable data. I build the parsing pipelines and AI-supported classification prompts, maintain the Supabase backend, and develop the internal dashboards brokers use to see ships, cargos, and match suggestions in real time. The aim is replacing manual brokerage routines with an automated matching system.",
    },
    {
      company: "Aygıt Software",
      href: "https://aygityazilim.com",
      badges: [],
      location: "Izmir , TR",
      title: "Software Developer",
      logoUrl: "/aygit.jpeg",
      start: "Aug 2025",
      end: "Oct 2025",
      description:
        "I build the core SaaS platform that lets small businesses generate and manage their websites through an AI-assisted builder — the React/Next.js frontend, the Node.js/Supabase backend, and the AI layer that turns prompts into themes, content, and layouts. I own the component architecture, auth, and database modeling, and keep the system fast and stable in production. The goal: a website generator anyone can use, no technical knowledge required.",
    },
    {
      company: "Monotis Digital Innovation",
      badges: [],
      href: "https://www.linkedin.com/company/monotis-digital-solutions",
      location: "Izmir, TR",
      title: "SAP - ABAP Internship",
      logoUrl: "/monotis.jpeg",
      start: "January 2024",
      end: "November 2024",
      description:
        "I developed and maintained backend modules in the SAP ERP environment — small ABAP reports, function modules, and updates to existing code for performance and accuracy. I worked with tables, data dictionary objects, and ALV reports, and supported debugging on live client issues. This is where I learned how enterprise systems actually run in production.",
    },
  ],
  education: [
    {
      school: "Yasar University",
      href: "https://www.yasar.edu.tr",
      degree: "Asscoiate's Degree of Computer Science",
      logoUrl: "/yasar.jpeg",
      start: "2023",
      end: "2025",
    },
    
  ],
  projects: [
    
    {
      title: "Celixion",
      href: "app.celixion.com",
      dates: "September 2025 - Active",
      active: true,
      description:
        "Celixion is a system that turns messy maritime brokerage emails into structured, queryable data. I build the parsing pipelines and AI-supported classification prompts, maintain the Supabase backend, and develop the internal dashboards brokers use to see ships, cargos, and match suggestions in real time. The aim is replacing manual brokerage routines with an automated matching system.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL + Supabase",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "JavaScript",
        "n8n",
        "Python",
        "Cloudflare Workers"
      ],
      links: [
        {
          type: "Website",
          href: "app.celixion.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/celixion-rec.mov",
    },
    {
      title: "Landing Page Designs",
      href: "#",
      dates: "April 2024 - active",
      active: true,
      description:
        "Developed an landing page design for various customers and companies in Aygit as Freelancer.",
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
          type: "Source",
          href: "https://github.com/Umut-pixel/aygit-themes-2",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "/rota-landing.mp4",
    },
  ],
  hackathons: [
    {
      title: "IEEE CORE Workshops",
      dates: "April 23rd - 29th, 2018",
      location: "Yasar University, Izmir, TR",
      description:
        "Organized series of workshops on various topics related to computer science and technology.",
      image:
        "/ieee.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "IEEE Computer Society Summit",
      dates: "March 19th, 2025",
      location: "Yasar University, Izmir, TR",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "/ieee.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "IEEEXTREME Programming Competition",
      dates: "October, 2024",
      location: "",
      description:"Competed in the 24-hour international programming challenge organized by IEEE. Solved algorithmic problems involving graph traversal, dynamic programming, string processing, and optimization under strict time constraints. Worked with Python and C++ to implement efficient solutions within the competition environment.",
      image:"/ieeextreme.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Climate and Sustainabilty Camp",
      dates: "July, 2024",
      location: "Seferihisar, Izmir, TR",
      description: "Organized the Climate and Sustainabilty Camp with Izmir City Council and hosted 50+ university students to learn about climate and sustainabilty and develop projects to solve climate problems within Izmir.",
      image: "/camp.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    
    
  ],
} as const;
