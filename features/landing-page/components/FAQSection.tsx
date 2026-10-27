import { ChevronDown } from "lucide-react";
import { LANDING_COPY, LANDING_FAQS } from "@/dummy/landing-content";

export function FAQSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-4">
        <p className="text-xs font-bold tracking-widest text-landing-signal-ink">{LANDING_COPY.faqEyebrow}</p>
        <h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">{LANDING_COPY.faqTitle}</h2>
      </div>
      <div className="divide-y divide-border border-y border-border lg:col-span-7 lg:col-start-6">
        {LANDING_FAQS.map((item) => (
          <details className="group py-5" key={item.question}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-bold text-foreground marker:hidden">
              {item.question}
              <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="max-w-2xl pt-4 pr-10 text-sm leading-6 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
