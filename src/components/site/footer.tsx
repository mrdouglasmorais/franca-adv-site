import Image from "next/image";
import Link from "next/link";
import { practiceAreas } from "@/content/areas";
import { firm, nav } from "@/content/firm";
import { oabByState, oabEntries } from "@/content/registrations";
import { BackToTopButton } from "@/components/site/back-to-top";
import { SocialLinks } from "@/components/site/social-links";
import { Container } from "@/components/ui/container";

const officeLinks = [
  ...nav.filter((item) => item.href !== "/areas"),
  { href: "/privacidade", label: "Privacidade" },
  { href: "/#atendimento-nacional", label: "Atendimento nacional" },
] as const;

export function Footer() {
  const groups = oabByState();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-24 text-paper" style={{ viewTransitionName: "site-footer" }}>
      <Container className="grid gap-10 border-b border-line-light py-14 lg:grid-cols-[1.3fr_0.9fr]">
        <div>
          <Image
            src={firm.assets.wordmark}
            alt={firm.legalName}
            width={firm.assets.wordmarkWidth}
            height={firm.assets.wordmarkHeight}
            className="h-8 w-auto"
            sizes="220px"
            draggable={false}
          />
          <p className="mt-4 max-w-[48ch] text-sm leading-6 text-gold-soft">
            {firm.name} atua de forma consultiva e contenciosa para empresas e pessoas. A sede é em{" "}
            {firm.address.city}/{firm.address.region}. O presencial cobre Santa Catarina, Paraná e Rio
            Grande do Sul.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            <div>
              <dt className="font-display text-2xl font-medium text-paper">{firm.foundingYear}</dt>
              <dd className="mt-1 text-xs tracking-[0.08em] text-gold-soft uppercase">Início</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-medium text-paper">{oabEntries.length}</dt>
              <dd className="mt-1 text-xs tracking-[0.08em] text-gold-soft uppercase">Inscrições</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-medium text-paper">{groups.length}</dt>
              <dd className="mt-1 text-xs tracking-[0.08em] text-gold-soft uppercase">Seccional</dd>
            </div>
          </dl>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">Fale com o escritório</p>
          <a
            href={firm.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 items-center rounded-full bg-seal px-4 text-sm font-medium text-on-seal"
          >
            Falar pelo WhatsApp
          </a>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-xs tracking-[0.12em] text-gold uppercase">Telefones</dt>
              <dd className="mt-1">
                <a href={`tel:${firm.contact.phonePrimary}`}>{firm.contact.phonePrimaryDisplay}</a>
                <span className="px-2 text-gold">·</span>
                <a href={`tel:${firm.contact.phoneSecondary}`}>{firm.contact.phoneSecondaryDisplay}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.12em] text-gold uppercase">E-mail</dt>
              <dd className="mt-1">
                <a href={`mailto:${firm.contact.email}`}>{firm.contact.email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.12em] text-gold uppercase">Escritório</dt>
              <dd className="mt-1">{firm.address.full}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.12em] text-gold uppercase">Atendimento</dt>
              <dd className="mt-1">{firm.contact.hours}</dd>
            </div>
          </dl>
        </div>
      </Container>

      <Container className="grid gap-10 border-b border-line-light py-12 sm:grid-cols-2 lg:grid-cols-4">
        <nav aria-label="Áreas no rodapé">
          <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">Áreas de atuação</p>
          <ul className="mt-4 space-y-2 text-sm">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} className="hover:text-gold">
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Escritório no rodapé">
          <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">O escritório</p>
          <ul className="mt-4 space-y-2 text-sm">
            {officeLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">Canais</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={firm.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${firm.contact.email}`} className="hover:text-gold">
                {firm.contact.email}
              </a>
            </li>
            <li>
              <a href={firm.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Como chegar
              </a>
            </li>
            <li>
              <Link href="/contato" className="hover:text-gold">
                Formulário de contato
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">Redes</p>
          <SocialLinks className="mt-4" />
          <p className="mt-4 max-w-[28ch] text-sm text-gold-soft">
            Instagram e WhatsApp. O restante do contato fica nos telefones e no e-mail.
          </p>
        </div>
      </Container>

      <Container className="border-b border-line-light py-10">
        <div className="flex items-start justify-between gap-6 md:gap-8">
          <div>
            <p className="text-sm text-gold-soft">{firm.entity}</p>
            <p className="mt-1 text-sm whitespace-nowrap">CNPJ {firm.cnpj}</p>
          </div>
          <Image
            src="/seal/seal.png"
            alt="Selo de excelência Ferreira França Advogados, desde 2016"
            width={1254}
            height={1254}
            className="h-[8.4rem] w-[8.4rem] shrink-0 md:h-[10.8rem] md:w-[10.8rem]"
            draggable={false}
          />
        </div>
        <div className="mt-5 space-y-4">
          {groups.map((group) => (
            <div key={group.uf}>
              <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                {group.state}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.entries.map((entry) => (
                  <li
                    key={`${entry.uf}-${entry.number}`}
                    className="inline-flex items-baseline gap-2 border border-line-light px-3 py-2 text-[13px]"
                  >
                    <b className="text-[11px] tracking-[0.12em] text-gold">{entry.uf}</b>
                    <span className="tabular-nums">{entry.number}</span>
                    <span className="text-gold-soft">{entry.holder}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container className="flex flex-wrap items-start justify-between gap-4 py-6">
        <div className="max-w-[72ch] space-y-2 text-[12.5px] leading-relaxed text-gold-soft">
          <p>
            © {year} {firm.shortName}. Todos os direitos reservados.
          </p>
          <p>
            Conteúdo informativo, em conformidade com o Código de Ética e Disciplina da OAB e com o
            Provimento nº 205/2021 do Conselho Federal. Não é consulta jurídica, parecer nem promessa
            de resultado. Cada caso depende de análise individual.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.oab.org.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center"
          >
            <Image
              src="/brand/oab.png"
              alt="Ordem dos Advogados do Brasil"
              width={446}
              height={212}
              className="h-11 w-auto"
              draggable={false}
            />
          </a>
          <BackToTopButton />
        </div>
      </Container>
    </footer>
  );
}
