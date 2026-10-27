import { AlertTriangle, Database, FileClock, Rows3 } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { WORKSPACE_COPY, SOURCE_FIELDS } from "@/dummy/workspace-content";

export function DataSourcesPage() {
  return (
    <div className="grid gap-6">
      <header className="border-b border-border pb-6">
        <p className="text-xs font-bold tracking-widest text-accent">{WORKSPACE_COPY.sourcesEyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{WORKSPACE_COPY.sourcesTitle}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{WORKSPACE_COPY.sourcesDescription}</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <InfoCard icon={FileClock} title={WORKSPACE_COPY.sourcesCoverageTitle} value={WORKSPACE_COPY.sourcesCoverageBody} />
        <InfoCard icon={Rows3} title={WORKSPACE_COPY.sourcesForecastCount} value={WORKSPACE_COPY.sourceLabelForecast} detail={WORKSPACE_COPY.sourceForecast} />
        <InfoCard icon={Database} title={WORKSPACE_COPY.sourcesActualCount} value={WORKSPACE_COPY.sourceLabelActual} detail={WORKSPACE_COPY.sourceActual} />
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">{WORKSPACE_COPY.sourcesFieldTitle}</h2>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left text-sm">
            <thead className="bg-muted text-xs text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">{WORKSPACE_COPY.fieldName}</th>
                <th className="px-4 py-3 font-semibold">{WORKSPACE_COPY.fieldMeaning}</th>
                <th className="px-5 py-3 font-semibold">{WORKSPACE_COPY.fieldUsage}</th>
              </tr>
            </thead>
            <tbody>
              {SOURCE_FIELDS.map((field) => (
                <tr className="border-t border-border align-top" key={field.id}>
                  <th className="px-5 py-4 font-mono text-xs font-semibold text-accent">{field.name}</th>
                  <td className="px-4 py-4 text-sm leading-6 text-muted-foreground">{field.meaning}</td>
                  <td className="px-5 py-4 text-sm leading-6 text-muted-foreground">{field.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="flex items-start gap-3 border-warning/20 bg-warning/5 p-5">
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-warning" />
        <div>
          <h2 className="text-sm font-semibold text-foreground">{WORKSPACE_COPY.sourcesBoundaryTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{WORKSPACE_COPY.sourcesBoundaryBody}</p>
        </div>
      </Card>

      <Card className="grid gap-2 p-5 text-xs leading-relaxed text-muted-foreground">
        <p>{WORKSPACE_COPY.elexonAttribution}</p>
        <p>{WORKSPACE_COPY.elexonIndependence}</p>
        <a className="w-fit font-semibold text-accent underline" href={WORKSPACE_COPY.elexonLicenceUrl} rel="noreferrer" target="_blank">{WORKSPACE_COPY.elexonLicenceLabel}</a>
      </Card>
    </div>
  );
}

interface InfoCardProps {
  icon: typeof Database;
  title: string;
  value: string;
  detail?: string;
}

function InfoCard({ icon: Icon, title, value, detail }: InfoCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Icon aria-hidden="true" className="size-4" />{title}</div>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-foreground">{value}</p>
      {detail && <p className="mt-2 font-mono text-xs text-muted-foreground">{detail}</p>}
    </Card>
  );
}
