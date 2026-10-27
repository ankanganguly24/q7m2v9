"use client";

import { CalendarDays, Clock3 } from "lucide-react";
import { COPY } from "@/dummy/copy";
import { OPERATING_DAY_OPTIONS } from "@/dummy/options";
import { Select } from "@/components/ui/select";

interface ReviewControlsProps {
  selectedDayId: string;
  selectedCutoff: string;
  cutoffOptions: Array<{ value: string; label: string }>;
  onDayChange: (value: string) => void;
  onCutoffChange: (value: string) => void;
}

export function ReviewControls({ selectedDayId, selectedCutoff, cutoffOptions, onDayChange, onCutoffChange }: ReviewControlsProps) {
  return (
    <section aria-label={COPY.dateLabel} className="grid gap-4 rounded-md border border-border bg-surface p-4 sm:grid-cols-2 sm:p-5">
      <label className="grid gap-2 text-xs font-semibold text-muted-foreground">
        <span className="flex items-center gap-2"><CalendarDays aria-hidden="true" className="size-4" />{COPY.dateLabel}</span>
        <Select value={selectedDayId} onChange={(event) => onDayChange(event.target.value)}>
          {OPERATING_DAY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </Select>
      </label>
      <label className="grid gap-2 text-xs font-semibold text-muted-foreground">
        <span className="flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4" />{COPY.knownByLabel}</span>
        <Select disabled={cutoffOptions.length === 0} value={selectedCutoff} onChange={(event) => onCutoffChange(event.target.value)}>
          {cutoffOptions.length === 0
            ? <option value="">{COPY.noCutoffs}</option>
            : cutoffOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </Select>
      </label>
    </section>
  );
}
