"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type BarRow = {
  label: string;
  value: number;
  note?: string;
};

type Props = {
  title: string;
  description?: string;
  unit?: string;
  rows: BarRow[];
  footnote?: string;
  className?: string;
};

/** Severity ramp: first row lightest, last row full strength. */
function opacityAt(index: number, count: number) {
  if (count <= 1) return 1;
  return 0.28 + (index / (count - 1)) * 0.72;
}

export function BarDistribution({
  title,
  description,
  unit,
  rows,
  footnote,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [fill, setFill] = useState(false);

  useEffect(() => {
    if (inView) {
      setFill(true);
      return;
    }

    // Safety net: never leave the chart empty if the viewport observer never
    // fires (hidden tab, unusual scroll container).
    const timer = setTimeout(() => setFill(true), 1500);
    return () => clearTimeout(timer);
  }, [inView]);

  const total = rows.reduce((sum, row) => sum + row.value, 0);
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <Card
      ref={ref}
      className={cn(
        "my-8 overflow-hidden border-neutral-200 bg-white text-neutral-950 shadow-none",
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100",
        className
      )}
    >
      <CardHeader className="space-y-1 p-5 pb-4 sm:p-6 sm:pb-5">
        <h3 className="text-base font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-lg">
          {title}
        </h3>
        {description ? (
          <p className="text-xs text-neutral-500">{description}</p>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
        {rows.map((row, i) => {
          const pct = total > 0 ? (row.value / total) * 100 : 0;
          const width = (row.value / max) * 100;

          return (
            <div key={row.label} className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium text-neutral-950 dark:text-white">
                  {row.label}
                </span>
                <span className="text-xs tabular-nums text-neutral-500">
                  <span className="font-medium text-neutral-950 dark:text-white">
                    {row.value.toLocaleString("en-US")}
                  </span>
                  <span className="ml-1.5">{pct.toFixed(1)}%</span>
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900">
                <div
                  className={cn(
                    "h-full rounded-full bg-neutral-950 dark:bg-white",
                    !reduceMotion &&
                      "transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  )}
                  style={{
                    opacity: opacityAt(i, rows.length),
                    // Width is driven by state, not by an animation frame loop, so
                    // the bar still lands on the right value if the transition is
                    // skipped (reduced motion, background tab, no compositor).
                    width: reduceMotion || fill ? `${width}%` : "0%",
                    transitionDelay: reduceMotion ? undefined : `${i * 80}ms`,
                  }}
                />
              </div>

              {row.note ? (
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                  {row.note}
                </p>
              ) : null}
            </div>
          );
        })}
      </CardContent>

      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

      <div className="flex items-baseline justify-between gap-4 px-5 py-4 sm:px-6">
        <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">
          Total
        </p>
        <p className="text-sm font-semibold tabular-nums tracking-tight text-neutral-950 dark:text-white">
          {total.toLocaleString("en-US")}
          {unit ? (
            <span className="ml-1.5 text-xs font-normal text-neutral-500">
              {unit}
            </span>
          ) : null}
        </p>
      </div>

      {footnote ? (
        <>
          <Separator className="bg-neutral-200 dark:bg-neutral-800" />
          <p className="px-5 py-3 text-[11px] text-neutral-500 sm:px-6">
            {footnote}
          </p>
        </>
      ) : null}
    </Card>
  );
}
