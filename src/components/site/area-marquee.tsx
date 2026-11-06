import { practiceAreas } from "@/content/areas";

export function AreaMarquee() {
  const loop = [practiceAreas, practiceAreas];

  return (
    <div className="section-in marquee border-y border-line-light bg-ink text-gold-soft" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((group, groupIndex) => (
          <div key={groupIndex} className="flex">
            {group.map((area) => (
              <span key={`${groupIndex}-${area.slug}`} className="marquee-item">
                {area.name}
                <span className="px-3 text-gold">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
