"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { firm, nav } from "@/content/firm";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panelId = useId();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    firstLink.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
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

      <div className="lg:hidden">
        <button
          type="button"
          className="inline-flex h-11 items-center px-3 text-sm text-paper"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? "Fechar" : "Menu"}
        </button>
        {open ? (
          <nav
            id={panelId}
            aria-label="Principal"
            className="menu-panel fixed inset-x-0 bottom-0 z-50 flex flex-col gap-2 bg-ink px-6 py-6"
            style={{ top: "var(--header-height)" }}
          >
            {nav.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstLink : undefined}
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                className="border-b border-line-light py-4 text-lg text-paper"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={firm.nexoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-seal text-sm font-medium text-on-seal"
            >
              Acessar o Nexo
            </a>
          </nav>
        ) : null}
      </div>
    </>
  );
}
