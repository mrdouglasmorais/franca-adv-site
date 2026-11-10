import { practiceAreas, getPracticeArea } from "@/content/areas";
import { firm, nav, resolveSiteUrl } from "@/content/firm";
import { getTeamMember, team } from "@/content/team";

function origin() {
  return resolveSiteUrl();
}

function href(path: string) {
  if (path === "/") return `${origin()}/`;
  return `${origin()}${path}`;
}

const pages = [
  { path: "/", title: "Início", description: firm.description },
  {
    path: "/areas",
    title: "Áreas de atuação",
    description: practiceAreas.map((area) => area.name.replace(/^Direito (de |das |do |dos )?/, "")).join(", ") + ".",
  },
  {
    path: "/equipe",
    title: "Escritório",
    description: "Advogados da OAB/SC e a equipe do escritório em Itajaí.",
  },
  {
    path: "/publicacoes",
    title: "Publicações",
    description: "Em breve, artigos do escritório. Acórdãos públicos do TJDFT por área — não são casos do escritório.",
  },
  {
    path: "/carreiras",
    title: "Carreiras",
    description: "Cadastro de advogados, estagiários, correspondentes e apoio administrativo.",
  },
  {
    path: "/contato",
    title: "Contato",
    description: `${firm.address.full}. ${firm.contact.hours}.`,
  },
  {
    path: "/privacidade",
    title: "Privacidade",
    description: "Tratamento de dados de contato neste site, em conformidade com a LGPD.",
  },
] as const;

function navigation() {
  const lines = ["## Navegação", ""];
  for (const item of nav) {
    const page = pages.find((entry) => entry.path === item.href);
    lines.push(`- [${item.label}](${href(item.href)})${page ? `: ${page.description}` : ""}`);
  }
  lines.push(`- [Índice para agentes](${href("/llms.txt")}): mapa curto do site em Markdown.`);
  lines.push(`- [WhatsApp](${firm.contact.whatsappUrl})`);
  return lines.join("\n");
}

function contactBlock() {
  return [
    "## Contato",
    "",
    `- Endereço: ${firm.address.full}`,
    `- Telefones: ${firm.contact.phonePrimaryDisplay} e ${firm.contact.phoneSecondaryDisplay}`,
    `- WhatsApp: ${firm.contact.whatsappUrl}`,
    `- E-mail: ${firm.contact.email}`,
    `- Horário: ${firm.contact.hours}`,
    `- Mapa: ${firm.mapUrl}`,
    `- Instagram: ${firm.contact.instagramUrl}`,
  ].join("\n");
}

export function normalizePath(input: string) {
  let path = input.trim();
  try {
    path = decodeURIComponent(path);
  } catch {
    return null;
  }
  if (!path.startsWith("/") || path.includes("\\") || path.includes("\0")) return null;
  path = path.split("?")[0]?.split("#")[0] ?? "/";
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.split("/").some((part) => part === "." || part === "..")) return null;
  return path || "/";
}

export function llmsTxt() {
  const areaLines = practiceAreas.map(
    (area) => `- [${area.name}](${href(`/areas/${area.slug}`)}): ${area.summary}`,
  );
  const teamLines = team.map((member) => {
    const oab = member.oab ? `, ${member.oab}` : "";
    return `- [${member.name}](${href(`/equipe/${member.slug}`)}): ${member.role}${oab}. ${member.summary}`;
  });
  const pageLines = pages.map(
    (page) => `- [${page.title}](${href(page.path)}): ${page.description}`,
  );

  return [
    `# ${firm.name}`,
    "",
    `> ${firm.description}`,
    "",
    `${firm.leadership.name}, ${firm.leadership.role}, ${firm.leadership.oab}. ${firm.leadership.formation}`,
    "",
    contactBlock(),
    "",
    "## Páginas",
    "",
    ...pageLines,
    "",
    "## Áreas",
    "",
    ...areaLines,
    "",
    "## Equipe",
    "",
    ...teamLines,
    "",
    "## Para agentes",
    "",
    "- Idioma: pt-BR.",
    "- Cada página HTML também responde `text/markdown` quando `Accept` prefere `text/markdown` a `text/html`.",
    "- O tipo do site é `business`.",
    "- Não há API pública de atendimento. O contato é o formulário em /contato, o telefone ou o WhatsApp.",
    "- Clientes publicados: Incorpora Engenharia, Bravo, Vaapty, Auto Moov, Luci Luci e Recebecom. Não atribuir outro nome de cliente, número de processos ou resultado de causa.",
    "- Atendimento presencial: Santa Catarina, Paraná e Rio Grande do Sul. Atuação principal, com correspondente: São Paulo, Rio de Janeiro e Bahia. Nos demais estados, o acompanhamento é remoto. No rodapé e no atendimento nacional, a inscrição publicada é a OAB/SC PJ da sociedade.",
    "",
  ].join("\n");
}

