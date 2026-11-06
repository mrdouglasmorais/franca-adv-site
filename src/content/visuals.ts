import { firm } from "@/content/firm";

/** Ilustrações institucionais de FrancaAdv (`public/image/hero`). Não são fotos do escritório. */

export type Illustration = {
  src: string;
  alt: string;
  kicker: string;
  line: string;
};

export const illustrations: readonly Illustration[] = [
  {
    src: "/image/hero/ilustration-a.webp",
    alt: "Ilustração de uma sala escura com o brasão do escritório e a cidade ao fundo",
    kicker: "Atendimento",
    line: "Segunda a sexta, das 8h às 18h, no escritório.",
  },
  {
    src: "/image/hero/ilustration-b.webp",
    alt: "Ilustração de volumes arquitetônicos escuros com o brasão do escritório",
    kicker: "Estrutura",
    line: "A leitura começa pelos documentos, pelos fatos e pelo prazo.",
  },
  {
    src: "/image/hero/ilustration-c.webp",
    alt: "Ilustração de uma sala de reunião com vista para a cidade e o brasão do escritório",
    kicker: "Reunião",
    line: "Civil, imobiliário, família, trabalho, empresarial, franquias, contratos e criminal.",
  },
  {
    src: "/image/hero/ilustration-d.webp",
    alt: "Ilustração de um corredor escuro com sala ao fundo e o brasão do escritório",
    kicker: "Presença",
    line: "Sede em Itajaí. Acompanhamento remoto nos outros estados.",
  },
] as const;

export const officeSlides = [
  {
    ...illustrations[0],
    kicker: "Atendimento",
    title: "No escritório",
    line: `${firm.contact.hours}. ${firm.address.full}.`,
  },
  {
    ...illustrations[1],
    kicker: "Estrutura",
    title: "Os papéis primeiro",
    line: "Documentos, fatos e prazos. É o material com que a equipe começa.",
  },
  {
    ...illustrations[2],
    kicker: "Reunião",
    title: "O caso na mesa",
    line: "Compra, venda, locação, contrato e o conflito que já chegou.",
  },
  {
    ...illustrations[3],
    kicker: "Sede",
    title: "Sede em Itajaí",
    line: "A sede é em Itajaí/SC. Nos outros estados, o acompanhamento é remoto.",
  },
] as const;

export function illustrationFor(index: number) {
  const safe = ((index % illustrations.length) + illustrations.length) % illustrations.length;
  return illustrations[safe];
}

export const statements = [
  {
    ...illustrations[0],
    title: "O que você reúne",
    text: "Fatos, documentos e prazos. É o material com que a equipe começa.",
    href: "/contato",
    action: "Falar com o escritório",
  },
  {
    ...illustrations[1],
    title: "Orientar ou processar",
    text: "Orientar, para prevenir o conflito. Processar, quando a disputa já existe.",
    href: "/areas",
    action: "Ver as áreas",
  },
  {
    ...illustrations[2],
    title: "Onde e quando",
    text: "No escritório em Itajaí, de segunda a sexta, das 8h às 18h. Nos outros estados, o acompanhamento é remoto.",
    href: "/equipe",
    action: "Ver a equipe",
  },
  {
    ...illustrations[3],
    title: "Quer trabalhar aqui",
    text: "Advogados, estagiários, correspondentes e apoio administrativo. O currículo chega à equipe.",
    href: "/carreiras",
    action: "Enviar currículo",
  },
] as const;
