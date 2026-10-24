import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Serif, Inter } from "next/font/google";
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jerry Nguyen - Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerry Nguyen - Data Scientist",
    description:
      "Data scientist focused on applied machine learning, analytics, and operational impact.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
