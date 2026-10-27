import { ArrowRight, BrainCircuit, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { LANDING_COPY } from "@/dummy/landing-content";

export function AiSection() {
  return (
    <section className="bg-landing-ink text-landing-paper">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-12 lg:items-center lg:px-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-bold tracking-widest text-landing-signal">{LANDING_COPY.aiEyebrow}</p>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{LANDING_COPY.aiTitle}</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-landing-paper/70">{LANDING_COPY.aiDescription}</p>
          <Link className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-landing-signal transition-colors hover:text-landing-paper" href="/workspace/forecast-review">
            {LANDING_COPY.aiAction}<ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border border-landing-line bg-landing-panel p-5 sm:p-7">
            <div className="flex items-center gap-3 border-b border-landing-line pb-4">
              <span className="grid size-9 place-items-center bg-landing-signal text-landing-signal-ink"><BrainCircuit aria-hidden="true" className="size-5" /></span>
              <div>
                <p className="text-sm font-bold">{LANDING_COPY.aiAnswerTitle}</p>
                <p className="mt-0.5 text-xs text-landing-paper/55">{LANDING_COPY.aiEvidence}</p>
              </div>
              <Sparkles aria-hidden="true" className="ml-auto size-4 text-landing-signal" />
            </div>
            <div className="mt-5 max-w-lg rounded-sm border border-landing-line bg-landing-ink p-4 text-sm leading-6 text-landing-paper/80">
              {LANDING_COPY.aiPrompt}
            </div>
            <div className="mt-5 flex gap-3">
              <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-landing-signal" />
              <p className="text-sm leading-6 text-landing-paper/75">{LANDING_COPY.aiAnswer}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-landing-line pt-4">
              <span className="rounded-sm border border-landing-line px-2.5 py-1 text-xs text-landing-paper/60">{LANDING_COPY.previewContext}</span>
              <span className="rounded-sm border border-landing-line px-2.5 py-1 text-xs text-landing-paper/60">{LANDING_COPY.previewLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
