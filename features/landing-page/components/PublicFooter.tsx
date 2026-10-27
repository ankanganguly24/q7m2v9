import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LANDING_COPY } from "@/dummy/landing-content";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-landing-ink text-landing-paper/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 text-xs sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <span className="font-bold tracking-wide text-landing-paper">{LANDING_COPY.productName}</span>
        <Link className="inline-flex items-center gap-1.5 text-landing-paper transition-colors hover:text-landing-signal" href="/workspace">
          {LANDING_COPY.footerWorkspace}<ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </footer>
  );
}
