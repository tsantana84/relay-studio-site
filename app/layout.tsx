import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relay Studio — execução operacional",
  description:
    "A Relay avalia primeiros pilotos de execução operacional para transformar um fluxo recorrente em resultado, exceções e evidência.",
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
