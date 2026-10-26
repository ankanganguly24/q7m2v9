import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Compass, History, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductPreview } from "@/features/landing-page/components/ProductPreview";
import { LANDING_CAPABILITIES, LANDING_COPY, LANDING_STEPS } from "@/dummy/landing-content";

const CAPABILITY_ICONS = {
  history: History,
  measures: BarChart3,
  briefing: Compass,
} as const;

export function LandingPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link aria-label={LANDING_COPY.productName} className="inline-flex items-center gap-2.5" href="/">
            <span className="grid size-9 place-items-center rounded-sm bg-accent text-accent-foreground"><Wind aria-hidden="true" className="size-4" /></span>
            <span className="text-base font-bold tracking-tight">{LANDING_COPY.productName}</span>
          </Link>
          <nav aria-label={LANDING_COPY.productName} className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a className="transition hover:text-foreground" href="#why-it-matters">{LANDING_COPY.navWhy}</a>
            <a className="transition hover:text-foreground" href="#how-it-works">{LANDING_COPY.navHow}</a>
            <a className="transition hover:text-foreground" href="#workspace-preview">{LANDING_COPY.navWorkspace}</a>
          </nav>
          <Button asChild size="sm"><Link href="/workspace">{LANDING_COPY.openWorkspace}<ArrowRight aria-hidden="true" className="size-3.5" /></Link></Button>
        </div>
      </header>

      <section className="relative border-b border-border bg-surface">
        <div className="pointer-events-none absolute -right-36 -top-52 size-[560px] rounded-full border border-border/70" />
        <div className="pointer-events-none absolute -right-16 -top-32 size-[420px] rounded-full border border-border/70" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:px-12 lg:py-24">
          <div className="max-w-2xl">
            <Badge className="border-accent/20 bg-accent/5 text-accent">{LANDING_COPY.eyebrow}</Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tighter text-foreground sm:text-5xl lg:text-6xl">{LANDING_COPY.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{LANDING_COPY.heroDescription}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="default"><Link href="/workspace">{LANDING_COPY.primaryCta}<ArrowRight aria-hidden="true" className="size-4" /></Link></Button>
              <Button asChild size="default" variant="outline"><a href="#how-it-works">{LANDING_COPY.secondaryCta}<ArrowDown aria-hidden="true" className="size-4" /></a></Button>
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="grid size-8 place-items-center rounded-full border border-border"><Wind aria-hidden="true" className="size-4 text-accent" /></span>
              <span>{LANDING_COPY.footerNote}</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
            <div className="absolute -left-5 top-10 hidden h-24 w-1 rounded-full bg-positive/70 lg:block" />
            <div className="absolute -right-5 bottom-14 hidden h-32 w-1 rounded-full bg-accent/70 lg:block" />
            <div id="workspace-preview"><ProductPreview /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12" id="why-it-matters">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent">{LANDING_COPY.problemEyebrow}</p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{LANDING_COPY.problemTitle}</h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-base leading-7 text-muted-foreground">{LANDING_COPY.problemDescription}</p>
          <div className="mt-7 border-l-2 border-accent pl-5 text-lg font-medium leading-7 text-foreground">{LANDING_COPY.problemCallout}</div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/50" id="how-it-works">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-accent">{LANDING_COPY.workflowEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{LANDING_COPY.workflowTitle}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{LANDING_COPY.workflowDescription}</p>
          </div>
          <div className="mt-10 grid gap-0 border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
            {LANDING_STEPS.map((step) => (
              <article className="py-6 md:px-6 md:py-8 first:md:pl-0 last:md:pr-0" key={step.number}>
                <p className="font-mono text-sm font-medium text-accent">{step.number}</p>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-accent">{LANDING_COPY.capabilityEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{LANDING_COPY.capabilityTitle}</h2>
          </div>
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline" href="/workspace">{LANDING_COPY.openWorkspace}<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {LANDING_CAPABILITIES.map((capability) => {
            const Icon = CAPABILITY_ICONS[capability.id];
            return (
              <article className="border-t border-border pt-5" key={capability.id}>
                <Icon aria-hidden="true" className="size-5 text-accent" />
                <h3 className="mt-5 text-base font-semibold">{capability.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{capability.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 sm:py-16 md:flex-row md:items-end md:justify-between lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-accent-foreground/70">{LANDING_COPY.closingEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{LANDING_COPY.closingTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-accent-foreground/80 sm:text-base">{LANDING_COPY.closingDescription}</p>
          </div>
          <Button asChild className="bg-surface text-foreground hover:bg-background" variant="outline"><Link href="/workspace">{LANDING_COPY.primaryCta}<ArrowRight aria-hidden="true" className="size-4" /></Link></Button>
        </div>
      </section>

      <footer className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs text-background/70 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <span>{LANDING_COPY.productName} · {LANDING_COPY.footerNote}</span>
          <Link className="inline-flex items-center gap-1.5 text-background hover:underline" href="/workspace">{LANDING_COPY.footerWorkspace}<ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>
        </div>
      </footer>
    </main>
  );
}
