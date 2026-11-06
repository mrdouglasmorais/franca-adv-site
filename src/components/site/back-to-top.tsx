"use client";

import { useSyncExternalStore } from "react";

function subscribe(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

function pastFold() {
  return window.scrollY > 520;
}

function goToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="back-top-arrow">
      <path
        d="M12 19V6M6.5 11.5 12 6l5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function BackToTopButton() {
  return (
    <button type="button" className="back-top" aria-label="Voltar ao topo" onClick={goToTop}>
      <Arrow />
      Voltar ao topo
    </button>
  );
}

export function BackToTopFloat() {
  const visible = useSyncExternalStore(subscribe, pastFold, () => false);
  if (!visible) return null;

  return (
    <button type="button" className="back-top back-top-float" onClick={goToTop} aria-label="Voltar ao topo">
      <Arrow />
    </button>
  );
}
