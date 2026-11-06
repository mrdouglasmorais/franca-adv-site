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
  paragraphs: readonly string[];
  photos?: readonly string[];
  curriculum?: Curriculum;
};

export const team: readonly TeamMember[] = [
  {
    slug: "maicon-ferreira-franca",
    name: "Maicon Ferreira França",
    role: "Fundador e CEO",
    oab: "OAB/SC 52540",
    photos: ["/team/maicon-1.jpeg", "/team/maicon-2.jpeg"],
    summary:
      "Fundador do escritório. Graduado em Direito e Administração pela UNIVALI, com pós-graduação em Direito Empresarial e Direito Civil.",
    paragraphs: [
      "Advogado e administrador de empresas, graduado pela Universidade do Vale do Itajaí (UNIVALI). A trajetória parte da integração entre Direito, gestão empresarial e estratégia jurídica.",
      "Fundador da Ferreira França Advocacia e Assessoria Jurídica, conduz a advocacia e a gestão da sociedade. A atuação se concentra em Direito Criminal, Direito Civil e Direito Empresarial.",
      "A formação em Direito e em Administração de Empresas liga a análise jurídica à estrutura e à dinâmica da empresa. Em cada demanda entram também os aspectos estratégicos, patrimoniais e negociais.",
      "No segmento tributário, foi executivo de contas tributárias no Grupo Villela Advocacia Soluções Tributárias. Também respondeu pela gestão do departamento jurídico da Flash Vips.",
      "A formação acadêmica inclui pós-graduação em Direito Empresarial e em Direito Civil, com cursos de extensão, fóruns, debates, mesas-redondas, palestras, conferências e congressos.",
      "Como fundador e CEO, conduz o escritório e as demandas dos clientes com a experiência jurídica, o conhecimento empresarial e a gestão da sociedade.",
    ],
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
    photos: ["/team/maria-alice.jpeg"],
    summary:
      "Advogada associada em Itajaí. Graduada pela ULBRA em 2005, com especialização em Direito Público, Direito Processual Penal e Direito Imobiliário.",
    paragraphs: [
      "Advogada associada em Itajaí. Graduou-se em Ciências Jurídicas e Sociais pela Universidade Luterana do Brasil (ULBRA), campus Gravataí/RS, em 2005.",
      "Especializou-se em Direito Público pela Faculdade Projeção/DF, em 2007, e em Direito Processual Penal pelo Instituto de Desenvolvimento Cultural (IDC/RS), em 2014.",
      "Complementa a formação com Direito Imobiliário na Universidade do Vale do Itajaí (UNIVALI), campus Itajaí.",
      "No escritório, atua em Direito Imobiliário, Direito Processual Penal, Direito Público e Direito Civil.",
    ],
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
    photos: ["/team/monike.jpeg"],
    summary:
      "Advogada em Itajaí. Graduada pela UNIVALI em 2018, com pós-graduação em Direito Processual Civil e Direito Imobiliário.",
    paragraphs: [
      "Advogada em Itajaí. Graduou-se em Direito pela Universidade do Vale do Itajaí (UNIVALI) entre 2013 e 2018.",
      "Concluiu pós-graduação em Direito Processual Civil pela UNIVALI, em 2019, e em Direito Imobiliário pelo Complexo Educacional Renato Saraiva (CERS), em 2021.",
      "Em 2026, concluiu novas pós-graduações em Direito Processual Civil e em Direito Imobiliário na Gran Tecnologia e Educação. Cursa Direito Imobiliário na UNIVALI.",
      "Durante a graduação, teve prática junto ao Tribunal de Justiça de Santa Catarina, em congressos de Direito Processual Civil, eventos técnico-científicos e projetos de extensão.",
      "Atua em Direito Imobiliário, Direito Processual Civil e Direito Civil.",
    ],
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
    photos: ["/team/edvania.jpeg"],
    summary:
      "Assistente jurídica do escritório. Bacharel em Administração e pós-graduada em Gestão Pública. Cursa Direito na UNIASSELVI, em fase de conclusão.",
    paragraphs: [
      "Assistente jurídica do escritório. Cursa Direito no Centro Universitário Leonardo da Vinci (UNIASSELVI), em fase de conclusão.",
      "É bacharel em Administração de Empresas pela UESSBA, em 2010, e pós-graduada em Gestão Pública pela mesma instituição, em 2012. Cursa Técnico em Transações Imobiliárias.",
      "A formação complementar inclui oratória, vendas, atendimento e informática.",
      "Reúne mais de 20 anos nas áreas administrativa, empresarial, comercial e imobiliária, em gestão, contratos, negociação, atendimento e análise documental. No mercado imobiliário, conduz negociação de compra, venda e locação.",
      "No escritório, apoia Direito Civil, Direito Processual Civil, Direito Empresarial, Direito Imobiliário e Contratos.",
    ],
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
    photos: ["/team/sabrina.jpeg", "/team/sabrina-2.jpeg"],
    summary: "Estagiária de Direito do escritório. Acadêmica de Direito na UNIASSELVI.",
    paragraphs: [
      "Estagiária de Direito do escritório. Cursa Direito no Centro Universitário Leonardo da Vinci (UNIASSELVI).",
      "Concluiu o Técnico em Recursos Pesqueiros no Instituto Federal de Santa Catarina (IFSC), em 2019, com ensino médio integrado em administração, empreendedorismo, controle de qualidade e segurança do trabalho.",
      "Entre 2022 e 2023, estagiou na Polícia Federal, no Posto de Emissão de Passaportes e Registro de Estrangeiros.",
      "Antes de integrar a equipe, já acompanhava a rotina de um escritório de advocacia. Aqui, atua na prática jurídica, nas rotinas administrativas e no atendimento ao público.",
    ],
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
    photos: ["/team/neto.jpeg", "/team/neto-2.jpeg", "/team/neto-3.jpeg"],
    summary:
      "Integra a equipe jurídica do escritório, na área criminal. Bacharelando em Direito pela UNIASSELVI.",
    paragraphs: [
      "Integra a equipe jurídica do escritório, na área criminal. É bacharelando em Direito pelo Centro Universitário Leonardo da Vinci (UNIASSELVI).",
      "Acompanha procedimentos e processos criminais, analisa documentos e faz pesquisa jurídica, legislativa e jurisprudencial.",
      "A atuação cobre Direito Penal, Direito Processual Penal e a prática criminal.",
    ],
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
    photos: ["/team/fabi-1.jpeg", "/team/fabi-2.jpeg", "/team/fabi-3.jpeg"],
    summary: "Cuida da área financeira do escritório.",
    paragraphs: ["Cuida da área financeira do escritório em Itajaí."],
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
