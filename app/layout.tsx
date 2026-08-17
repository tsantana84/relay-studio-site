import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relay Studio — execução operacional",
  description:
    "A Relay Studio é um SaaS de execução operacional. Transformamos dados autorizados e regras da sua operação em trabalho recorrente, verificável e concluído.",
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
