import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans } from "next/font/google";
import { LANDING_COPY, LANDING_SEO } from "@/dummy/landing-content";
import "@/app/globals.css";

const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-gridline-sans" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  alternates: metadataBase ? { canonical: "/" } : undefined,
  title: LANDING_SEO.title,
  description: LANDING_SEO.description,
  applicationName: LANDING_COPY.productName,
  keywords: [...LANDING_SEO.keywords],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: metadataBase ? "/" : undefined,
    title: LANDING_SEO.title,
    description: LANDING_SEO.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: LANDING_SEO.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: LANDING_SEO.title,
    description: LANDING_SEO.description,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className={sans.variable} lang="en">
      <body>{children}</body>
    </html>
  );
}
