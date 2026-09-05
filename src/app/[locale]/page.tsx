import { BlogCard } from "@/components/blog-card";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/data/blog";
import { dict, localePath, t, type Locale } from "@/data/i18n";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default async function Page({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const s = dict(locale).home;
  const p = dict(locale).project;
  const posts = (await getBlogPosts(locale)).slice(0, 2);

  const linkLabel = (key: "website" | "source") =>
    key === "website" ? p.visitWebsite : p.source;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={s.greeting(DATA.name.split(" ")[0])}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={t(DATA.description, locale)}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} duration={0.35} yOffset={4} blur="4px">
              <Avatar className="relative size-28 border">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  width={112}
                  height={112}
                  priority
                  quality={85}
                  className="aspect-square h-full w-full object-cover"
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{s.about}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {t(DATA.summary, locale)}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">{s.work}</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={t(work.title, locale)}
                href={work.href}
                badges={work.badges}
                period={`${t(work.start, locale)} - ${t(work.end, locale)}`}
                description={t(work.description, locale)}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{s.education}</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={t(education.degree, locale)}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">{s.skills}</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {s.projectsBadge}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {s.projectsTitle}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {s.projectsBlurb}
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={
                    project.slug
                      ? localePath(`/projects/${project.slug}`, locale)
                      : project.href
                  }
                  key={project.title}
                  title={project.title}
                  description={t(project.description, locale)}
                  dates={t(project.dates, locale)}
                  tags={project.technologies}
                  image={project.image}
                  imageFit={project.imageFit}
                  video={project.video}
                  slug={project.slug}
                  caseStudyLabel={p.caseStudy}
                  caseStudyHref={
                    project.slug
                      ? localePath(`/projects/${project.slug}`, locale)
                      : undefined
                  }
                  links={project.links.map((link) => ({
                    href: link.href,
                    icon: link.icon,
                    type: linkLabel(link.typeKey),
                  }))}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="blog">
        <div className="space-y-10 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13} duration={0.35} yOffset={4} blur="4px">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {s.blogBadge}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {s.blogTitle}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {s.blogBlurb}
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto w-full">
            {posts.map((post, id) => (
              <BlurFade
                key={post.slug}
                delay={BLUR_FADE_DELAY * 13.5 + id * 0.03}
                duration={0.35}
                yOffset={4}
                blur="4px"
              >
                <BlogCard
                  title={post.metadata.title}
                  date={post.metadata.publishedAt}
                  href={localePath(`/blog/${post.slug}`, locale)}
                  image={post.metadata.image}
                  priority
                />
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 14} duration={0.3} yOffset={2} blur="3px">
            <div className="flex justify-center">
              <Button asChild variant="outline" size="sm">
                <Link href={localePath("/blog", locale)}>{s.viewAllPosts}</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {s.eventsBadge}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {s.eventsTitle}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {s.eventsBlurb(DATA.hackathons.length)}
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={t(project.title, locale) + t(project.dates, locale)}
                  delay={BLUR_FADE_DELAY * 17 + id * 0.05}
                >
                  <HackathonCard
                    title={t(project.title, locale)}
                    description={t(project.description, locale)}
                    location={project.location}
                    dates={t(project.dates, locale)}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 18}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                {s.contactBadge}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {s.contactTitle}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {s.contactBefore}{" "}
                <Link
                  href={`mailto:${DATA.contact.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {DATA.contact.email}
                </Link>{" "}
                {s.contactAfter}
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
