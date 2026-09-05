import { BarDistribution } from "@/components/charts/bar-distribution";
import { MetricStats } from "@/components/charts/metric-stats";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LOCALES, dict, localePath, type Locale } from "@/data/i18n";
import {
  getProject,
  getProjectSlugs,
  splitAtSectionEnd,
  type ProjectChart,
} from "@/data/projects";
import { DATA } from "@/data/resume";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

function renderChart(chart: ProjectChart) {
  if (chart.type === "bars") {
    return (
      <BarDistribution
        title={chart.title}
        description={chart.description}
        unit={chart.unit}
        rows={chart.rows}
        footnote={chart.footnote}
      />
    );
  }

  return (
    <MetricStats
      title={chart.title}
      description={chart.description}
      metrics={chart.metrics}
    />
  );
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: Locale };
}): Promise<Metadata | undefined> {
  const project = await getProject(params.slug, params.locale);
  if (!project) return undefined;

  const { title, summary: description, image } = project.metadata;
  const ogImage = `${DATA.url}${image || DATA.avatarUrl}`;
  const url = `${DATA.url}${localePath(
    `/projects/${project.slug}`,
    params.locale
  )}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string; locale: Locale };
}) {
  const locale = params.locale;
  const project = await getProject(params.slug, locale);

  if (!project) {
    notFound();
  }

  const p = dict(locale).project;
  const { metadata, source } = project;
  const { title, summary, dates, status, technologies } = metadata;
  const hasLinks = Boolean(metadata.website || metadata.source);
  const chart = metadata.chart;
  const [contentBefore, contentAfter] = splitAtSectionEnd(source, chart?.after);

  return (
    <article className="flex w-full min-w-0 flex-col">
      <BlurFade delay={0.06} duration={0.35} yOffset={4} blur="4px">
        <header className="mx-auto flex w-full max-w-[650px] flex-col items-center text-center">
          <p className="text-sm">
            <time className="font-bold text-neutral-400 dark:text-neutral-400">
              {dates}
            </time>
            {status ? (
              <>
                <span className="mx-1.5 text-neutral-500 dark:text-neutral-600">
                  |
                </span>
                <span className="font-medium text-neutral-600 dark:text-neutral-500">
                  {status}
                </span>
              </>
            ) : null}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tighter sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-muted-foreground">{summary}</p>

          {technologies && technologies.length > 0 ? (
            <div className="mt-5 flex flex-wrap justify-center gap-1">
              {technologies.map((tech) => (
                <Badge
                  className="px-1 py-0 text-[10px]"
                  variant="secondary"
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          ) : null}

          {hasLinks ? (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {metadata.website ? (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={metadata.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.visitWebsite}
                  </a>
                </Button>
              ) : null}
              {metadata.source ? (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={metadata.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.source}
                  </a>
                </Button>
              ) : null}
            </div>
          ) : null}
        </header>
      </BlurFade>

      <div className="mx-auto mt-10 w-full min-w-0 max-w-[650px]">
        <Separator />
      </div>

      <BlurFade delay={0.1} duration={0.35} yOffset={4} blur="4px">
        <div className="prose mx-auto mt-8 max-w-[650px] dark:prose-invert prose-p:leading-relaxed prose-headings:tracking-tight prose-a:text-blue-500">
          <div dangerouslySetInnerHTML={{ __html: contentBefore }} />
          {chart ? <div className="not-prose">{renderChart(chart)}</div> : null}
          {contentAfter ? (
            <div dangerouslySetInnerHTML={{ __html: contentAfter }} />
          ) : null}
        </div>
      </BlurFade>

      <div className="mx-auto mt-12 w-full max-w-[650px]">
        <Separator />
        <div className="pt-6">
          <Button asChild variant="outline" size="sm">
            <Link href={localePath("/#projects", locale)}>
              <ArrowLeftIcon className="mr-1.5 size-3.5" />
              {p.allProjects}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
