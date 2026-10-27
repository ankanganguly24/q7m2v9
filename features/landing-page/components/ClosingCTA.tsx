import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LANDING_COPY } from "@/dummy/landing-content";

export function ClosingCTA() {
  return (
    <section className="bg-landing-panel text-landing-paper">
      <div className="mx-auto grid max-w-7xl gap-9 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-end lg:px-12">
        <div className="lg:col-span-8">
          <p className="text-xs font-bold tracking-widest text-landing-signal">{LANDING_COPY.closingEyebrow}</p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{LANDING_COPY.closingTitle}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-landing-paper/70">{LANDING_COPY.closingDescription}</p>
        </div>
        <div className="lg:col-span-3 lg:col-start-10">
          <Link className="inline-flex min-h-12 items-center gap-2 bg-landing-paper px-5 text-sm font-semibold text-landing-ink transition-colors hover:bg-white" href="/workspace">
            {LANDING_COPY.primaryCta}<ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
