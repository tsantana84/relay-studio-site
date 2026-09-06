import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relay Studio — execução operacional",
  description:
    "A Relay executa trabalhos operacionais recorrentes, leva exceções para decisão da equipe e registra o resultado.",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
