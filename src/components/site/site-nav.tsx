"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { firm, nav } from "@/content/firm";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      )}
    </svg>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    const menuButton = buttonRef.current;
    html.style.overflow = "hidden";
    firstLink.current?.focus({ preventScroll: true });

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>("a[href]");
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      menuButton?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Principal" className="hidden items-center gap-5 xl:gap-7 lg:flex">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            className="nav-link text-sm whitespace-nowrap text-paper"
          >
            {item.label}
          </Link>
        ))}
        <a
          href={firm.nexoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-full bg-seal px-4 text-sm font-medium whitespace-nowrap text-on-seal transition-colors duration-200 ease-out hover:bg-seal-deep"
        >
          Nexo
        </a>
      </nav>

      <div className="shrink-0 lg:hidden">
        <button
          ref={buttonRef}
          type="button"
          className="relative z-10 inline-flex size-11 items-center justify-center text-paper"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          <MenuIcon open={open} />
        </button>
        {open
          ? createPortal(
              <>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Fechar menu"
              className="menu-overlay fixed inset-0 z-40 bg-ink/40"
              onClick={() => setOpenPath(null)}
            />
            <nav
              ref={panelRef}
              id={panelId}
              aria-label="Principal"
              className="menu-panel fixed top-(--header-height) right-0 bottom-0 z-[45] flex w-[min(100%,22rem)] flex-col overflow-y-auto bg-paper px-6 py-6 text-ink shadow-float"
            >
              {nav.map((item, index) => (
                <Link
                  key={item.href}
                  ref={index === 0 ? firstLink : undefined}
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="menu-link flex min-h-11 items-center border-b border-line py-3 pl-3 text-lg text-ink"
                  onClick={() => setOpenPath(null)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={firm.nexoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-seal text-sm font-medium text-on-seal"
                onClick={() => setOpenPath(null)}
              >
                Acessar o Nexo
              </a>
            </nav>
              </>,
              document.body,
            )
          : null}
      </div>
    </>
  );
}
