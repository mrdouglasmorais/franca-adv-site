"use client";

import Image from "next/image";
import { firm } from "@/content/firm";
import { illustrations } from "@/content/visuals";
import { SlideControls } from "@/components/site/slide-controls";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { useCarousel } from "@/components/site/use-carousel";

export function HeroStage() {
  const carousel = useCarousel(illustrations.length);
  const nextIndex = (carousel.index + 1) % illustrations.length;

  return (
    <section
      className="relative overflow-hidden bg-ink text-paper"
      aria-roledescription="carrossel"
      aria-label="Ilustrações do escritório"
      onMouseEnter={() => carousel.setHovered(true)}
      onMouseLeave={() => carousel.setHovered(false)}
      onFocusCapture={() => carousel.setHovered(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) carousel.setHovered(false);
      }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {illustrations.map((item, itemIndex) => {
          if (itemIndex !== carousel.index && itemIndex !== nextIndex) return null;
          const current = itemIndex === carousel.index;
          return (
            <div key={item.src} className={`hero-slide ${current ? "is-on" : ""}`}>
              <div className="hero-drift">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  priority={itemIndex === 0}
                  loading={itemIndex === 0 ? undefined : "eager"}
                  sizes="100vw"
                  className="object-cover"
                  fetchPriority={itemIndex === 0 ? "high" : current ? "high" : "auto"}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
        <div className="hero-shade" />
      </div>

      <div
        className="hero-seal"
        tabIndex={0}
        aria-label={`${firm.sealLine} ${firm.sealNote}`}
      >
        <Image
          src="/seal/excelencia.png"
          alt=""
          width={1254}
          height={1254}
          className="hero-seal-mark"
          draggable={false}
        />
        <p className="hero-seal-caption">
          {firm.sealLine}
          <span>{firm.sealNote}</span>
        </p>
      </div>

      <Container className="relative grid min-h-[calc(100svh-var(--header-height))] content-end gap-10 py-14 md:py-16">
        <div className="hero-copy max-w-[40rem]">
          <Eyebrow tone="gold">
            {firm.tagline} · {firm.address.city}/{firm.address.region}
          </Eyebrow>
          <div className="gold-draw mt-5" aria-hidden="true" />
          <Heading level={1} className="mt-6 max-w-[16ch] text-paper">
            Advocacia em Itajaí para empresas e pessoas
          </Heading>
          <p className="mt-6 max-w-[46ch] text-lg text-gold-soft">
            Consultoria e contencioso, com sede em Itajaí/SC.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contato" pill>
              Falar com o escritório
            </Button>
            <Button href="/areas" tone="gold">
              Ver as áreas
            </Button>
          </div>
        </div>
        <SlideControls
          slides={illustrations}
          index={carousel.index}
          paused={carousel.paused}
          userPaused={carousel.userPaused}
          onGo={carousel.go}
          onPrev={carousel.prev}
          onNext={carousel.next}
          onTogglePause={() => carousel.setUserPaused((value) => !value)}
        />
        <a href="#areas" className="scroll-cue">
          Próxima seção
          <span className="scroll-cue-shaft" aria-hidden="true">
            <span className="scroll-cue-dot" />
          </span>
        </a>
      </Container>
    </section>
  );
}
