import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { firm } from "@/content/firm";
import { getTeamMember, initialsOf, team, type Curriculum, type CurriculumEntry } from "@/content/team";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { CareerTimeline } from "@/components/site/career-timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Prose } from "@/components/ui/prose";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

function entryKey(item: CurriculumEntry) {
  return `${item.period ?? ""}-${item.title}-${item.detail ?? ""}`;
}

function EntryList({ title, items }: { title: string; items: readonly CurriculumEntry[] }) {
  return (
    <div>
      <Heading level={3}>{title}</Heading>
      <ul className="mt-6 max-w-[68ch] border-t border-line">
        {items.map((item) => (
          <li
            key={entryKey(item)}
            className="grid gap-1 border-b border-line py-5 md:grid-cols-[8rem_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-6"
          >
            <p className={`text-sm text-ink-soft ${item.period ? "" : "hidden md:block"}`}>{item.period ?? ""}</p>
            <div>
              <p className="text-[17px] font-medium">{item.title}</p>
              {item.detail ? <p className="mt-1 text-[17px] leading-[1.6] text-ink-soft">{item.detail}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CurriculumSection({ curriculum, slug }: { curriculum: Curriculum; slug: string }) {
  return (
    <section className="mt-16 border-t border-line pt-12" aria-labelledby={`${slug}-curriculo`}>
      <Eyebrow>Currículo</Eyebrow>
      <Heading level={2} id={`${slug}-curriculo`} className="mt-3">
        Formação e experiência
      </Heading>
      <div className="mt-12 grid gap-14">
        <EntryList title="Formação" items={curriculum.education} />
        {curriculum.complementary?.length ? (
          <EntryList title="Formação complementar" items={curriculum.complementary} />
        ) : null}
        <EntryList title="Experiência" items={curriculum.experience} />
        <div>
          <Heading level={3}>Atuação</Heading>
          <ul className="mt-6 max-w-[68ch] border-t border-line">
            {curriculum.focus.map((item) => (
              <li key={item} className="border-b border-line py-4 text-[17px]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};
  const oab = member.oab ? ` ${member.oab}.` : "";
  return buildMetadata({
    title: member.name,
    description: `${member.name}, ${member.role} na Ferreira França Advogados em Itajaí/SC.${oab}`,
    path: `/equipe/${member.slug}`,
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
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(16rem,22rem)_1fr]">
        <div className="image-frame relative aspect-[4/5] overflow-hidden bg-ink">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              priority
              sizes="(min-width: 768px) 22rem, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="grid h-full place-items-center text-gold-soft">
              <span className="font-display text-7xl font-medium tracking-tight">{initialsOf(member.name)}</span>
            </div>
          )}
        </div>
        <div>
          <Eyebrow tone="seal">{firm.address.city} / {firm.address.region}</Eyebrow>
          <Heading level={1} className="mt-3 max-w-[16ch]">
            {member.name}
          </Heading>
          <p className="mt-3 text-sm tracking-[0.08em] text-ink-soft uppercase">
            {member.role}
            {member.oab ? ` · ${member.oab}` : ""}
          </p>
          <Prose className="mt-6">
            <p>{member.summary}</p>
          </Prose>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contato" pill>
              Falar com o escritório
            </Button>
            <Button href={firm.contact.whatsappUrl} tone="ghost">
              Chamar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
      {member.curriculum ? (
        member.slug === "maicon-ferreira-franca" ? (
          <CareerTimeline curriculum={member.curriculum} slug={member.slug} />
        ) : (
          <CurriculumSection curriculum={member.curriculum} slug={member.slug} />
        )
      ) : null}
    </Container>
  );
}
