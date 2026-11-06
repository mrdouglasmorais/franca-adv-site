import type { Metadata } from "next";
import { firm } from "@/content/firm";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Privacidade",
  description:
    "Como a Ferreira França Advogados trata dados de contato neste site, em conformidade com a LGPD.",
  path: "/privacidade",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Privacidade", path: "/privacidade" },
];

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumb items={crumbs} />
      <Heading level={1} className="mt-4 max-w-[16ch]">
        Política de privacidade
      </Heading>
      <div className="mt-8 max-w-[62ch] space-y-4 text-[17px] leading-relaxed">
        <p>
          O controlador deste site é {firm.name}, com atendimento em {firm.address.full}. O canal do
          titular é {firm.contact.email}.
        </p>
        <p>
          Esta versão não usa cookies de análise nem de marketing e não incorpora mapas ou scripts
          de anúncio. O aviso de privacidade guarda só a sua escolha neste navegador. A navegação
          não depende desse aceite.
        </p>
        <p>
          O formulário de contato e o cadastro de candidaturas enviam nome, contato, mensagem e, na
          seleção, o currículo para o sistema interno do escritório. Esses dados servem para
          responder à demanda ou conduzir a seleção. A base é o procedimento preliminar a pedido do
          titular e o legítimo interesse de responder (Lei 13.709/2018, art. 7º, V e IX).
        </p>
        <p>
          WhatsApp, telefone e e-mail seguem a mesma finalidade. O WhatsApp é um serviço da Meta,
          com política própria.
        </p>
        <p>Você pode pedir confirmação, acesso, correção ou exclusão pelo e-mail acima.</p>
      </div>
    </Container>
  );
}
