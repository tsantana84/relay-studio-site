import type { ReactNode } from "react";

export default function ManifestoCut({ children }: { children: ReactNode }) {
  return <p className="manifesto-cut">{children}</p>;
}
