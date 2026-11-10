import dynamic from "next/dynamic";
import Link from "next/link";
import { practiceAreas } from "@/content/areas";
import { OfficeStage } from "@/components/site/office-stage";
import { AreaCard } from "@/components/site/area-card";
import { AreaMarquee } from "@/components/site/area-marquee";
import { HeroStage } from "@/components/site/hero-stage";
import { ImobiliarioBand } from "@/components/site/imobiliario-band";
import { LogoRail } from "@/components/site/client-carousel";

const NationalAttendance = dynamic(() =>
  import("@/components/site/national-attendance").then((mod) => mod.NationalAttendance),
);
import { TeamGrid } from "@/components/site/team-grid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";

export default function HomePage() {
  return (
    <>
      <HeroStage />
      <AreaMarquee />
      <ImobiliarioBand />

      <section id="areas" className="section-in scroll-mt-(--header-height) border-b border-line" aria-labelledby="areas-titulo">
        <Container className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Onde atuamos</Eyebrow>
              <Heading level={2} id="areas-titulo" className="mt-3">
                Áreas de atuação
              </Heading>
            </div>
            <Link href="/areas" className="text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-seal">
              Ver todas
            </Link>
          </div>
          <ul className="area-grid mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {practiceAreas.map((area, index) => (
              <AreaCard key={area.slug} area={area} index={index} level={3} />
            ))}
          </ul>
        </Container>
      </section>

      <OfficeStage />

      <section className="section-in scroll-mt-(--header-height) border-b border-line" aria-labelledby="equipe-titulo">
        <Container className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Equipe</Eyebrow>
              <Heading level={2} id="equipe-titulo" className="mt-3">
                Quem atende você
              </Heading>
            </div>
            <Button href="/equipe" tone="ghost">
              Ver a equipe
            </Button>
          </div>
          <p className="mt-4 max-w-[42ch] text-ink-soft">
            Advogados da OAB/SC e a equipe do escritório em Itajaí.
          </p>
          <div className="mt-10">
            <TeamGrid />
          </div>
        </Container>
      </section>

      <NationalAttendance />
      <LogoRail />
    </>
  );
}
