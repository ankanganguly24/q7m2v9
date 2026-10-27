import { BriefcaseBusiness, ChartNoAxesCombined, Wind } from "lucide-react";
import { LANDING_AUDIENCES, LANDING_COPY } from "@/dummy/landing-content";

const AUDIENCE_ICONS = [Wind, ChartNoAxesCombined, BriefcaseBusiness] as const;

export function AudienceSection() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-widest text-landing-signal-ink">{LANDING_COPY.audienceEyebrow}</p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">{LANDING_COPY.audienceTitle}</h2>
        </div>
        <div className="mt-14 grid gap-0 border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
          {LANDING_AUDIENCES.map((audience, index) => {
            const Icon = AUDIENCE_ICONS[index];
            return (
              <article className="py-8 md:px-8 first:md:pl-0 last:md:pr-0" key={audience.title}>
                <Icon aria-hidden="true" className="size-5 text-landing-signal-ink" />
                <h3 className="mt-6 text-lg font-bold tracking-tight text-foreground">{audience.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{audience.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
