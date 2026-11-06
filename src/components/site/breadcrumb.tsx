import Link from "next/link";

export function Breadcrumb({
  items,
  tone = "light",
}: {
  items: { name: string; path: string }[];
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-gold-soft" : "text-ink-soft";
  const current = tone === "dark" ? "text-paper" : "text-ink";
  return (
    <nav aria-label="Trilha" className={`text-sm ${muted}`}>
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {last ? (
                <span aria-current="page" className={current}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="underline decoration-line underline-offset-4">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
