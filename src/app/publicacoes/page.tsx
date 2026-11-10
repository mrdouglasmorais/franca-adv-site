import type { Metadata } from "next";
import { firm } from "@/content/firm";
import { illustrations } from "@/content/visuals";
import { JurisprudenceBoard } from "@/components/site/jurisprudence-board";
import { PageBanner } from "@/components/site/page-banner";
import { WhatsAppMark } from "@/components/site/whatsapp-mark";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { fetchAllJurisprudenceSectors } from "@/lib/tjdft";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Publicações",
  description:
    "Em breve, artigos da Ferreira França Advogados. Jurisprudência pública do TJDFT por área, de referência.",
  path: "/publicacoes",
});

export const revalidate = 21600;

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Publicações", path: "/publicacoes" },
];

const upcoming = [
  {
    title: "Artigos",
    line: "Textos do escritório sobre as áreas de atuação, com leitura direta.",
  },
  {
    title: "Notas e atualizações",
    line: "Mudanças normativas e material de apoio ligado à prática do escritório.",
  },
] as const;

export default async function PostsPage() {
  const sectors = await fetchAllJurisprudenceSectors();

  return (
    <>
      <PageBanner
        image={illustrations[1]}
        crumbs={crumbs}
        kicker="Editorial"
        title="Publicações"
        line="Em breve, artigos do escritório. Abaixo, acórdãos públicos do TJDFT por área."
      />
      <Container className="py-16 md:py-24">
        <JsonLd data={breadcrumbSchema(crumbs)} />
        <div className="max-w-[40rem]">
          <Eyebrow tone="seal">Em breve</Eyebrow>
          <Heading level={2} className="mt-3">
            Conteúdo do escritório
          </Heading>
          <p className="mt-4 text-ink-soft">
            Os artigos da Ferreira França ainda não foram publicados. Em breve, eles passam a
            aparecer nesta página.
          </p>
          <ul className="mt-10 space-y-8 border-t border-line pt-10">
            {upcoming.map((item) => (
              <li key={item.title}>
                <p className="font-display text-xl font-medium tracking-tight">{item.title}</p>
                <p className="mt-2 max-w-[42ch] text-ink-soft">{item.line}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href={firm.contact.whatsappUrl} pill>
              <WhatsAppMark />
              Falar com o escritório
            </Button>
            <Button href="/areas" tone="ghost">
              Ver as áreas
            </Button>
          </div>
        </div>
      </Container>
      <JurisprudenceBoard sectors={sectors} />
    </>
  );
}
