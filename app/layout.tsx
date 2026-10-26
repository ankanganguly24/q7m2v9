import type { Metadata } from "next";
import type { ReactNode } from "react";
import { COPY } from "@/dummy/copy";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: `${COPY.productName} · ${COPY.pageTitle}`,
  description: COPY.pageDescription,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
