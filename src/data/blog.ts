import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { DEFAULT_LOCALE, type Locale } from "@/data/i18n";

export type PostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  company?: string;
  companyUrl?: string;
};

export type PostListItem = {
  metadata: PostMetadata;
  slug: string;
};

export type Post = PostListItem & {
  source: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * A post lives at `<slug>.mdx` in English and `<slug>.tr.mdx` in Turkish, so
 * both languages share one slug and one URL shape. A missing translation falls
 * back to English rather than 404ing.
 */
export function localeFilePath(dir: string, slug: string, locale: Locale) {
  const translated = path.join(dir, `${slug}.${locale}.mdx`);
  if (locale !== DEFAULT_LOCALE && fs.existsSync(translated)) return translated;

  const base = path.join(dir, `${slug}.mdx`);
  return fs.existsSync(base) ? base : null;
}

/** Canonical slugs in a content dir, ignoring the `.<locale>.mdx` variants. */
export function canonicalSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const slugs = fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, ".mdx"))
    .map((name) => name.replace(/\.(en|tr)$/, ""));

  return Array.from(new Set(slugs));
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

/** Lightweight list — frontmatter only, no MDX compile. */
export async function getBlogPosts(
  locale: Locale = DEFAULT_LOCALE
): Promise<PostListItem[]> {
  return canonicalSlugs(CONTENT_DIR)
    .map((slug) => {
      const filePath = localeFilePath(CONTENT_DIR, slug, locale);
      if (!filePath) return null;

      const { data } = matter(fs.readFileSync(filePath, "utf-8"));
      return { slug, metadata: data as PostMetadata };
    })
    .filter((post): post is PostListItem => post !== null)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
}

export async function getPost(
  slug: string,
  locale: Locale = DEFAULT_LOCALE
): Promise<Post | null> {
  const filePath = localeFilePath(CONTENT_DIR, slug, locale);
  if (!filePath) return null;

  const { content: rawContent, data } = matter(
    fs.readFileSync(filePath, "utf-8")
  );

  return {
    slug,
    metadata: data as PostMetadata,
    source: await markdownToHTML(rawContent),
  };
}
