"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type Metric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  note?: string;
};

type Props = {
  title?: string;
  description?: string;
  metrics: Metric[];
  className?: string;
};

export function MetricStats({
  title,
  description,
  metrics,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView) {
      setRevealed(true);
      return;
    }

    // Safety net: never hold the tiles back if the viewport observer never
    // fires (hidden tab, unusual scroll container).
    const timer = setTimeout(() => setRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, [inView]);

  const shown = reduceMotion || revealed;

  return (
    <Card
      ref={ref}
      className={cn(
        "my-8 overflow-hidden border-neutral-200 bg-white text-neutral-950 shadow-none",
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100",
        className
      )}
    >
      {title || description ? (
        <div className="space-y-1 p-5 pb-0 sm:p-6 sm:pb-0">
          {title ? (
            <h3 className="text-base font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-lg">
              {title}
            </h3>
          ) : null}
          {description ? (
            <p className="text-xs text-neutral-500">{description}</p>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 sm:p-6">
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={cn(
              !reduceMotion &&
                "transition-[opacity,transform] duration-500 ease-out"
            )}
            style={{
              // The number itself is plain text, never driven by an animation
              // frame loop — a skipped transition can dim a tile, but it can
              // never show a wrong figure.
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(6px)",
              transitionDelay: reduceMotion ? undefined : `${i * 70}ms`,
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">
              {metric.label}
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-neutral-950 dark:text-white">
              {metric.prefix}
              {metric.value.toLocaleString("en-US")}
              {metric.suffix}
            </p>
            {metric.note ? (
              <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-neutral-500">
                {metric.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
