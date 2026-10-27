import { LANDING_COPY, LANDING_STEPS } from "@/dummy/landing-content";

export function WorkflowSection() {
  return (
    <section className="border-y border-landing-line bg-landing-ink text-landing-paper" id="how-it-works">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-widest text-landing-signal">{LANDING_COPY.workflowEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{LANDING_COPY.workflowTitle}</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-landing-paper/65 lg:col-span-4 lg:col-start-9">{LANDING_COPY.workflowDescription}</p>
        </div>
        <div className="mt-16 grid border-y border-white/15 md:grid-cols-3 md:divide-x md:divide-white/15">
          {LANDING_STEPS.map((step) => (
            <article className="py-7 md:px-7 md:py-9 first:md:pl-0 last:md:pr-0" key={step.number}>
              <p className="font-mono text-sm text-landing-signal">{step.number}</p>
              <h3 className="mt-7 font-display text-2xl font-semibold leading-tight">{step.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-landing-paper/65">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
