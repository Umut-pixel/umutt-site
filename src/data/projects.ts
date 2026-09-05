import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { markdownToHTML } from "@/data/blog";

export type ProjectChart =
  | {
      type: "bars";
      /** Insert the chart at the end of the `## <after>` section. */
      after?: string;
      title: string;
      description?: string;
      unit?: string;
      footnote?: string;
      rows: { label: string; value: number; note?: string }[];
    }
  | {
      type: "metrics";
      after?: string;
      title?: string;
      description?: string;
      metrics: {
        label: string;
        value: number;
        prefix?: string;
        suffix?: string;
        note?: string;
      }[];
    };

export type ProjectMetadata = {
  title: string;
  summary: string;
  dates: string;
  status?: string;
  image?: string;
  video?: string;
  technologies?: string[];
  website?: string;
  source?: string;
  chart?: ProjectChart;
};

export type ProjectDoc = {
  metadata: ProjectMetadata;
  slug: string;
  source: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, path.extname(file)));
}

export async function getProject(slug: string): Promise<ProjectDoc | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(raw);
  const source = await markdownToHTML(rawContent);

  return {
    slug,
    metadata: data as ProjectMetadata,
    source,
  };
}

/**
 * Split rendered HTML at the end of the `## <heading>` section so a chart can be
 * slotted into the narrative. Returns `[before, after]`; if the heading is not
 * found the whole document comes back as `before`.
 */
export function splitAtSectionEnd(
  html: string,
  heading?: string
): [string, string] {
  if (!heading) return [html, ""];

  const anchor = `<h2>${heading}</h2>`;
  const start = html.indexOf(anchor);
  if (start < 0) return [html, ""];

  const from = start + anchor.length;
  const next = html.indexOf("<h2", from);
  const cut = next < 0 ? html.length : next;

  return [html.slice(0, cut), html.slice(cut)];
}
