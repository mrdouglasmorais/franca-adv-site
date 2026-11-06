"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="topo"
      className={scrolled ? "site-header is-scrolled" : "site-header"}
      style={{ viewTransitionName: "site-header" }}
    >
      {children}
    </header>
  );
}
