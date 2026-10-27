import Link from "next/link";
import { ArrowUpRight, Wind } from "lucide-react";
import { LANDING_COPY } from "@/dummy/landing-content";

export function PublicHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link aria-label={LANDING_COPY.productName} className="inline-flex items-center gap-3" href="/">
          <Wind aria-hidden="true" className="size-5 text-landing-signal" />
          <span className="text-sm font-bold tracking-widest text-landing-paper">{LANDING_COPY.productName.toUpperCase()}</span>
        </Link>
        <nav aria-label={LANDING_COPY.productName} className="hidden items-center gap-9 text-sm text-landing-paper/70 md:flex">
          <a className="transition-colors hover:text-landing-paper" href="#why-it-matters">{LANDING_COPY.navWhy}</a>
          <a className="transition-colors hover:text-landing-paper" href="#how-it-works">{LANDING_COPY.navHow}</a>
          <a className="transition-colors hover:text-landing-paper" href="#platform">{LANDING_COPY.navWorkspace}</a>
        </nav>
        <Link className="inline-flex items-center gap-2 border border-white/25 px-4 py-2.5 text-sm font-medium text-landing-paper transition-colors hover:bg-white/10" href="/workspace">
          {LANDING_COPY.openWorkspace}<ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </header>
  );
}
