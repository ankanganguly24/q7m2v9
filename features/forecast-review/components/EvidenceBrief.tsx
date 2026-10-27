import { ChartNoAxesCombined, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { COPY } from "@/dummy/copy";
import type { ForecastRevision } from "@/features/forecast-review/types";
import { formatClock, formatMw } from "@/features/forecast-review/utils/metrics";

interface EvidenceBriefProps {
  dayLabel: string;
  knowledgeTimeLabel: string;
  maeMw: number | null;
  biasMw: number | null;
  revisions: ForecastRevision[];
}

export function EvidenceBrief({ dayLabel, knowledgeTimeLabel, maeMw, biasMw, revisions }: EvidenceBriefProps) {
  const largestRevision = revisions[0];
  const hasMetrics = maeMw !== null && biasMw !== null;

  return (
    <Card className="border-accent/20">
      <CardHeader className="gap-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-sm bg-accent/10 text-accent"><ChartNoAxesCombined aria-hidden="true" className="size-4" /></span>
            <div>
              <p className="text-xs font-bold tracking-widest text-accent">{COPY.briefEyebrow}</p>
              <h2 className="mt-1 text-sm font-semibold text-foreground">{COPY.briefTitle}</h2>
            </div>
          </div>
          <Badge className="max-w-44 whitespace-normal text-right">{COPY.briefSimulationLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-foreground">
          {hasMetrics ? <>
            {COPY.briefPrefix} <strong className="font-mono font-semibold">{formatMw(maeMw)} {COPY.unitMw}</strong>. {COPY.briefBiasPrefix} <strong className="font-mono font-semibold">{formatMw(biasMw)} {COPY.unitMw}</strong>. {largestRevision ? <>{COPY.briefRevisionPrefix} <strong className="font-mono font-semibold">{formatMw(largestRevision.deltaMw)} {COPY.unitMw}</strong> {COPY.briefRevisionSuffix} <strong>{formatClock(largestRevision.startTime)} {COPY.dateSuffix}</strong>.</> : COPY.briefNoRevision}
          </> : COPY.briefUnavailable}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">{dayLabel} · {knowledgeTimeLabel}</p>
        <div className="mt-4 flex gap-2 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>{COPY.methodologyText}</p>
        </div>
      </CardContent>
    </Card>
  );
}
