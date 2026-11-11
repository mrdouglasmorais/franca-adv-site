import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { firm } from "@/content/firm";
import { getTeamMember, initialsOf, team } from "@/content/team";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { CareerTimeline, FocusFlags } from "@/components/site/career-timeline";
import { PortraitSlides } from "@/components/site/portrait-slides";
import { WhatsAppMark } from "@/components/site/whatsapp-mark";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Prose } from "@/components/ui/prose";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};
  const oab = member.oab ? ` ${member.oab}.` : "";
  const photo = member.photos?.[0];
  return buildMetadata({
    title: member.name,
    description: `${member.name}, ${member.role} na Ferreira França Advogados em Itajaí/SC.${oab}`,
    path: `/equipe/${member.slug}`,
    ...(photo
      ? {
          image: photo,
          imageAlt: `${member.name}, ${member.role}`,
        }
      : {}),
  });
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Escritório", path: "/equipe" },
    { name: member.name, path: `/equipe/${member.slug}` },
  ];

  return (
    <Container className="py-16 md:py-24">
      <JsonLd data={personSchema(member)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumb items={crumbs} />
      <div className="mt-10 space-y-10">
        {member.photos?.length ? (
          <PortraitSlides
            photos={member.photos}
            name={member.name}
            controls={member.photos.length > 1}
            sizes="(min-width: 1120px) 70rem, 100vw"
            priority
            className="w-full max-w-[70rem]"
          />
        ) : (
          <div className="image-frame relative aspect-[4/5] w-full max-w-[28rem] overflow-hidden bg-ink">
            <div className="grid h-full place-items-center text-gold-soft">
              <span className="font-display text-7xl font-medium tracking-tight">{initialsOf(member.name)}</span>
            </div>
          </div>
        )}
        <div className="max-w-[42rem]">
          <Eyebrow tone="seal">{firm.address.city} / {firm.address.region}</Eyebrow>
          <Heading level={1} className="mt-3 max-w-[16ch]">
            {member.name}
          </Heading>
          <p className="mt-3 text-sm tracking-[0.08em] text-ink-soft uppercase">
            {member.role}
            {member.oab ? ` · ${member.oab}` : ""}
          </p>
          {member.curriculum?.focus.length ? (
            <div className="mt-8">
              <Eyebrow>Atuação</Eyebrow>
              <FocusFlags names={member.curriculum.focus} />
            </div>
          ) : null}
          <Prose className="mt-8 space-y-4">
            {member.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contato" pill>
              Falar com o escritório
            </Button>
            <Button href={firm.contact.whatsappUrl} tone="ghost">
              <WhatsAppMark />
              Chamar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
      {member.curriculum ? <CareerTimeline curriculum={member.curriculum} slug={member.slug} /> : null}
    </Container>
  );
}
