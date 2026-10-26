import { ArrowDownRight, ArrowUpRight, History } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { COPY } from "@/dummy/copy";
import { REVISION_PREVIEW_LIMIT } from "@/dummy/options";
import type { ForecastRevision } from "@/features/forecast-review/types";
import { formatClock, formatMw } from "@/features/forecast-review/utils/metrics";

interface RevisionHistoryProps {
  revisions: ForecastRevision[];
}

export function RevisionHistory({ revisions }: RevisionHistoryProps) {
  const preview = revisions.slice(0, REVISION_PREVIEW_LIMIT);

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between border-b border-border">
        <div>
          <div className="flex items-center gap-2"><History aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-sm font-semibold text-foreground">{COPY.revisionTitle}</h2></div>
          <p className="mt-1 text-xs text-muted-foreground">{COPY.revisionSubtitle}</p>
        </div>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">{revisions.length}</span>
      </CardHeader>
      <CardContent className="p-0">
        {preview.length === 0 ? <p className="p-5 text-sm text-muted-foreground">{COPY.noRevisions}</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-xs">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">{COPY.revisionInterval}</th>
                  <th className="px-3 py-3 text-right font-semibold">{COPY.revisionPrevious}</th>
                  <th className="px-3 py-3 text-right font-semibold">{COPY.revisionCurrent}</th>
                  <th className="px-5 py-3 text-right font-semibold">{COPY.revisionChange}</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((revision) => {
                  const isIncrease = revision.deltaMw >= 0;
                  const RevisionIcon = isIncrease ? ArrowUpRight : ArrowDownRight;
                  return (
                    <tr className="border-t border-border tabular-nums" key={`${revision.startTime}-${revision.currentPublishTime}`}>
                      <th className="px-5 py-3 font-medium text-foreground">{formatClock(revision.startTime)} {COPY.dateSuffix}</th>
                      <td className="px-3 py-3 text-right font-mono text-muted-foreground">{formatMw(revision.previousMw)} {COPY.unitMw}</td>
                      <td className="px-3 py-3 text-right font-mono text-foreground">{formatMw(revision.currentMw)} {COPY.unitMw}</td>
                      <td className={`px-5 py-3 text-right font-mono ${isIncrease ? "text-positive" : "text-warning"}`}>
                        <span className="inline-flex items-center justify-end gap-1"><RevisionIcon aria-hidden="true" className="size-3.5" />{formatMw(revision.deltaMw)} {COPY.unitMw}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
