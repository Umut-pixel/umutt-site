import { BlogShare } from "@/components/blog-share";
import BlurFade from "@/components/magicui/blur-fade";
import { TokenEfficiencyChart } from "@/components/token-efficiency-chart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { canonicalSlugs, getPost } from "@/data/blog";
import { LOCALES, dict, localePath, type Locale } from "@/data/i18n";
import { DATA } from "@/data/resume";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

const TOKEN_CHART_MARKER = "<p>The numbers back this up.";
const TOKEN_CHART_MARKER_TR = "<p>Rakamlar bunu doğruluyor.";

function formatHeaderDate(date: string, locale: Locale) {
  const value = date.includes("T") ? date : `${date}T00:00:00`;
  return new Date(value).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );
}

export async function generateStaticParams() {
  const slugs = canonicalSlugs(path.join(process.cwd(), "content"));
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: Locale };
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug, params.locale);
  if (!post) return undefined;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}${DATA.avatarUrl}`;
  const url = `${DATA.url}${localePath(`/blog/${post.slug}`, params.locale)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
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

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: Locale };
}) {
  const locale = params.locale;
  const post = await getPost(params.slug, locale);

  if (!post) {
    notFound();
  }

  const b = dict(locale).blog;
  const { metadata, source, slug } = post;
  const headerDate = formatHeaderDate(metadata.publishedAt, locale);
  const shareUrl = `${DATA.url}${localePath(`/blog/${slug}`, locale)}`;
  const showTokenChart = slug === "ai-shouldnt-be-the-center-of-your-product";
  const marker = locale === "tr" ? TOKEN_CHART_MARKER_TR : TOKEN_CHART_MARKER;
  const chartIndex = showTokenChart ? source.indexOf(marker) : -1;
  const contentBefore = chartIndex >= 0 ? source.slice(0, chartIndex) : source;
  const contentAfter = chartIndex >= 0 ? source.slice(chartIndex) : "";

  return (
    <article className="flex w-full min-w-0 flex-col">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: metadata.title,
            datePublished: metadata.publishedAt,
            dateModified: metadata.publishedAt,
            description: metadata.summary,
            inLanguage: locale,
            image: metadata.image
              ? `${DATA.url}${metadata.image}`
              : `${DATA.url}${DATA.avatarUrl}`,
            url: shareUrl,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      <BlurFade delay={0.06} duration={0.35} yOffset={4} blur="4px">
        <header className="mx-auto flex w-full max-w-[650px] flex-col items-center text-center">
          <p className="text-sm">
            <time
              dateTime={metadata.publishedAt}
              className="font-bold text-neutral-400 dark:text-neutral-400"
            >
              {headerDate}
            </time>
            {metadata.company && metadata.companyUrl ? (
              <>
                <span className="mx-1.5 text-neutral-500 dark:text-neutral-600">
                  |
                </span>
                <a
                  href={metadata.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-600 no-underline transition-colors hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400"
                >
                  {metadata.company}
                </a>
              </>
            ) : null}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tighter sm:text-5xl">
            {metadata.title}
          </h1>
        </header>
      </BlurFade>

      <div className="mx-auto mt-8 w-full min-w-0 max-w-[650px]">
        <Separator />
        <BlogShare title={metadata.title} url={shareUrl} label={b.share} />
      </div>

      <BlurFade delay={0.1} duration={0.35} yOffset={4} blur="4px">
        <div className="prose mx-auto mt-8 max-w-[650px] dark:prose-invert prose-p:leading-relaxed prose-headings:tracking-tight prose-a:text-blue-500">
          <div dangerouslySetInnerHTML={{ __html: contentBefore }} />
          {chartIndex >= 0 ? (
            <div className="not-prose">
              <TokenEfficiencyChart />
            </div>
          ) : null}
          {contentAfter ? (
            <div dangerouslySetInnerHTML={{ __html: contentAfter }} />
          ) : null}
        </div>
      </BlurFade>

      <div className="mx-auto mt-12 w-full max-w-[650px]">
        <Separator />
        <div className="pt-6">
          <Button asChild variant="outline" size="sm">
            <Link href={localePath("/blog", locale)}>
              <ArrowLeftIcon className="mr-1.5 size-3.5" />
              {b.allPosts}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
