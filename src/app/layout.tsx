import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./experience.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import React, { ReactNode } from "react";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Jerry Nguyen - Data Scientist",
  description:
    "Data scientist focused on applied machine learning, analytics, and operational impact.",
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  metadataBase: new URL("https://anh-nguyenn.github.io/"),
  openGraph: {
    title: "Jerry Nguyen - Data Scientist",
    description:
      "Data scientist focused on applied machine learning, analytics, and operational impact.",
    url: "https://anh-nguyenn.github.io/",
    siteName: "Jerry Nguyen",
  },
  twitter: {
    card: "summary",
    title: "Jerry Nguyen - Data Scientist",
    description:
      "Data scientist focused on applied machine learning, analytics, and operational impact.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  colorScheme: "dark",
};

const bootScript = `(function(){var d=document.documentElement,m=matchMedia,n=navigator,r=m('(prefers-reduced-motion: reduce)').matches,c=m('(pointer: coarse)').matches||innerWidth<768,low=(n.deviceMemory&&n.deviceMemory<=2)||(n.connection&&n.connection.saveData);d.dataset.js='1';d.dataset.motion=r?'reduce':'full';d.dataset.gl=(r||c||low)?'off':'on';if(r)d.dataset.loaded='1';})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
