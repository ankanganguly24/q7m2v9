import { ArrowUpRight, BarChart3, FileCheck2, History, Layers3 } from "lucide-react";
import Link from "next/link";
import { LANDING_CAPABILITIES, LANDING_COPY } from "@/dummy/landing-content";

const CAPABILITY_ICONS = { history: History, measures: BarChart3, portfolio: Layers3, briefing: FileCheck2 } as const;

export function CapabilitySection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12" id="platform">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="text-xs font-bold tracking-widest text-landing-signal-ink">{LANDING_COPY.capabilityEyebrow}</p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">{LANDING_COPY.capabilityTitle}</h2>
        </div>
        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-landing-signal-ink/50 underline-offset-4 transition-colors hover:text-landing-signal-ink lg:col-span-3 lg:col-start-10" href="/workspace">
          {LANDING_COPY.openWorkspace}<ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <div className="mt-14 grid gap-8 border-t border-border sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {LANDING_CAPABILITIES.map((capability) => {
          const Icon = CAPABILITY_ICONS[capability.id];
          return (
            <article className="border-b border-border py-7 md:border-b-0" key={capability.id}>
              <Icon aria-hidden="true" className="size-5 text-landing-signal-ink" />
              <h3 className="mt-6 text-base font-bold tracking-tight text-foreground">{capability.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{capability.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
