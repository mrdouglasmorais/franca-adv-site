/**
 * Equipe do cadastro interno (FrancaAdv `office-staff.ts`).
 * Texto do currículo transcrito dos arquivos enviados pelo escritório.
 * Sem PDF, e-mail pessoal, telefone pessoal ou fato fora desses arquivos.
 * Foto só quando o arquivo foi publicado pelo escritório.
 */

export type CurriculumEntry = {
  period?: string;
  title: string;
  detail?: string;
};

export type Curriculum = {
  education: CurriculumEntry[];
  complementary?: CurriculumEntry[];
  experience: CurriculumEntry[];
  focus: string[];
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  oab?: string;
  summary: string;
  photo?: string;
  curriculum?: Curriculum;
};

export const team: readonly TeamMember[] = [
  {
    slug: "maicon-ferreira-franca",
    name: "Maicon Ferreira França",
    role: "Fundador e CEO",
    oab: "OAB/SC 52540",
    photo: "/team/maicon.jpg",
    summary:
      "Fundador do escritório. Graduado em Direito e Administração pela UNIVALI, com pós-graduação em Direito Empresarial e Direito Civil.",
    curriculum: {
      focus: ["Direito Criminal", "Direito Civil", "Direito Empresarial"],
      education: [
        {
          period: "2009",
          title: "Bacharelado em Administração de Empresas",
          detail: "Universidade do Vale do Itajaí, UNIVALI.",
        },
        {
          period: "2014",
          title: "Bacharelado em Direito",
          detail: "Universidade do Vale do Itajaí, UNIVALI.",
        },
        {
          period: "2018",
          title: "Pós-graduação em Direito Empresarial",
          detail: "Universidade Damásio Educacional.",
        },
        {
          period: "2018",
          title: "Pós-graduação em Direito Civil",
          detail: "Universidade Damásio Educacional.",
        },
      ],
      complementary: [
        {
          period: "2010",
          title: "Oratória",
        },
        {
          period: "2010",
          title: "Divulgação e artigo científico",
          detail: "Universidade do Vale do Itajaí, UNIVALI.",
        },
      ],
      experience: [
        {
          title: "Fundador e CEO",
          detail:
            "Ferreira França Advocacia e Assessoria Jurídica. Fundação e gestão do escritório, com a advocacia e a administração da sociedade.",
        },
        {
          period: "2016–2018",
          title: "Departamento jurídico",
          detail: "Flash Vips. Condução de demandas jurídicas no ambiente empresarial.",
        },
        {
          period: "2012",
          title: "Executivo de contas tributárias",
          detail: "Grupo Villela Advocacia Soluções Tributárias.",
        },
        {
          period: "2009",
          title: "Conciliador em audiências de execução fiscal",
          detail: "Fórum de Balneário Camboriú.",
        },
      ],
    },
  },
  {
    slug: "maria-alice-gomes-marques",
    name: "Maria Alice Gomes Marques",
    role: "Advogada associada",
    oab: "OAB/SC 061535-B",
    summary:
      "Advogada associada em Itajaí. Graduada pela ULBRA em 2005, com especialização em Direito Público, Direito Processual Penal e Direito Imobiliário.",
    curriculum: {
      focus: ["Direito Imobiliário", "Direito Processual Penal", "Direito Público", "Direito Civil"],
      education: [
        {
          period: "2005",
          title: "Bacharelado em Ciências Jurídicas e Sociais",
          detail: "Universidade Luterana do Brasil, ULBRA, campus Gravataí/RS.",
        },
        {
          period: "2007",
          title: "Especialização em Direito Público",
          detail: "Faculdade Projeção/DF.",
        },
        {
          period: "2014",
          title: "Especialização em Direito Processual Penal",
          detail: "Instituto de Desenvolvimento Cultural, IDC/RS.",
        },
        {
          title: "Direito Imobiliário",
          detail: "Universidade do Vale do Itajaí, UNIVALI, campus Itajaí.",
        },
      ],
      experience: [
        {
          title: "Advogada associada",
          detail: "Ferreira França Advocacia e Assessoria Jurídica.",
        },
      ],
    },
  },
  {
    slug: "monike-eva-oliveira-araujo",
    name: "Monike Eva Oliveira Araujo",
    role: "Advogada",
    oab: "OAB/SC 075307",
    summary:
      "Advogada em Itajaí. Graduada pela UNIVALI em 2018, com pós-graduação em Direito Processual Civil e Direito Imobiliário.",
    curriculum: {
      focus: ["Direito Imobiliário", "Direito Processual Civil", "Direito Civil"],
      education: [
        {
          period: "2013–2018",
          title: "Bacharelado em Direito",
          detail: "Universidade do Vale do Itajaí, UNIVALI.",
        },
        {
          period: "2019",
          title: "Pós-graduação em Direito Processual Civil",
          detail: "Universidade do Vale do Itajaí, UNIVALI. Concluída.",
        },
        {
          period: "2021",
          title: "Pós-graduação em Direito Imobiliário",
          detail: "Complexo Educacional Renato Saraiva, CERS. Concluída.",
        },
        {
          period: "2026",
          title: "Pós-graduação em Direito Processual Civil",
          detail: "Gran Tecnologia e Educação S/A. Concluída.",
        },
        {
          period: "2026",
          title: "Pós-graduação em Direito Imobiliário",
          detail: "Gran Tecnologia e Educação S/A. Concluída.",
        },
        {
          period: "2026",
          title: "Pós-graduação em Direito Imobiliário",
          detail: "Universidade do Vale do Itajaí, UNIVALI. Em andamento.",
        },
      ],
      experience: [
        {
          title: "Prática durante a graduação",
          detail:
            "Experiência junto ao Tribunal de Justiça de Santa Catarina, congressos de Direito Processual Civil, eventos técnico-científicos e projetos de extensão.",
        },
      ],
    },
  },
  {
    slug: "edivania-fonseca-mota",
    name: "Edivânia Fonseca Mota",
    role: "Assistente jurídica",
    summary:
      "Assistente jurídica do escritório. Bacharel em Administração e pós-graduada em Gestão Pública. Cursa Direito na UNIASSELVI, em fase de conclusão.",
    curriculum: {
      focus: [
        "Direito Civil",
        "Direito Processual Civil",
        "Direito Empresarial",
        "Direito Imobiliário",
        "Contratos",
      ],
      education: [
        {
          title: "Direito",
          detail: "Centro Universitário Leonardo da Vinci, UNIASSELVI. Em fase de conclusão.",
        },
        {
          period: "2010",
          title: "Bacharelado em Administração de Empresas",
          detail: "UESSBA.",
        },
        {
          period: "2012",
          title: "Pós-graduação em Gestão Pública",
          detail: "UESSBA.",
        },
        {
          title: "Técnico em Transações Imobiliárias",
          detail: "Em andamento.",
        },
      ],
      complementary: [
        { title: "Oratória" },
        { title: "Vendas" },
        { title: "Atendimento" },
        { title: "Informática" },
      ],
      experience: [
        {
          title: "Assistente jurídica",
          detail: "Ferreira França Advocacia e Assessoria Jurídica.",
        },
        {
          title: "Áreas administrativa, empresarial, comercial e imobiliária",
          detail:
            "Mais de 20 anos de trabalho em gestão, contratos, negociação, atendimento e análise documental. No mercado imobiliário, negociação de compra, venda e locação.",
        },
      ],
    },
  },
  {
    slug: "sabrina-soares-melo",
    name: "Sabrina Soares Melo",
    role: "Estagiária de Direito",
    summary: "Estagiária de Direito do escritório. Acadêmica de Direito na UNIASSELVI.",
    curriculum: {
      focus: ["Prática jurídica", "Rotinas administrativas", "Atendimento ao público"],
      education: [
        {
          title: "Direito",
          detail: "Centro Universitário Leonardo da Vinci, UNIASSELVI. Cursando.",
        },
        {
          period: "2019",
          title: "Técnico em Recursos Pesqueiros",
          detail:
            "Instituto Federal de Santa Catarina, IFSC. Ensino médio integrado, com administração, empreendedorismo, controle de qualidade e segurança do trabalho.",
        },
      ],
      experience: [
        {
          title: "Estagiária de Direito",
          detail: "Ferreira França Advocacia e Assessoria Jurídica.",
        },
        {
          period: "2022–2023",
          title: "Estágio na Polícia Federal",
          detail: "Posto de Emissão de Passaportes e Registro de Estrangeiros.",
        },
        {
          title: "Rotina da advocacia",
          detail: "Atividades de escritório antes de integrar a equipe.",
        },
      ],
    },
  },
  {
    slug: "celso-schaadt-neto",
    name: "Celso Schaadt Neto",
    role: "Jurídico",
    summary:
      "Integra a equipe jurídica do escritório, na área criminal. Bacharelando em Direito pela UNIASSELVI.",
    curriculum: {
      focus: ["Direito Penal", "Direito Processual Penal", "Prática criminal"],
      education: [
        {
          title: "Direito",
          detail: "Centro Universitário Leonardo da Vinci, UNIASSELVI. Bacharelando.",
        },
      ],
      experience: [
        {
          title: "Equipe jurídica",
          detail:
            "Ferreira França Advocacia e Assessoria Jurídica. Acompanhamento de procedimentos e processos criminais, análise documental e pesquisa jurídica, legislativa e jurisprudencial.",
        },
      ],
    },
  },
  {
    slug: "fabiana-de-lima-berwanger",
    name: "Fabiana de Lima Berwanger",
    role: "Financeiro",
    summary: "Cuida da área financeira do escritório.",
  },
];

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}

export function initialsOf(name: string) {
  const parts = name.split(" ").filter((part) => !["de", "da", "do", "dos", "e"].includes(part.toLowerCase()));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase();
}
