import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { COPY } from "@/dummy/copy";

export interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  unit?: string;
  icon: LucideIcon;
}

export function MetricCard({ label, value, description, unit = COPY.unitMw, icon: Icon }: MetricCardProps) {
  return (
    <Card className="min-w-0 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold tracking-tight tabular-nums text-foreground sm:text-3xl">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
    </Card>
  );
}
