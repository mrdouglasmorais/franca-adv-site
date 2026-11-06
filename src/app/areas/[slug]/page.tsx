import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPracticeArea, practiceAreas } from "@/content/areas";
import { AreaContact } from "@/components/site/area-contact";
import { PageBanner } from "@/components/site/page-banner";
import { Reveal } from "@/components/site/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
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

  return (
    <>
      <PageBanner
        image={{ src: area.image }}
        crumbs={crumbs}
        kicker="Itajaí / SC"
        title={area.name}
        line={area.lead}
      />
      <Container className="py-16 md:py-24">
        <JsonLd data={serviceSchema(area)} />
        <JsonLd data={breadcrumbSchema(crumbs)} />
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
          <div className="min-w-0">
            <Prose>
              <p>{area.context}</p>
              <p className="mt-4">{area.reading}</p>
            </Prose>

            <Reveal>
              <h2 className="mt-14 font-display text-2xl font-medium">O que costuma chegar</h2>
              <dl className="mt-4 max-w-[62ch] divide-y divide-line border-y border-line">
                {area.problems.map((problem) => (
                  <div key={problem.title} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="font-medium">{problem.title}</dt>
                    <dd className="text-ink-soft">{problem.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <h2 className="mt-14 font-display text-2xl font-medium">O que reunir</h2>
              <ul className="mt-4 max-w-[62ch] divide-y divide-line border-y border-line">
                {area.documents.map((document) => (
                  <li key={document} className="py-3">
                    {document}
                  </li>
                ))}
              </ul>
            </Reveal>

            {area.norm ? (
              <Reveal>
                <p className="mt-10 max-w-[62ch] border-l border-seal pl-4 text-sm text-ink-soft">{area.norm}</p>
              </Reveal>
            ) : null}

            <Reveal>
              <h2 className="mt-16 font-display text-2xl font-medium">Outras áreas</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/areas/${item.slug}`}
                      className="underline decoration-line underline-offset-4 hover:decoration-seal"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <AreaContact areaName={area.name} areaSlug={area.slug} />
        </div>
      </Container>
    </>
  );
}
