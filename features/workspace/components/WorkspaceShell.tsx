"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, Database, Home, Wind } from "lucide-react";
import { WORKSPACE_COPY, WORKSPACE_NAVIGATION } from "@/dummy/workspace-content";

const NAVIGATION_ICONS = {
  home: Home,
  chart: BarChart3,
  activity: Activity,
  database: Database,
} as const;

interface WorkspaceShellProps {
  children: React.ReactNode;
}

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-surface px-4 sm:px-6">
        <Link aria-label={WORKSPACE_COPY.backToLanding} className="flex items-center gap-3" href="/">
          <span className="grid size-8 place-items-center rounded-sm bg-accent text-accent-foreground"><Wind aria-hidden="true" className="size-4" /></span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-foreground">{WORKSPACE_COPY.productName}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">{WORKSPACE_COPY.workspaceTitle}</span>
          </span>
        </Link>
        <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span aria-hidden="true" className="size-1.5 rounded-full bg-positive" />{WORKSPACE_COPY.marketLabel}</span>
        <span className="rounded-sm border border-warning/30 bg-warning/5 px-2 py-1 text-xs font-semibold text-warning">{WORKSPACE_COPY.localDemo}</span>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col border-r border-border bg-surface px-3 py-5 md:flex">
          <p className="px-3 pb-3 text-xs font-bold tracking-widest text-muted-foreground">{WORKSPACE_COPY.workspaceTitle}</p>
          <nav aria-label={WORKSPACE_COPY.navigationLabel} className="grid gap-1">
            {WORKSPACE_NAVIGATION.map((item) => {
              const Icon = NAVIGATION_ICONS[item.icon];
              const isActive = pathname === item.href || (item.href !== "/workspace" && pathname.startsWith(`${item.href}/`));
              return (
                <Link aria-current={isActive ? "page" : undefined} className={`inline-flex h-9 items-center gap-2 rounded-sm px-3 text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`} href={item.href} key={item.id}>
                  <Icon aria-hidden="true" className="size-4" />{item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-sm border border-border bg-background p-3">
            <p className="text-xs font-semibold text-foreground">{WORKSPACE_COPY.sourcePanelTitle}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{WORKSPACE_COPY.sourceForecast}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{WORKSPACE_COPY.sourceActual}</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <nav aria-label={WORKSPACE_COPY.navigationLabel} className="flex gap-1 overflow-x-auto border-b border-border bg-surface px-3 py-2 md:hidden">
            {WORKSPACE_NAVIGATION.map((item) => {
              const Icon = NAVIGATION_ICONS[item.icon];
              const isActive = pathname === item.href || (item.href !== "/workspace" && pathname.startsWith(`${item.href}/`));
              return (
                <Link aria-current={isActive ? "page" : undefined} className={`inline-flex shrink-0 items-center gap-1.5 rounded-sm px-3 py-2 text-xs font-medium ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`} href={item.href} key={item.id}>
                  <Icon aria-hidden="true" className="size-3.5" />{item.label}
                </Link>
              );
            })}
          </nav>
          <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
