import { ImageResponse } from "next/og";
import { REVIEW_DAYS } from "@/dummy/fixtures";
import { LANDING_COPY, LANDING_PREVIEW, LANDING_SEO, LANDING_SOCIAL, LANDING_SOCIAL_CHART } from "@/dummy/landing-content";
import { selectIntervals } from "@/features/forecast-review";

export const socialImageSize = { width: 1200, height: 630 } as const;
export const socialImageAlt = LANDING_SEO.title;
export const socialImageContentType = "image/png";

function createPath(values: Array<number | null>): string {
  return values.map((value, index) => {
    if (value === null) return "";
    const x = LANDING_SOCIAL_CHART.plotLeft + (index * (LANDING_SOCIAL_CHART.plotRight - LANDING_SOCIAL_CHART.plotLeft)) / Math.max(values.length - 1, 1);
    const y = LANDING_SOCIAL_CHART.plotBottom - (value * (LANDING_SOCIAL_CHART.plotBottom - LANDING_SOCIAL_CHART.plotTop)) / LANDING_SOCIAL_CHART.maxMw;
    const beginsPath = index === 0 || values[index - 1] === null;
    return `${beginsPath ? "M" : "L"}${x} ${y}`;
  }).filter(Boolean).join(" ");
}

export function createSocialShareImage() {
  const day = REVIEW_DAYS.find((item) => item.id === LANDING_PREVIEW.dayId) ?? REVIEW_DAYS[0];
  const intervals = selectIntervals(day, LANDING_PREVIEW.knowledgeTime);
  const forecastPath = createPath(intervals.map((item) => item.forecastMw));
  const actualPath = createPath(intervals.map((item) => item.actualMw));

  return new ImageResponse(
    (
      <div style={{ backgroundColor: LANDING_SOCIAL.background, color: LANDING_SOCIAL.paper, display: "flex", height: "100%", padding: 58, width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: 42, width: "55%" }}>
          <div style={{ color: LANDING_SOCIAL.signal, fontFamily: "Arial", fontSize: 17, fontWeight: 700, letterSpacing: 5 }}>{LANDING_COPY.productName.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ color: LANDING_SOCIAL.muted, fontFamily: "Arial", fontSize: 15, fontWeight: 700, letterSpacing: 3 }}>{LANDING_SOCIAL.eyebrow}</div>
            <div style={{ fontFamily: "Arial", fontSize: 61, fontWeight: 700, letterSpacing: -2, lineHeight: 1.06 }}>{LANDING_SOCIAL.title}</div>
            <div style={{ color: LANDING_SOCIAL.muted, fontFamily: "Arial", fontSize: 20, lineHeight: 1.45 }}>{LANDING_SOCIAL.description}</div>
          </div>
          <div style={{ color: LANDING_SOCIAL.muted, fontFamily: "Arial", fontSize: 14 }}>{LANDING_COPY.previewContextLine}</div>
        </div>
        <div style={{ backgroundColor: LANDING_SOCIAL.panel, border: `1px solid ${LANDING_SOCIAL.line}`, borderRadius: 12, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 26, width: "45%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ color: LANDING_SOCIAL.muted, fontFamily: "Arial", fontSize: 13, letterSpacing: 2 }}>{LANDING_COPY.previewEyebrow}</div>
              <div style={{ fontFamily: "Arial", fontSize: 24, fontWeight: 700 }}>{day.label}</div>
            </div>
            <div style={{ color: LANDING_SOCIAL.signal, fontFamily: "Arial", fontSize: 13 }}>{LANDING_COPY.previewContext}</div>
          </div>
          <svg height={LANDING_SOCIAL_CHART.height} viewBox={LANDING_SOCIAL_CHART.viewBox} width="100%">
            {LANDING_SOCIAL_CHART.gridY.map((y) => <line key={y} stroke={LANDING_SOCIAL.line} strokeWidth="1" x1="0" x2={LANDING_SOCIAL_CHART.width} y1={y} y2={y} />)}
            <path d={forecastPath} fill="none" stroke={LANDING_SOCIAL.muted} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
            <path d={actualPath} fill="none" stroke={LANDING_SOCIAL.signal} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          </svg>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ alignItems: "center", color: LANDING_SOCIAL.muted, display: "flex", fontFamily: "Arial", fontSize: 14, gap: 8 }}><div style={{ backgroundColor: LANDING_SOCIAL.muted, borderRadius: 10, height: 8, width: 20 }} />{LANDING_COPY.previewForecast}</div>
            <div style={{ alignItems: "center", color: LANDING_SOCIAL.paper, display: "flex", fontFamily: "Arial", fontSize: 14, gap: 8 }}><div style={{ backgroundColor: LANDING_SOCIAL.signal, borderRadius: 10, height: 8, width: 20 }} />{LANDING_COPY.previewActual}</div>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
