import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Archivo } from "next/font/google";
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

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
  themeColor: "#fffefd",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={archivo.variable}
      suppressHydrationWarning
    >
      <body>
        <a className="skip-link" href="#experience">
          Skip to experience
        </a>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
