import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/components/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <span className="relative block">
      <select className={cn("h-10 w-full appearance-none rounded-sm border border-border bg-surface px-3 pr-9 text-sm font-medium text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </span>
  );
}
