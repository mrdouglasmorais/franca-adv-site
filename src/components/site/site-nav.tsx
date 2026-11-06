"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { firm, nav } from "@/content/firm";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NexoIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="nav-nexo-icon">
      <path
        d="M6 3.5H3.5v9h9V10M8 3.5h4.5V8M12.5 3.5 7 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
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
  const linksRef = useRef<HTMLDivElement>(null);
  const [mark, setMark] = useState({ x: 0, w: 0 });
  const [armed, setArmed] = useState(false);

  const place = useCallback((target: HTMLElement | null) => {
    const root = linksRef.current;
    if (!root || !target) return;
    const rootBox = root.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    setMark({ x: box.left - rootBox.left, w: box.width });
  }, []);

  const placeCurrent = useCallback(() => {
    const current = linksRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    place(current ?? null);
  }, [place]);

  useLayoutEffect(() => {
    placeCurrent();
    const frame = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(frame);
  }, [placeCurrent, pathname]);

  useEffect(() => {
    const root = linksRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => placeCurrent());
    observer.observe(root);
    return () => observer.disconnect();
  }, [placeCurrent]);

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
      <nav aria-label="Principal" className="hidden items-center lg:flex">
        <div
          ref={linksRef}
          className="nav-links"
          onMouseLeave={placeCurrent}
          onBlur={(event) => {
            const next = event.relatedTarget;
            if (!(next instanceof Node) || !event.currentTarget.contains(next)) placeCurrent();
          }}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className="nav-link"
              onMouseEnter={(event) => place(event.currentTarget)}
              onFocus={(event) => place(event.currentTarget)}
            >
              {item.label}
            </Link>
          ))}
          <span
            className={`nav-indicator${armed ? " is-armed" : ""}`}
            aria-hidden="true"
            style={{ transform: `translate3d(${mark.x}px, 0, 0) scaleX(${mark.w})` }}
          />
        </div>
        <a
          href={firm.nexoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-nexo"
          aria-label="Nexo, abre em nova aba"
        >
          Nexo
          <NexoIcon />
        </a>
      </nav>

      <div className="shrink-0 lg:hidden">
        <button
          ref={buttonRef}
          type="button"
          className="nav-menu-button relative z-10 inline-flex size-11 items-center justify-center text-paper"
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
                  className="menu-link flex min-h-12 items-center border-b border-line py-3 pl-3 text-ink"
                  onClick={() => setOpenPath(null)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={firm.nexoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-nexo"
                aria-label="Acessar o Nexo, abre em nova aba"
                onClick={() => setOpenPath(null)}
              >
                Acessar o Nexo
                <NexoIcon />
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
