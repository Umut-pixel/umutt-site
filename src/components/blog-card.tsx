import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  title: string;
  summary?: string;
  date: string;
  href: string;
  image?: string;
  priority?: boolean;
  className?: string;
  /** Show summary under the title */
  showSummary?: boolean;
};

export function BlogCard({
  title,
  summary,
  date,
  href,
  image,
  priority = false,
  className,
  showSummary = false,
}: BlogCardProps) {
  return (
    <Link href={href} className={cn("group block h-full", className)}>
      <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
        {image ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              sizes="(max-width: 640px) 92vw, 380px"
              quality={85}
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="aspect-square w-full rounded-xl bg-muted" />
        )}
        <CardHeader className="space-y-1 px-0 pt-3 pb-0">
          <CardTitle className="text-base font-medium leading-snug tracking-tight">
            {title}
          </CardTitle>
          {showSummary && summary ? (
            <CardDescription className="line-clamp-2 text-sm">
              {summary}
            </CardDescription>
          ) : null}
          <time
            dateTime={date}
            className="text-xs text-muted-foreground font-normal"
          >
            {date}
          </time>
        </CardHeader>
      </Card>
    </Link>
  );
}
