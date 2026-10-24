import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Archivo, JetBrains_Mono } from "next/font/google";
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jerry Nguyen - Data Scientist",
  description:
    "Data scientist focused on applied machine learning, analytics, and operational impact.",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/favicon.ico",
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
  themeColor: "#101314",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a className="skip-link" href="#record">
          Skip to process record
        </a>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
