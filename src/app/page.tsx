import Link from "next/link";
import { practiceAreas } from "@/content/areas";
import { AreaCard } from "@/components/site/area-card";
import { AreaMarquee } from "@/components/site/area-marquee";
import { HeroStage } from "@/components/site/hero-stage";
import { LogoRail } from "@/components/site/client-carousel";
import { NationalAttendance } from "@/components/site/national-attendance";
import { StatementRail } from "@/components/site/statement-rail";
import { TeamGrid } from "@/components/site/team-grid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";

const principles = [
  {
    title: "O que você reúne",
    text: "Fatos, documentos e prazos. É o material com que a equipe começa.",
  },
  {
    title: "Orientar ou processar",
    text: "Orientar, para prevenir o conflito. Processar, quando a disputa já existe.",
  },
  {
    title: "Onde e quando",
    text: "No escritório em Itajaí, de segunda a sexta, das 8h às 18h. Nos outros estados, o acompanhamento é remoto.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <HeroStage />
      <AreaMarquee />

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

      <StatementRail />

      <section className="section-in scroll-mt-(--header-height) border-b border-line" aria-labelledby="escritorio-titulo">
        <Container className="grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <Eyebrow>O escritório</Eyebrow>
            <Heading level={2} id="escritorio-titulo" className="mt-3">
              A leitura do caso começa em Itajaí
            </Heading>
          </div>
          <div>
            <p className="max-w-[62ch] text-[17px]">
              Empresas e pessoas trazem o que aconteceu. A equipe olha os documentos e o prazo e
              indica se cabe orientar ou processar.
            </p>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {principles.map((item) => (
                <div key={item.title} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr]">
                  <dt className="font-medium">{item.title}</dt>
                  <dd className="text-ink-soft">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

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
