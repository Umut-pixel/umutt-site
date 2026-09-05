"use client";

import { Button } from "@/components/ui/button";
import { localePath, stripLocale, type Locale } from "@/data/i18n";
import { LanguagesIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Swaps the locale prefix on the current path, so the toggle lands on the same
 * page in the other language instead of sending everyone back to the homepage.
 */
export function LocaleToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const { path } = stripLocale(pathname);
  const next: Locale = locale === "en" ? "tr" : "en";

  return (
    <Button variant="ghost" size="icon" className="size-12" asChild>
      <Link
        href={localePath(path, next)}
        hrefLang={next}
        aria-label={next === "tr" ? "Türkçe'ye geç" : "Switch to English"}
      >
        <LanguagesIcon className="size-4" />
        <span className="sr-only">{next.toUpperCase()}</span>
      </Link>
    </Button>
  );
}
