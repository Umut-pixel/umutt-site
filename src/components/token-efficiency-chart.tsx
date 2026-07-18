"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type MonthPoint = {
  month: string;
  label: string;
  tokensPerReq: number;
  requests: number;
  models: number;
};

/** Source: Celixion model-usage export (Oct ’25 – Jul ’26). */
const DATA: MonthPoint[] = [
  { month: "Oct ’25", label: "OCT", tokensPerReq: 1119, requests: 2616, models: 7 },
  { month: "Nov ’25", label: "NOV", tokensPerReq: 996, requests: 4926, models: 3 },
  { month: "Dec ’25", label: "DEC", tokensPerReq: 2096, requests: 2026, models: 3 },
  { month: "Jan ’26", label: "JAN", tokensPerReq: 3024, requests: 3702, models: 3 },
  { month: "Feb ’26", label: "FEB", tokensPerReq: 7188, requests: 3355, models: 3 },
  { month: "Mar ’26", label: "MAR", tokensPerReq: 8192, requests: 2061, models: 1 },
  { month: "Apr ’26", label: "APR", tokensPerReq: 8687, requests: 3311, models: 1 },
  { month: "May ’26", label: "MAY", tokensPerReq: 5324, requests: 9862, models: 1 },
  { month: "Jul ’26", label: "JUL", tokensPerReq: 1081, requests: 40103, models: 1 },
];

