import { LANDING_COPY } from "@/dummy/landing-content";

export function ProblemSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-12" id="why-it-matters">
      <div className="lg:col-span-5">
        <p className="text-xs font-bold tracking-widest text-landing-signal-ink">{LANDING_COPY.problemEyebrow}</p>
        <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">{LANDING_COPY.problemTitle}</h2>
      </div>
      <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{LANDING_COPY.problemDescription}</p>
        <p className="mt-8 max-w-xl border-l-2 border-landing-signal-ink pl-5 font-display text-2xl font-semibold leading-snug text-foreground">{LANDING_COPY.problemCallout}</p>
      </div>
    </section>
  );
}
