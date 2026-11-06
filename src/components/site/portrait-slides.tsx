"use client";

import Image from "next/image";
import { SlideControls } from "@/components/site/slide-controls";
import { useCarousel } from "@/components/site/use-carousel";

export function PortraitSlides({
  photos,
  name,
  labelled = true,
  controls = false,
  sizes,
  priority = false,
}: {
  photos: readonly string[];
  name: string;
  labelled?: boolean;
  controls?: boolean;
  sizes: string;
  priority?: boolean;
}) {
  const carousel = useCarousel(Math.max(photos.length, 1), 5000);
  if (photos.length === 0) return null;

  if (photos.length === 1) {
    return (
      <Image
        src={photos[0]}
        alt={labelled ? name : ""}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
        draggable={false}
      />
    );
  }

  const nextIndex = (carousel.index + 1) % photos.length;

  return (
    <div
      className="absolute inset-0"
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
        return (
          <div key={src} className={`hero-slide ${current ? "is-on" : ""}`}>
            <Image
              src={src}
              alt={current && labelled ? name : ""}
              fill
              priority={priority && itemIndex === 0}
              sizes={sizes}
              className="object-cover object-top"
              draggable={false}
            />
          </div>
        );
      })}
      {controls ? (
        <div className="absolute inset-x-3 bottom-3">
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
