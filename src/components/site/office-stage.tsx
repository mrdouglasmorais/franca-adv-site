"use client";

import Image from "next/image";
import { firm } from "@/content/firm";
import { officeSlides } from "@/content/visuals";
import { SlideControls } from "@/components/site/slide-controls";
import { useCarousel } from "@/components/site/use-carousel";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/heading";

export function OfficeStage() {
  const carousel = useCarousel(officeSlides.length, 8000);
  const slide = officeSlides[carousel.index];
  const nextIndex = (carousel.index + 1) % officeSlides.length;

  return (
    <section
      className="office-stage"
      aria-roledescription="carrossel"
      aria-labelledby="escritorio-titulo"
      onMouseEnter={() => carousel.setHovered(true)}
      onMouseLeave={() => carousel.setHovered(false)}
      onFocusCapture={() => carousel.setHovered(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) carousel.setHovered(false);
      }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {officeSlides.map((item, itemIndex) => {
          if (itemIndex !== carousel.index && itemIndex !== nextIndex) return null;
          const current = itemIndex === carousel.index;
          return (
            <div key={item.src} className={`hero-slide ${current ? "is-on" : ""}`}>
              <Image
                src={item.src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover hero-drift"
              />
            </div>
          );
        })}
        <div className="office-shade" />
      </div>

      <Container className="relative flex min-h-[inherit] flex-col justify-end gap-8 py-12 md:py-16">
        <div className="max-w-[46rem]">
          <Eyebrow tone="gold">Infraestrutura · {firm.address.city}/{firm.address.region}</Eyebrow>
          <h2 id="escritorio-titulo" className="office-title">
            {slide.title}
          </h2>
          <p className="mt-5 max-w-[42ch] text-lg text-gold-soft" aria-live="polite">
            {slide.line}
          </p>
          <div className="mt-8">
            <Button href={firm.mapUrl} tone="gold">
              Abrir no mapa
            </Button>
          </div>
        </div>
        <div className="pb-16 md:pr-40 md:pb-0">
        <SlideControls
          slides={officeSlides}
          index={carousel.index}
          paused={carousel.paused}
          userPaused={carousel.userPaused}
          onGo={carousel.go}
          onPrev={carousel.prev}
          onNext={carousel.next}
          onTogglePause={() => carousel.setUserPaused((current) => !current)}
          durationMs={8000}
        />
        </div>
      </Container>
    </section>
  );
}
