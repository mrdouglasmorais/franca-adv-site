import type { Metadata } from "next";
import { firm } from "@/content/firm";
import { illustrations } from "@/content/visuals";
import { PageBanner } from "@/components/site/page-banner";
import { SocialLinks } from "@/components/site/social-links";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description:
    "Fale com a Ferreira França Advogados em Itajaí/SC. Rua Lauro Muller, 853. Segunda a sexta, das 8h às 18h.",
  path: "/contato",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Contato", path: "/contato" },
];

export default function ContactPage() {
  return (
    <>
    <PageBanner
      image={illustrations[0]}
      crumbs={crumbs}
      kicker="Itajaí / SC"
      title="Fale com o escritório"
      line="Conte a demanda no formulário. A mensagem entra na fila, de segunda a sexta, das 8h às 18h."
    />
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Reveal className="max-w-[40rem]">
        <div id="formulario">
          <ContactForm title="Sua mensagem" />
        </div>
      </Reveal>
      <div className="mt-8">
        <Button href={firm.contact.whatsappUrl} tone="ghost" pill>
          Chamar no WhatsApp
        </Button>
      </div>
      <dl className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">Endereço</dt>
          <dd className="mt-2">{firm.address.full}</dd>
          <dd className="mt-2">
            <a href={firm.mapUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Abrir no mapa
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">Horário</dt>
          <dd className="mt-2">{firm.contact.hours}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">Telefones</dt>
          <dd className="mt-2">
            <a href={`tel:${firm.contact.phonePrimary}`}>{firm.contact.phonePrimaryDisplay}</a>
          </dd>
          <dd className="mt-1">
            <a href={`tel:${firm.contact.phoneSecondary}`}>{firm.contact.phoneSecondaryDisplay}</a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">E-mail</dt>
          <dd className="mt-2">
            <a href={`mailto:${firm.contact.email}`}>{firm.contact.email}</a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">Redes</dt>
          <dd className="mt-3">
            <SocialLinks tone="on-light" />
          </dd>
        </div>
      </dl>
    </Container>
    </>
  );
}
