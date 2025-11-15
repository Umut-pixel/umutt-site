import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Umut Erol",
  initials: "UE",
  url: "https://umuterol.net",
  location: "Izmir, Turkey",
  locationLink: "https://maps.app.goo.gl/i4EeCGPhwjNsAZAg9",
  description:
    "Software Developer and a Dreamer. I love building things and helping people. I am a dreamer and I love to dream about the future.",
  summary:
    "At the end of 2025, I shifted from contract work and university projects into fully focusing on building and scaling my own software products. Over the years, [I studied computer programming](/#education) in İzmir, worked as a [freelance full-stack developer](/#work), and contributed to various SaaS and automation systems across web, AI, and maritime logistics. I’ve built products with React, Next.js, Node.js, Supabase, and modern AI tooling, and [co-founded Aygıt Software](https://aygityazilim.com) to deliver practical, fast-moving solutions for small businesses.",
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
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "umuteroltr097@gmail.com",
    tel: "+90 545 347 45 36",
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
      company: "Aygıt Software",
      href: "https://aygityazilim.com",
      badges: [],
      location: "Izmir , TR",
      title: "Co-Founder & Frontend Developer",
      logoUrl: "/aygit.jpeg",
      start: "Aug 2025",
      end: "Active...",
      description:
        "At Aygıt, I develop the core SaaS platform that enables small businesses to generate and manage their websites through an AI-assisted builder. I work across the full stack: implementing the React/Next.js frontend, wiring the Node.js/Supabase backend, and integrating the AI generation layer that produces themes, content, and layouts from user prompts. I also design the component architecture, handle authentication and database modeling, and optimize the system for fast rendering and stable deployments. The focus is to turn the product from a simple website generator into a smooth, reliable, and scalable platform that businesses can use without technical knowledge.",
    },
    {
      company: "Atlas Lab's",
      href: "#",
      badges: [],
      location: "Izmir, TR",
      title: "Software Developer",
      logoUrl: "/atlas.png",
      start: "July 2025",
      end: "Active...",
      description:
        "At Atlas Labs, I work on building automation and data-driven systems, with Marinsco as one of the core products. My focus is on transforming unstructured maritime emails into structured, queryable data and automating the vessel–cargo matching workflow. I design and implement the parsing pipelines, build the AI-supported classification prompts, and maintain the Supabase-based backend that stores and serves operational data. On the frontend, I develop the internal dashboards that brokers use to view ships, cargos, and match suggestions in real time. The broader goal is to replace manual brokerage routines with a fully automated decision system built on modern web technologies, AI tooling, and clean, maintainable engineering.",
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
        "During my SAP ABAP internship, I worked on developing and maintaining backend modules within the SAP ERP environment. I implemented small-scale ABAP reports, assisted in creating function modules, and updated existing codebases to improve performance and data accuracy. I also worked with tables, data dictionary objects, and simple ALV reports, and supported debugging tasks for ongoing client issues. The focus was understanding SAP’s workflow, learning ABAP’s procedural structure, and contributing to routine development and maintenance tasks inside the ERP system.",
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
    {
      school: "Tugba Ozbek Anatolian High School",
      href: "https://tugbaozbekanadolulisesi.meb.k12.tr",
      degree: "High School Diploma",
      logoUrl: "/meb.png",
      start: "2018",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "Aygıt Builders ",
      href: "https://github.com/Umut-pixel/dashboard-aygit-website",
      dates: "August 2025 - Active",
      active: true,
      description:
        "The Aygıt Builders is the control layer of our SaaS platform, providing real-time visibility into site generation, user activity, and AI output quality. It pulls structured data from our Supabase/PostgreSQL backend and displays system metrics such as theme configurations, generation logs, and deployment states. I develop the React/Next.js interface, implement API integrations, and maintain the analytics layer that tracks usage patterns, performance, and errors. The dashboard is designed to keep the entire AI-assisted site-building workflow transparent, stable, and easy to manage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "PayTr",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://github.com/Umut-pixel/dashboard-aygit-website",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "/aygit-dash.mp4",
    },
    {
      title: "Marinsco CRM Systems",
      href: "#",
      dates: "September 2025 - Active",
      active: true,
      description:
        "Marinsco is a maritime automation system that converts the manual email-based brokerage workflow into a structured, algorithmic process. It takes unstructured vessel and cargo emails—often incomplete, noisy, or table-formatted—and processes them through an NLP pipeline that extracts clean, fully structured JSON data. All parsed information is stored in a normalized Supabase/PostgreSQL database.",
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
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Umut-pixel/marinsco-parser",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
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
        "Pythonm",
        "Cloudflare Workers"
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
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
