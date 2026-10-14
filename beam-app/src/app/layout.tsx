import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], weight: ["500", "600", "800"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["500", "600", "800"] });

export const metadata: Metadata = {
  title: { default: "Beam design system", template: "%s · Beam design system" },
  description: "Tokens, components and patterns for building Beam.",
};

// Sets the mode before first paint. Dark is the default.
const themeScript = `try{var t=localStorage.getItem("beam-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="guide flex min-h-full flex-col bg-canvas text-fg">{children}</body>
    </html>
  );
}
