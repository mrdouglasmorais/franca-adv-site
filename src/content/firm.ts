/**
 * Identidade e contato: site público e `src/config/site.ts` do FrancaAdv.
 * CNPJ, CEP, sala e inscrições: modelos e equipe interna do FrancaAdv
 * (`office-models.ts`, `office-staff.ts`). Sem foto.
 */

function trimTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

function withHttps(hostOrUrl: string) {
  const value = hostOrUrl.trim();
  if (value.startsWith("http://") || value.startsWith("https://")) return trimTrailingSlash(value);
  return `https://${trimTrailingSlash(value)}`;
}

/**
 * Origem de canônico, Open Graph, sitemap e JSON-LD.
 * NEXT_PUBLIC_SITE_URL vence. Na Vercel, sem essa variável, usa o domínio
 * de produção do projeto para a imagem não apontar para outro site.
 */
export function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return withHttps(fromEnv);

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercelHost) return withHttps(vercelHost);

  return "https://adv.grupoferreirafranca.com.br";
}

export const firm = {
  name: "Ferreira França Advogados e Associados",
  shortName: "Ferreira França Advogados",
  legalName: "Ferreira França Advocacia e Assessoria Empresarial",
  tagline: "Advocacia e Assessoria Empresarial",
  description:
    "Advocacia e assessoria empresarial em Itajaí/SC. Atuação consultiva e contenciosa em civil, imobiliário, família, trabalho, empresarial, contratos e criminal.",
  seo: {
    defaultTitle: "Ferreira França Advogados | Advocacia em Itajaí",
    titleTemplate: "%s | Ferreira França Advogados",
    ogImageAlt: "Ferreira França Advogados e Associados — advocacia em Itajaí/SC",
    keywords: [
      "advogados Itajaí",
      "advocacia Itajaí",
      "escritório de advocacia Santa Catarina",
      "Ferreira França Advogados",
      "direito empresarial Itajaí",
      "assessoria jurídica empresarial",
      "advogado Itajaí SC",
    ],
  },
  entity: "Ferreira França Sociedade de Advocacia",
  cnpj: "52.426.341/0001-27",
  foundingYear: 2016,
  sealLine: "Mais de 15 anos de atuação.",
  sealNote: "A equipe atende pessoas e empresas em Itajaí desde 2016.",
  address: {
    street: "Rua Lauro Muller, 853, sala 01",
    neighborhood: "Fazenda",
    city: "Itajaí",
    region: "SC",
    postalCode: "88301-401",
    country: "BR",
    full: "Rua Lauro Muller, 853, sala 01 — Fazenda, Itajaí/SC, CEP 88301-401",
  },
  contact: {
    email: "contato@grupoferreirafranca.com.br",
    phonePrimary: "+5547991344933",
    phoneSecondary: "+5547984710389",
    phonePrimaryDisplay: "(47) 99134-4933",
    phoneSecondaryDisplay: "(47) 98471-0389",
    hours: "Segunda a sexta, das 8h às 18h",
    hoursShort: "Seg–sex, 8h–18h",
    whatsappUrl: "https://wa.me/5547984710389",
    instagramUrl: "https://www.instagram.com/ferreirafrancaadvocacia/",
  },
  hoursSpec: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
    opens: "08:00",
    closes: "18:00",
  },
  leadership: {
    name: "Maicon Ferreira França",
    role: "CEO",
    oab: "OAB/SC 52540",
    formation: "Formação em Direito e Administração.",
    summary:
      "Conduz o Grupo Ferreira França na advocacia consultiva e contenciosa, para pessoas físicas e jurídicas, com atendimento a partir de Itajaí.",
  },
  nexoUrl: "https://nexo.grupoferreirafranca.com.br",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua%20Lauro%20Muller%2C%20853%2C%20Itaja%C3%AD%2C%20SC",
  assets: {
    wordmark: "/brand/logo-wordmark.png",
    wordmarkWidth: 960,
    wordmarkHeight: 134,
    brasao: "/brand/brasao.png",
    brasaoWidth: 256,
    brasaoHeight: 266,
  },
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/areas", label: "Áreas" },
  { href: "/equipe", label: "Escritório" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/carreiras", label: "Carreiras" },
  { href: "/contato", label: "Contato" },
] as const;
