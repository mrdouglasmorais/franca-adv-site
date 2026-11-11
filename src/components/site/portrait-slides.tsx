"use client";

import Image from "next/image";
import { SlideControls } from "@/components/site/slide-controls";
import { useCarousel } from "@/components/site/use-carousel";

/** Aspecto e enquadramento por arquivo (paisagem vs retrato). */
const photoMeta: Record<string, { aspect: string; object: string }> = {
  "/team/dr-Maicon/a.jpeg": { aspect: "3 / 2", object: "object-cover object-[center_35%]" },
  "/team/dr-Maicon/b.jpeg": { aspect: "3 / 2", object: "object-cover object-center" },
  "/team/dr-Maicon/c.jpeg": { aspect: "2 / 3", object: "object-cover object-top" },
};

const defaultMeta = { aspect: "4 / 5", object: "object-cover object-top" };

function metaFor(src: string) {
  return photoMeta[src] ?? defaultMeta;
}

export function PortraitSlides({
  photos,
  name,
  labelled = true,
  controls = false,
  sizes,
  priority = false,
  className = "",
}: {
  photos: readonly string[];
  name: string;
  labelled?: boolean;
  controls?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const carousel = useCarousel(Math.max(photos.length, 1), 5000);
  if (photos.length === 0) return null;

  const active = photos[Math.min(carousel.index, photos.length - 1)] ?? photos[0];
  const activeMeta = metaFor(active);

  if (photos.length === 1) {
    return (
      <div
        className={`image-frame relative overflow-hidden bg-ink ${className}`}
        style={{ aspectRatio: activeMeta.aspect }}
      >
        <Image
          src={photos[0]}
          alt={labelled ? name : ""}
          fill
          priority={priority}
          sizes={sizes}
          quality={92}
          className={activeMeta.object}
          draggable={false}
        />
      </div>
    );
  }

  const nextIndex = (carousel.index + 1) % photos.length;

  return (
    <div
      className={`portrait-slides image-frame relative overflow-hidden bg-ink ${className}`}
      style={{ aspectRatio: activeMeta.aspect }}
      aria-roledescription="carrossel"
      aria-label={`Fotos de ${name}`}
      onMouseEnter={() => carousel.setHovered(true)}
      onMouseLeave={() => carousel.setHovered(false)}
      onFocusCapture={() => carousel.setHovered(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) carousel.setHovered(false);
      }}
    >
      {photos.map((src, itemIndex) => {
        if (itemIndex !== carousel.index && itemIndex !== nextIndex) return null;
        const current = itemIndex === carousel.index;
        const meta = metaFor(src);
        return (
          <div key={src} className={`hero-slide ${current ? "is-on" : ""}`}>
            <Image
              src={src}
              alt={current && labelled ? name : ""}
              fill
              priority={priority && itemIndex === 0}
              sizes={sizes}
              quality={92}
              className={meta.object}
              draggable={false}
            />
          </div>
        );
      })}
      {controls ? (
        <div className="absolute inset-x-3 bottom-3 z-10">
          <SlideControls
            slides={photos.map((src, itemIndex) => ({
              kicker: `Foto ${itemIndex + 1}`,
              line: name,
            }))}
            index={carousel.index}
            paused={carousel.paused}
            userPaused={carousel.userPaused}
            onGo={carousel.go}
            onPrev={carousel.prev}
            onNext={carousel.next}
            onTogglePause={() => carousel.setUserPaused((value) => !value)}
            tone="dark"
            durationMs={5000}
          />
        </div>
      ) : null}
    </div>
  );
}
