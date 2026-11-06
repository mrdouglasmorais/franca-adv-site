import type { Metadata } from "next";
import { firm } from "@/content/firm";
import { illustrations } from "@/content/visuals";
import { PageBanner } from "@/components/site/page-banner";
import { WhatsAppMark } from "@/components/site/whatsapp-mark";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Publicações",
  description:
    "Artigos da Ferreira França Advogados. A lista fica vazia até o escritório publicar um texto.",
  path: "/publicacoes",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Publicações", path: "/publicacoes" },
];

export default function PostsPage() {
  return (
    <>
    <PageBanner
      image={illustrations[1]}
      crumbs={crumbs}
      kicker="Editorial"
      title="Publicações"
      line="Os artigos do escritório entram aqui quando forem publicados. Não há textos provisórios."
    />
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div>
        <Button href={firm.contact.whatsappUrl} pill>
          <WhatsAppMark />
          Falar com o escritório
        </Button>
      </div>
    </Container>
    </>
  );
}
