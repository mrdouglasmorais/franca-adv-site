"use client";

import { useEffect, useRef } from "react";
import { practiceAreas } from "@/content/areas";

export function AreaMarquee() {
  const rootRef = useRef<HTMLDivElement>(null);
  const loop = [practiceAreas, practiceAreas];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const syncHidden = () => {
      root.dataset.offscreen = document.hidden ? "1" : "0";
    };
    syncHidden();
    document.addEventListener("visibilitychange", syncHidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.dataset.inview = entry?.isIntersecting ? "1" : "0";
      },
      { rootMargin: "80px 0px", threshold: 0 },
    );
    observer.observe(root);

    return () => {
      document.removeEventListener("visibilitychange", syncHidden);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="area-strip marquee border-y border-line-light bg-ink text-gold-soft"
      aria-hidden="true"
      data-inview="1"
      data-offscreen="0"
    >
      <div className="marquee-track">
        {loop.map((group, groupIndex) => (
          <div key={groupIndex} className="flex shrink-0">
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
