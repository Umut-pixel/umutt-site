import { BlogCard } from "@/components/blog-card";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts } from "@/data/blog";
import { dict, localePath, type Locale } from "@/data/i18n";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const b = dict(params.locale).blog;
  return { title: b.badge, description: b.metaDescription };
}

export default async function BlogPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const b = dict(locale).blog;
  const nav = dict(locale).nav;
  const posts = await getBlogPosts(locale);

  return (
    <main className="flex flex-col space-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 w-fit text-muted-foreground"
        >
          <Link href={localePath("/", locale)}>
            <ArrowLeftIcon className="mr-1.5 size-3.5" />
            {nav.home}
          </Link>
        </Button>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="space-y-3">
          <Badge className="rounded-lg px-3 py-1 text-sm font-normal">
            {b.badge}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {b.title}
          </h1>
          <p className="max-w-xl text-muted-foreground md:text-lg/relaxed">
            {b.blurb}
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <Separator />
      </BlurFade>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post, id) => (
          <BlurFade
            key={post.slug}
            delay={BLUR_FADE_DELAY * 4 + id * 0.04}
            duration={0.35}
            yOffset={4}
            blur="4px"
          >
            <BlogCard
              title={post.metadata.title}
              summary={post.metadata.summary}
              date={post.metadata.publishedAt}
              href={localePath(`/blog/${post.slug}`, locale)}
              image={post.metadata.image}
              priority={id < 2}
              showSummary
            />
          </BlurFade>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">{b.empty}</p>
      ) : null}
    </main>
  );
}
