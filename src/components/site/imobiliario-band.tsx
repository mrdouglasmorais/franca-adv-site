"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";

export function ImobiliarioBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const traveled = viewH - rect.top;
      const total = viewH + rect.height;
      const progress = Math.min(1, Math.max(0, traveled / total));

      // Faixa inteira na tela: sobe/desce com amplitude grande.
      const amplitude = Math.max(240, rect.height * 0.72);
      const shift = (progress - 0.5) * 2 * amplitude;
      photo.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.4)`;

      const img = imageRef.current ?? photo.querySelector("img");
      if (img) {
        // Reforço visual: o recorte da foto também sobe/desce.
        const focus = 18 + progress * 64;
        img.style.objectPosition = `center ${focus.toFixed(1)}%`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  return (
    <section ref={sectionRef} className="imobiliario-band" aria-labelledby="imobiliario-titulo">
      <div ref={photoRef} className="imobiliario-band-photo" aria-hidden="true">
        <Image
          ref={imageRef}
          src="/areas/imobiliario-band.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={92}
          priority
          className="object-cover"
          draggable={false}
        />
      </div>
      <div className="imobiliario-band-shade" aria-hidden="true" />
      <Container className="relative z-10 grid items-end gap-10 py-16 md:grid-cols-[1.25fr_0.75fr] md:py-24">
        <div>
          <Eyebrow tone="gold">Itajaí / SC</Eyebrow>
          <Heading level={2} id="imobiliario-titulo" className="mt-3 max-w-[14ch] text-on-seal">
            Direito Imobiliário
          </Heading>
          <p className="mt-5 max-w-[42ch] text-lg text-on-seal">
            Compra, venda, locação e registro. O escritório lê a matrícula, o contrato e a posse.
          </p>
          <div className="mt-8">
            <Button href="/areas/direito-imobiliario" tone="gold">
              Ver esta área
            </Button>
          </div>
        </div>
        <p className="max-w-[34ch] text-[17px] leading-[1.6] text-on-seal">
          Em Itajaí, o imóvel atravessa a rotina da cidade. A orientação fica no contrato. O processo
          entra quando a disputa já existe.
        </p>
      </Container>
    </section>
  );
}