const W = 640;
const H = 280;
const PAD = { top: 16, right: 52, bottom: 36, left: 48 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;

const maxTokens = 10000;
const maxRequests = 45000;

const SPRING = { stiffness: 220, damping: 34, mass: 0.55 };

function xAt(i: number) {
  return PAD.left + (i / (DATA.length - 1)) * innerW;
}

function yTokens(v: number) {
  return PAD.top + innerH - (v / maxTokens) * innerH;
}

function yRequests(v: number) {
  return PAD.top + innerH - (v / maxRequests) * innerH;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sampleAtX(svgX: number) {
  const clamped = Math.max(PAD.left, Math.min(PAD.left + innerW, svgX));
  const f = ((clamped - PAD.left) / innerW) * (DATA.length - 1);
  const i = Math.floor(f);
  const j = Math.min(DATA.length - 1, i + 1);
  const t = f - i;
  const nearest = Math.round(f);
  return {
    x: clamped,
    tokens: lerp(DATA[i].tokensPerReq, DATA[j].tokensPerReq, t),
    requests: lerp(DATA[i].requests, DATA[j].requests, t),
    nearest,
    point: DATA[nearest],
  };
}

function linePath(values: number[], yFn: (v: number) => number) {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yFn(v).toFixed(1)}`)
    .join(" ");
}

function areaPath(values: number[], yFn: (v: number) => number) {
  const top = linePath(values, yFn);
  const lastX = xAt(values.length - 1);
  const firstX = xAt(0);
  const base = PAD.top + innerH;
  return `${top} L ${lastX.toFixed(1)} ${base} L ${firstX.toFixed(1)} ${base} Z`;
}

const tokenPath = linePath(
  DATA.map((d) => d.tokensPerReq),
  yTokens
);
const requestArea = areaPath(
  DATA.map((d) => d.requests),
  yRequests
);
const requestPath = linePath(
  DATA.map((d) => d.requests),
  yRequests
);

const last = DATA[DATA.length - 1];

export function TokenEfficiencyChart({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const active = reduceMotion || inView;

  const [hovering, setHovering] = useState(false);
  const [tip, setTip] = useState({
    month: last.month,
    tokens: last.tokensPerReq,
    requests: last.requests,
    models: last.models,
    nearest: DATA.length - 1,
  });

  const rawX = useMotionValue(xAt(DATA.length - 1));
  const rawTokenY = useMotionValue(yTokens(last.tokensPerReq));
  const rawRequestY = useMotionValue(yRequests(last.requests));
  const rawOpacity = useMotionValue(0);

  const hoverX = useSpring(rawX, SPRING);
  const tokenY = useSpring(rawTokenY, SPRING);
  const requestY = useSpring(rawRequestY, SPRING);
  const guideOpacity = useSpring(rawOpacity, {
    stiffness: 180,
    damping: 28,
    mass: 0.5,
  });

  const tipLeft = useTransform(hoverX, (x) => {
    const pct = (x / W) * 100;
    return `clamp(90px, ${pct}%, calc(100% - 90px))`;
  });

  const onMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * W;
      if (svgX < PAD.left - 8 || svgX > PAD.left + innerW + 8) return;

      const sample = sampleAtX(svgX);
      rawX.set(sample.x);
      rawTokenY.set(yTokens(sample.tokens));
      rawRequestY.set(yRequests(sample.requests));
      rawOpacity.set(1);
      setHovering(true);
      setTip({
        month: sample.point.month,
        tokens: sample.point.tokensPerReq,
        requests: sample.point.requests,
        models: sample.point.models,
        nearest: sample.nearest,
      });
    },
    [rawOpacity, rawRequestY, rawTokenY, rawX]
  );

  const onLeave = useCallback(() => {
    setHovering(false);
    rawOpacity.set(0);
  }, [rawOpacity]);

  useEffect(() => {
    if (!hovering && active) {
      rawX.set(xAt(DATA.length - 1));
      rawTokenY.set(yTokens(last.tokensPerReq));
      rawRequestY.set(yRequests(last.requests));
    }
  }, [active, hovering, rawRequestY, rawTokenY, rawX]);

  return (
    <Card
      ref={ref}
      className={cn(
        "my-8 overflow-hidden border-neutral-200 bg-white text-neutral-950 shadow-none",
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100",
        className
      )}
    >
      <CardHeader className="space-y-3 p-5 pb-3 sm:p-6 sm:pb-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-lg">
            Same workload, a fraction of the tokens.
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Avg. tokens per request / monthly request volume
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
          <span className="inline-flex items-center gap-1.5 text-neutral-950 dark:text-white">
            <span className="size-2 rounded-full bg-neutral-950 dark:bg-white" />
            Tokens / request
          </span>
          <span className="inline-flex items-center gap-1.5 text-neutral-500">
            <span className="size-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
            Request volume
          </span>
        </div>
      </CardHeader>

      <CardContent className="relative px-2 pb-2 sm:px-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full cursor-crosshair touch-none"
          role="img"
          aria-label="Celixion token efficiency chart from October 2025 to July 2026"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = PAD.top + innerH * (1 - t);
            return (
              <line
                key={t}
                x1={PAD.left}
                x2={PAD.left + innerW}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-neutral-200 dark:text-neutral-800"
                strokeWidth={1}
              />
            );
          })}

          <line
            x1={PAD.left}
            x2={PAD.left}
            y1={PAD.top}
            y2={PAD.top + innerH}
            stroke="currentColor"
            className="text-neutral-300 dark:text-neutral-600"
            strokeWidth={1}
          />
          <line
            x1={PAD.left}
            x2={PAD.left + innerW}
            y1={PAD.top + innerH}
            y2={PAD.top + innerH}
            stroke="currentColor"
            className="text-neutral-300 dark:text-neutral-600"
            strokeWidth={1}
          />

          {[0, 2500, 5000, 7500, 10000].map((v) => (
            <text
              key={v}
              x={PAD.left - 8}
              y={yTokens(v) + 3}
              textAnchor="end"
              className="fill-neutral-400 text-[10px] dark:fill-neutral-500"
            >
              {v === 0 ? "0" : `${v / 1000}k`}
            </text>
          ))}

          {[0, 15000, 30000, 45000].map((v) => (
            <text
              key={v}
              x={PAD.left + innerW + 8}
              y={yRequests(v) + 3}
              textAnchor="start"
              className="fill-neutral-400 text-[10px] dark:fill-neutral-500"
            >
              {v === 0 ? "0" : `${v / 1000}k`}
            </text>
          ))}

          <motion.path
            d={requestArea}
            className="pointer-events-none fill-neutral-950/[0.04] dark:fill-white/[0.06]"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.85 }}
          />

          <motion.path
            d={requestPath}
            fill="none"
            stroke="currentColor"
            className="pointer-events-none text-neutral-400 dark:text-neutral-500"
            strokeWidth={1.75}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={
              active
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0.4 }
            }
            transition={{
              pathLength: {
                duration: reduceMotion ? 0 : 1.35,
                ease: [0.22, 1, 0.36, 1],
                delay: reduceMotion ? 0 : 0.1,
              },
              opacity: { duration: 0.2 },
            }}
          />

          <motion.path
            d={tokenPath}
            fill="none"
            stroke="currentColor"
            className="pointer-events-none text-neutral-950 dark:text-white"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={
              active
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0.4 }
            }
            transition={{
              pathLength: {
                duration: reduceMotion ? 0 : 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: reduceMotion ? 0 : 0.25,
              },
              opacity: { duration: 0.2 },
            }}
          />

          <motion.g style={{ opacity: guideOpacity }} className="pointer-events-none">
            <motion.line
              x1={hoverX}
              x2={hoverX}
              y1={PAD.top}
              y2={PAD.top + innerH}
              stroke="currentColor"
              className="text-neutral-400 dark:text-neutral-500"
              strokeWidth={1}
              strokeDasharray="2 4"
            />
            <motion.circle
              cx={hoverX}
              cy={tokenY}
              r={5}
              className="fill-white stroke-neutral-950 dark:fill-neutral-950 dark:stroke-white"
              strokeWidth={2}
            />
            <motion.circle
              cx={hoverX}
              cy={requestY}
              r={4.5}
              className="fill-white stroke-neutral-400 dark:fill-neutral-950 dark:stroke-neutral-400"
              strokeWidth={1.75}
            />
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={
              active && !hovering ? { opacity: 1 } : { opacity: hovering ? 0 : 0 }
            }
            transition={{
              duration: 0.35,
              delay: hovering ? 0 : reduceMotion ? 0 : 1.55,
            }}
            className="pointer-events-none"
          >
            <circle
              cx={xAt(DATA.length - 1)}
              cy={yTokens(last.tokensPerReq)}
              r={3.5}
              className="fill-neutral-950 dark:fill-white"
            />
            <circle
              cx={xAt(DATA.length - 1)}
              cy={yRequests(last.requests)}
              r={3.5}
              className="fill-neutral-400 dark:fill-neutral-500"
            />
            <text
              x={xAt(DATA.length - 1) - 6}
              y={yTokens(last.tokensPerReq) - 10}
              textAnchor="end"
              className="fill-neutral-950 text-[10px] font-medium dark:fill-white"
            >
              {last.tokensPerReq.toLocaleString("en-US")} tok/req
            </text>
            <text
              x={xAt(DATA.length - 1) - 6}
              y={yRequests(last.requests) - 10}
              textAnchor="end"
              className="fill-neutral-400 text-[10px] font-medium dark:fill-neutral-500"
            >
              {last.requests.toLocaleString("en-US")} req
            </text>
          </motion.g>

          {DATA.map((d, i) => (
            <text
              key={d.label}
              x={xAt(i)}
              y={PAD.top + innerH + 20}
              textAnchor="middle"
              className={cn(
                "pointer-events-none text-[10px] transition-colors duration-300",
                hovering && tip.nearest === i
                  ? "fill-neutral-950 dark:fill-white"
                  : "fill-neutral-400 dark:fill-neutral-500"
              )}
            >
              {d.label}
            </text>
          ))}
        </svg>

        <motion.div
          className={cn(
            "pointer-events-none absolute top-3 z-10 w-[170px] -translate-x-1/2 rounded-xl px-3 py-2.5",
            "border border-neutral-200/60 bg-white/45 shadow-lg shadow-neutral-950/5",
            "backdrop-blur-xl backdrop-saturate-150",
            "dark:border-white/10 dark:bg-neutral-950/35 dark:shadow-black/20"
          )}
          style={{ left: tipLeft, opacity: guideOpacity }}
        >
          <p className="mb-2 text-[11px] font-medium tracking-wide text-neutral-950 dark:text-white">
            {tip.month}
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-neutral-500">
                <span className="size-1.5 rounded-full bg-neutral-950 dark:bg-white" />
                Tokens / req
              </span>
              <span className="font-medium tabular-nums text-neutral-950 dark:text-white">
                {tip.tokens.toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-neutral-500">
                <span className="size-1.5 rounded-full bg-neutral-400" />
                Requests
              </span>
              <span className="font-medium tabular-nums text-neutral-700 dark:text-neutral-300">
                {tip.requests.toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-neutral-400 dark:text-neutral-600">Models</span>
              <span className="tabular-nums text-neutral-500">{tip.models}</span>
            </div>
          </div>
        </motion.div>
      </CardContent>

      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

      <motion.div
        className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 sm:p-6"
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.45, delay: reduceMotion ? 0 : 1.65 }}
      >
        <div>
          <p className="text-[10px] tracking-[0.12em] text-neutral-500">
            TOKENS / REQUEST
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            → 1,081
          </p>
          <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-300">
            –87.6% · May–Jul 2026
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.12em] text-neutral-500">
            REQUEST VOLUME
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
            → 40,103
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">12.1× · same window</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.12em] text-neutral-400 dark:text-neutral-600">
            MODELS IN ROTATION
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
            → 1
          </p>
          <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-600">
            consolidated by Mar 2026
          </p>
        </div>
      </motion.div>
    </Card>
  );
}
