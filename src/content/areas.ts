export type PracticeArea = {
  slug: string;
  name: string;
  summary: string;
  problems: readonly string[];
  seoTitle: string;
  seoDescription: string;
};

/** Textos de área publicados no site atual. Sem promessa de resultado. */
export const practiceAreas: readonly PracticeArea[] = [
  {
    slug: "direito-civil",
    name: "Direito Civil",
    summary:
      "Conflitos patrimoniais, responsabilidade civil, indenizações, posse, propriedade e obrigações em geral.",
    problems: [
      "Conflitos patrimoniais",
      "Responsabilidade civil e indenizações",
      "Posse, propriedade e obrigações",
    ],
    seoTitle: "Direito Civil em Itajaí",
    seoDescription:
      "Direito Civil em Itajaí/SC: patrimônio, responsabilidade civil, indenizações, posse e obrigações.",
  },
  {
    slug: "direito-de-familia",
    name: "Direito de Família",
    summary:
      "Divórcio, pensão alimentícia, guarda, regulamentação de visitas, união estável e inventário.",
    problems: [
      "Divórcio e união estável",
      "Guarda e regulamentação de visitas",
      "Pensão alimentícia e inventário",
    ],
    seoTitle: "Direito de Família em Itajaí",
    seoDescription:
      "Direito de Família em Itajaí/SC: divórcio, guarda, pensão alimentícia, união estável e inventário.",
  },
  {
    slug: "direito-do-trabalho",
    name: "Direito do Trabalho",
    summary:
      "Demandas de empregados e empregadores: ações trabalhistas, rescisões, acidentes de trabalho e passivos.",
    problems: ["Ações trabalhistas", "Rescisões e passivos", "Acidentes de trabalho"],
    seoTitle: "Direito do Trabalho em Itajaí",
    seoDescription:
      "Direito do Trabalho em Itajaí/SC para empregados e empregadores: ações, rescisões e acidentes.",
  },
  {
    slug: "direito-empresarial",
    name: "Direito Empresarial",
    summary:
      "Consultoria para empresas na abertura, na operação, na expansão e na reestruturação.",
    problems: [
      "Abertura e estruturação",
      "Operação e expansão",
      "Reestruturação",
    ],
    seoTitle: "Direito Empresarial em Itajaí",
    seoDescription:
      "Direito Empresarial em Itajaí/SC: abertura, operação, expansão e reestruturação de empresas.",
  },
  {
    slug: "direito-das-franquias",
    name: "Direito das Franquias e dos Franqueados",
    summary:
      "Contratos de franquia, compliance e suporte jurídico a franqueadores e franqueados.",
    problems: [
      "Contratos de franquia",
      "Compliance de rede",
      "Suporte a franqueadores e franqueados",
    ],
    seoTitle: "Direito das Franquias",
    seoDescription:
      "Direito das Franquias: contratos, compliance e suporte a franqueadores e franqueados.",
  },
  {
    slug: "contratos",
    name: "Contratos",
    summary:
      "Elaboração, revisão e negociação de contratos civis e empresariais, com foco em prevenção de riscos.",
    problems: [
      "Elaboração e revisão",
      "Negociação de cláusulas",
      "Prevenção de riscos",
    ],
    seoTitle: "Contratos civis e empresariais",
    seoDescription:
      "Elaboração, revisão e negociação de contratos civis e empresariais em Itajaí/SC.",
  },
  {
    slug: "assessoria-juridica-empresarial",
    name: "Assessoria Jurídica Empresarial",
    summary:
      "Atendimento preventivo e contencioso para a proteção legal da operação da empresa.",
    problems: [
      "Assessoria preventiva",
      "Contencioso empresarial",
      "Acompanhamento contínuo",
    ],
    seoTitle: "Assessoria Jurídica Empresarial",
    seoDescription:
      "Assessoria jurídica empresarial preventiva e contenciosa para empresas em Itajaí/SC.",
  },
  {
    slug: "direito-criminal",
    name: "Direito Criminal",
    summary:
      "Defesa em processos criminais, com leitura dos autos e estratégia definida para o caso.",
    problems: ["Defesa criminal", "Acompanhamento do processo", "Leitura dos autos"],
    seoTitle: "Direito Criminal em Itajaí",
    seoDescription:
      "Defesa em Direito Criminal em Itajaí/SC, com acompanhamento do processo a partir dos autos.",
  },
] as const;

export function getPracticeArea(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}
