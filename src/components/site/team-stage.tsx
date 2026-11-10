import Image from "next/image";
import { teamStagePhoto } from "@/content/team-stage";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/heading";

export function TeamStage() {
  return (
    <section className="team-stage-band border-b border-line" aria-labelledby="equipe-foto-titulo">
      <Container className="py-14 md:py-20">
        <figure className="team-stage-frame image-frame relative flex aspect-square w-full flex-col overflow-hidden bg-mist">
          <Image
            src={teamStagePhoto.src}
            alt={teamStagePhoto.alt}
            fill
            priority
            sizes="(min-width: 1120px) 70rem, 100vw"
            quality={92}
            className="object-cover object-center"
            draggable={false}
          />
          <div className="team-stage-shade" aria-hidden="true" />
          <figcaption className="team-stage-copy">
            <Eyebrow tone="gold">{teamStagePhoto.kicker}</Eyebrow>
            <h2
              id="equipe-foto-titulo"
              className="mt-2 max-w-[16ch] font-display text-[clamp(1.35rem,3.4vw,1.85rem)] leading-tight font-medium tracking-tight text-balance text-paper"
            >
              {teamStagePhoto.title}
            </h2>
            <p className="mt-2 max-w-[34ch] text-sm leading-5 text-gold-soft">{teamStagePhoto.line}</p>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