export function markdownForPath(pathname: string) {
  const path = normalizePath(pathname);
  if (!path) return null;

  if (path === "/llms.txt") return llmsTxt();

  const page = pages.find((entry) => entry.path === path);
  if (path === "/") {
    return [
      `# ${firm.seo.defaultTitle}`,
      "",
      firm.description,
      "",
      "Advocacia em Itajaí para empresas e pessoas. O escritório avalia documentos e prazos e indica se cabe orientar ou processar. Não há promessa de resultado.",
      "",
      contactBlock(),
      "",
      "## Áreas",
      "",
      ...practiceAreas.map((area) => `- [${area.name}](${href(`/areas/${area.slug}`)}): ${area.summary}`),
      "",
      navigation(),
      "",
    ].join("\n");
  }

  if (path === "/areas") {
    return [
      `# Áreas de atuação | ${firm.shortName}`,
      "",
      page?.description ?? "",
      "",
      ...practiceAreas.map((area) => `- [${area.name}](${href(`/areas/${area.slug}`)}): ${area.summary}`),
      "",
      navigation(),
      "",
    ].join("\n");
  }

  if (path.startsWith("/areas/")) {
    const area = getPracticeArea(path.slice("/areas/".length));
    if (!area) return null;
    return [
      `# ${area.seoTitle} | ${firm.shortName}`,
      "",
      area.seoDescription,
      "",
      area.lead,
      "",
      area.context,
      "",
      area.reading,
      "",
      "## O que costuma chegar",
      "",
      ...area.problems.map((problem) => `- ${problem.title}: ${problem.detail}`),
      "",
      "## O que reunir",
      "",
      ...area.documents.map((document) => `- ${document}`),
      ...(area.norm ? ["", `Norma: ${area.norm}`] : []),
      "",
      `- [Falar sobre esta área](${href("/contato")})`,
      `- [WhatsApp](${firm.contact.whatsappUrl})`,
      "",
      navigation(),
      "",
    ].join("\n");
  }

  if (path === "/equipe") {
    return [
      `# Escritório | ${firm.shortName}`,
      "",
      "Advogados da OAB/SC e a equipe do escritório em Itajaí.",
      "",
      ...team.map((member) => {
        const oab = member.oab ? `, ${member.oab}` : "";
        return `- [${member.name}](${href(`/equipe/${member.slug}`)}): ${member.role}${oab}. ${member.summary}`;
      }),
      "",
      navigation(),
      "",
    ].join("\n");
  }

  if (path.startsWith("/equipe/")) {
    const member = getTeamMember(path.slice("/equipe/".length));
    if (!member) return null;
    const oab = member.oab ? ` ${member.oab}.` : "";
    return [
      `# ${member.name} | ${firm.shortName}`,
      "",
      `${member.name}, ${member.role} na ${firm.name} em Itajaí/SC.${oab}`,
      "",
      member.summary,
      "",
      `- [Falar com o escritório](${href("/contato")})`,
      `- [WhatsApp](${firm.contact.whatsappUrl})`,
      "",
      navigation(),
      "",
    ].join("\n");
  }

  if (path === "/contato") {
    return [
      `# Contato | ${firm.shortName}`,
      "",
      "Conte a demanda no formulário. A mensagem entra na fila, de segunda a sexta, das 8h às 18h.",
      "",
      contactBlock(),
      "",
      `- [Formulário](${href("/contato")})`,
      "",
      navigation(),
      "",
    ].join("\n");
  }

  if (path === "/carreiras") {
    return [
      `# Carreiras | ${firm.shortName}`,
      "",
      "Advogados, estagiários, correspondentes e apoio administrativo. O cadastro chega à equipe com o arquivo.",
      "",
      "Funções: Advogado, Estagiário, Correspondente jurídico, Assistente administrativo, Outro.",
      "",
      `- [Enviar currículo](${href("/carreiras")})`,
      "",
      navigation(),
      "",
    ].join("\n");
  }

  if (path === "/publicacoes") {
    return [
      `# Publicações | ${firm.shortName}`,
      "",
      "Em breve, artigos do escritório. Acórdãos públicos do TJDFT por área — não são casos do escritório. Não é parecer.",
      "",
      `- [Falar com o escritório](${firm.contact.whatsappUrl})`,
      "",
      navigation(),
      "",
    ].join("\n");
  }

  if (path === "/privacidade") {
    return [
      `# Privacidade | ${firm.shortName}`,
      "",
      `O controlador deste site é ${firm.name}, com atendimento em ${firm.address.full}. O canal do titular é ${firm.contact.email}.`,
      "",
      "Esta versão não usa cookies de análise nem de marketing e não incorpora mapas ou scripts de anúncio. O aviso de privacidade guarda só a escolha neste navegador. A navegação não depende desse aceite.",
      "",
      "O formulário de contato e o cadastro de candidaturas enviam nome, contato, mensagem e, na seleção, o currículo para o sistema interno do escritório. Esses dados servem para responder à demanda ou conduzir a seleção. A base é o procedimento preliminar a pedido do titular e o legítimo interesse de responder (Lei 13.709/2018, art. 7º, V e IX).",
      "",
      "WhatsApp, telefone e e-mail seguem a mesma finalidade. O WhatsApp é um serviço da Meta, com política própria.",
      "",
      "O titular pode pedir confirmação, acesso, correção ou exclusão pelo e-mail acima.",
      "",
      navigation(),
      "",
    ].join("\n");
  }

  return null;
}

export const markdownHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  "X-Content-Type-Options": "nosniff",
} as const;
