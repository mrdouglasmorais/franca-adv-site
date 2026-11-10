"use client";

import { ViewTransition, useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  document.addEventListener("visibilitychange", onStoreChange);
  return () => document.removeEventListener("visibilitychange", onStoreChange);
}

function getSnapshot() {
  return !document.hidden;
}

function getServerSnapshot() {
  return true;
}

/** Evita startViewTransition com o documento oculto (InvalidStateError). */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!visible) return children;

  return (
    <ViewTransition enter="page" exit="page">
      {children}
    </ViewTransition>
  );
}
