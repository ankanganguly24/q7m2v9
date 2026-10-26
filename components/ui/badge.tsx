import type { HTMLAttributes } from "react";
import { cn } from "@/components/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-sm border border-border px-2 py-1 text-xs font-semibold tracking-wide text-muted-foreground", className)} {...props} />;
}
