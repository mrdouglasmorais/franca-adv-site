import Image from "next/image";
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
        <Image
          src={area.image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="area-card-photo object-cover"
          draggable={false}
        />
        <span className="area-card-shade" aria-hidden="true" />
        <span className="relative text-xs font-semibold tracking-[0.14em] text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Title className="relative mt-auto line-clamp-3 font-display text-[clamp(1.35rem,1.7vw,1.85rem)] leading-tight font-medium tracking-tight text-paper">
          {area.name}
        </Title>
        <p className="area-card-summary relative mt-2 line-clamp-3 text-sm leading-5 text-gold-soft">{area.summary}</p>
        <span className="area-arrow relative mt-4 text-sm font-medium text-paper">Ver esta área</span>
      </Link>
    </li>
  );
}
