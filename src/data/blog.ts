import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

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

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readFrontmatter(slug: string): PostListItem | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(source);

  return {
    slug,
    metadata: data as PostMetadata,
  };
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
export async function getBlogPosts(): Promise<PostListItem[]> {
  const files = getMDXFiles(CONTENT_DIR);

  return files
    .map((file) => {
      const slug = path.basename(file, path.extname(file));
      return readFrontmatter(slug);
    })
    .filter((post): post is PostListItem => post !== null)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(raw);
  const source = await markdownToHTML(rawContent);

  return {
    slug,
    metadata: data as PostMetadata,
    source,
  };
}
