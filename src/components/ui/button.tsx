import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  tone?: "seal" | "ink" | "ghost" | "gold";
  href?: string;
  children: ReactNode;
  pill?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const tones = {
  seal: "bg-seal text-on-seal hover:bg-seal-deep",
  ink: "bg-ink text-paper hover:bg-slate",
  ghost: "border border-line bg-transparent text-ink hover:bg-mist",
  gold: "border border-gold text-gold-soft hover:bg-white/5",
} as const;

export function Button({
  tone = "seal",
  href,
  children,
  pill = false,
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex h-12 items-center justify-center px-5 text-[15px] font-medium transition-colors duration-200 ease-out disabled:cursor-wait disabled:opacity-70 ${tones[tone]} ${pill ? "rounded-full" : "rounded-surface"} ${className}`;

  if (!href) {
    return (
      <button type={type} className={classes} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }

  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
