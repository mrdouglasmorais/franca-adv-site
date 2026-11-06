import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPracticeArea, practiceAreas } from "@/content/areas";
import { firm } from "@/content/firm";
import { illustrationFor } from "@/content/visuals";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { PageBanner } from "@/components/site/page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "@/components/site/contact-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Prose } from "@/components/ui/prose";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    path: `/areas/${area.slug}`,
  });
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Áreas", path: "/areas" },
    { name: area.name, path: `/areas/${area.slug}` },
  ];

  const others = practiceAreas.filter((item) => item.slug !== area.slug);
  const visual = illustrationFor(practiceAreas.findIndex((item) => item.slug === area.slug));

  return (
    <>
    <PageBanner image={visual} />
    <Container className="py-16 md:py-24">
      <JsonLd data={serviceSchema(area)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumb items={crumbs} />
      <Eyebrow tone="seal">Itajaí / SC</Eyebrow>
      <Heading level={1} className="mt-3 max-w-[18ch]">
        {area.name}
      </Heading>
      <Prose className="mt-5">
        <p>{area.summary}</p>
        <p className="mt-4">
          O escritório analisa documentos, prazos e se o caminho é consultivo ou contencioso. Não há
          promessa de resultado: cada caso depende dos fatos.
        </p>
      </Prose>
      <h2 className="mt-12 font-display text-2xl font-medium">O que costuma chegar</h2>
      <ul className="mt-4 max-w-[62ch] divide-y divide-line border-y border-line">
        {area.problems.map((problem) => (
          <li key={problem} className="py-3">
            {problem}
          </li>
        ))}
      </ul>
      <div className="mt-12 max-w-[40rem] border-t border-line pt-10">
        <h2 className="font-display text-2xl font-medium">Falar sobre {area.name}</h2>
        <div className="mt-6">
          <ContactForm defaultArea={area.slug} idPrefix={area.slug} />
        </div>
        <div className="mt-6">
          <Button href={firm.contact.whatsappUrl} tone="ghost" pill>
            Chamar no WhatsApp
          </Button>
        </div>
      </div>
      <h2 className="mt-16 font-display text-2xl font-medium">Outras áreas</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {others.map((item) => (
          <li key={item.slug}>
            <Link href={`/areas/${item.slug}`} className="underline decoration-line underline-offset-4 hover:decoration-seal">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
    </>
  );
}
