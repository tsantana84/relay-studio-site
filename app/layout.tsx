import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relay Studio — trabalho confiável",
  description:
    "A Relay Studio constrói sistemas para operações que transformam contexto disperso em trabalho preparado, revisável e confiável.",
  icons: {
    icon: "brand/relay-icon-dark.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
