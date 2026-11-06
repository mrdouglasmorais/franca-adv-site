"use client";

import Image from "next/image";
import { statements } from "@/content/visuals";
import { SlideControls } from "@/components/site/slide-controls";
import { useCarousel } from "@/components/site/use-carousel";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";

export function StatementRail() {
  const carousel = useCarousel(statements.length, 8000);
  const slide = statements[carousel.index];

  return (
    <section
      className="section-in border-b border-line"
      aria-roledescription="carrossel"
      aria-label="Comunicação do escritório"
      onMouseEnter={() => carousel.setHovered(true)}
      onMouseLeave={() => carousel.setHovered(false)}
      onFocusCapture={() => carousel.setHovered(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) carousel.setHovered(false);
      }}
    >
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div className="image-frame relative aspect-[16/10] bg-ink">
          {statements.map((item, itemIndex) => (
            <div
              key={item.src}
              className={`hero-slide ${itemIndex === carousel.index ? "is-on statement-wipe" : ""}`}
            >
              <div className="hero-drift">
                <Image
                  src={item.src}
                  alt={itemIndex === carousel.index ? item.alt : ""}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <Eyebrow tone="seal">Comunicação</Eyebrow>
          <Heading level={2} className="mt-3">
            <span key={slide.title} className="hero-caption">
              {slide.title}
            </span>
          </Heading>
          <p className="mt-4 max-w-[46ch] text-ink-soft" aria-live="polite">
            {slide.text}
          </p>
          <div className="mt-8">
            <Button href={slide.href} tone="ink">
              {slide.action}
            </Button>
          </div>
          <div className="mt-10">
            <SlideControls
              slides={statements}
              index={carousel.index}
              paused={carousel.paused}
              userPaused={carousel.userPaused}
              onGo={carousel.go}
              onPrev={carousel.prev}
              onNext={carousel.next}
              onTogglePause={() => carousel.setUserPaused((value) => !value)}
              tone="light"
              durationMs={8000}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
