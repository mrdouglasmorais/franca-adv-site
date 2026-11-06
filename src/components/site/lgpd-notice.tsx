"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const storageKey = "ff-lgpd";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readChoice() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return "unavailable";
  }
}

function choose(value: "accept" | "reject") {
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    /* a escolha continua só nesta visita */
  }
  emit();
}

export function LgpdNotice() {
  const stored = useSyncExternalStore(subscribe, readChoice, () => "server");
  if (stored !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de privacidade"
      className="fixed inset-x-4 bottom-20 z-40 flex flex-col gap-3 border border-line bg-paper p-4 text-ink shadow-float sm:flex-row sm:items-center md:right-auto md:bottom-6 md:left-6 md:max-w-xl"
    >
      <p className="text-[13px] leading-snug">
        Este site não usa cookies de análise nem de anúncio. A escolha fica apenas neste navegador.{" "}
        <Link href="/privacidade" className="underline underline-offset-2">
          Saiba mais
        </Link>
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          className="inline-flex h-10 items-center border border-line px-3 text-sm"
          onClick={() => choose("reject")}
        >
          Recusar
        </button>
        <button
          type="button"
          className="inline-flex h-10 items-center bg-seal px-3 text-sm text-on-seal"
          onClick={() => choose("accept")}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
