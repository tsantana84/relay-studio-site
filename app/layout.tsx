import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteMeta } from "./content/site-content";
import "./globals.css";

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  icons: {
    icon: "brand/relay-icon-dark.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- static relative asset required for GitHub Pages */}
        <link rel="stylesheet" href="fonts/fonts.css" />
        <link rel="preload" href="fonts/anybody-latin-wdth-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Sem JavaScript, nada que a animação esconderia fica escondido. */}
        <noscript>
          <style>{"[data-motion]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
