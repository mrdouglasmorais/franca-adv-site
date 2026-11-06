import type { ReactNode } from "react";

const styles = {
  1: "font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance",
  2: "font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.12] font-medium tracking-[-0.02em] text-balance",
  3: "font-display text-[1.75rem] leading-[1.2] font-medium tracking-[-0.02em] text-balance",
} as const;

export function Eyebrow({
  children,
  tone = "soft",
  className = "",
}: {
  children: ReactNode;
  tone?: "soft" | "seal" | "gold";
  className?: string;
}) {
  const color =
    tone === "seal" ? "text-seal" : tone === "gold" ? "text-gold" : "text-ink-soft";
  return (
    <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${color} ${className}`}>{children}</p>
  );
}

export function Heading({
  level = 2,
  children,
  className = "",
  id,
}: {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={`${styles[level]} ${className}`}>
      {children}
    </Tag>
  );
}
