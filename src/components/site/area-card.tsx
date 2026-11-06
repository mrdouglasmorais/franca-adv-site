import Link from "next/link";
import type { PracticeArea } from "@/content/areas";

export function AreaCard({
  area,
  index,
  level,
}: {
  area: PracticeArea;
  index: number;
  level: 2 | 3;
}) {
  const Title = level === 2 ? "h2" : "h3";

  return (
    <li>
      <Link href={`/areas/${area.slug}`} className="area-card">
        <span className="text-xs font-semibold tracking-[0.14em] text-seal">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Title className="mt-auto line-clamp-3 font-display text-[clamp(1.35rem,1.7vw,1.85rem)] leading-tight font-medium tracking-tight">
          {area.name}
        </Title>
        <p className="area-card-summary mt-2 line-clamp-3 text-sm leading-5 text-ink-soft">{area.summary}</p>
        <span className="area-arrow mt-4 text-sm font-medium">Ver esta área</span>
      </Link>
    </li>
  );
}
