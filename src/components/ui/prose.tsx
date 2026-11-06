import type { ReactNode } from "react";

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[62ch] text-[17px] leading-[1.6] text-ink ${className}`}>{children}</div>;
}
