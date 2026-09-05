"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, Link2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

type BlogShareProps = {
  title: string;
  url: string;
  label?: string;
};

export function BlogShare({
  title,
  url,
  label = "Share the link",
}: BlogShareProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <p className="min-w-0 text-sm text-muted-foreground">
        Enjoyed this?{" "}
        <span className="text-foreground/80">{label}</span>
      </p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 shrink-0 gap-1.5 rounded-full px-3.5"
          >
            <Link2Icon className="size-3.5" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-3" sideOffset={8}>
          <p className="mb-2 text-xs text-muted-foreground">
            Share “{title}”
          </p>
          <p className="mb-3 truncate rounded-md border bg-muted/50 px-2.5 py-2 font-mono text-xs text-muted-foreground">
            {url}
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full gap-1.5"
            onClick={() => void copyLink()}
          >
            {copied ? (
              <>
                <CheckIcon className="size-3.5" />
                Copied
              </>
            ) : (
              <>
                <Link2Icon className="size-3.5" />
                Copy
              </>
            )}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
