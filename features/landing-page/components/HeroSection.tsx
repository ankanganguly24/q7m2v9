import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { LANDING_COPY } from "@/dummy/landing-content";
import { ProductPreview } from "./ProductPreview";

export function HeroSection() {
  return (
    <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-20 lg:pt-28">
      <div className="relative z-10 lg:col-span-5">
        <p className="text-xs font-bold tracking-widest text-landing-signal">{LANDING_COPY.eyebrow}</p>
        <h1 className="mt-7 max-w-2xl font-display text-5xl font-bold leading-tight tracking-tight text-landing-paper sm:text-6xl lg:text-7xl">
          {LANDING_COPY.heroTitle}
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-landing-paper/70 sm:text-lg sm:leading-8">{LANDING_COPY.heroDescription}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link className="inline-flex min-h-12 items-center gap-2 bg-landing-paper px-5 text-sm font-semibold text-landing-ink transition-colors hover:bg-white" href="/workspace">
            {LANDING_COPY.primaryCta}<ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <a className="inline-flex min-h-12 items-center gap-2 border border-white/20 px-5 text-sm font-medium text-landing-paper transition-colors hover:bg-white/10" href="#how-it-works">
            {LANDING_COPY.secondaryCta}<ArrowDown aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
      <div className="relative lg:col-span-7" id="workspace-preview">
        <ProductPreview />
      </div>
    </section>
  );
}
