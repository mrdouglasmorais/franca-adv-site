/**
 * Equipe do cadastro interno (FrancaAdv `office-staff.ts`).
 * Sem e-mail pessoal, telefone pessoal ou biografia inventada.
 * Foto só quando o arquivo foi publicado pelo escritório.
 */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  oab?: string;
  summary: string;
  photo?: string;
};

export const team: readonly TeamMember[] = [
  {
    slug: "maicon-ferreira-franca",
    name: "Maicon Ferreira França",
    role: "CEO",
    oab: "OAB/SC 52540",
    photo: "/team/maicon.jpg",
    summary:
      "Formação em Direito e Administração. Conduz o Grupo Ferreira França na advocacia consultiva e contenciosa, para pessoas físicas e jurídicas, com atendimento a partir de Itajaí.",
  },
  {
    slug: "maria-alice-gomes-marques",
    name: "Maria Alice Gomes Marques",
    role: "Advogada",
    oab: "OAB/SC 061535-B",
    summary: "Advogada do escritório em Itajaí, inscrita na OAB/SC.",
  },
  {
    slug: "monike-eva-oliveira-araujo",
    name: "Monike Eva Oliveira Araujo",
    role: "Advogada",
    oab: "OAB/SC 075307",
    summary: "Advogada do escritório em Itajaí, inscrita na OAB/SC.",
  },
  {
    slug: "edivania-fonseca-mota",
    name: "Edivânia Fonseca Mota",
    role: "Bacharel em Direito",
    summary: "Bacharel em Direito na equipe do escritório em Itajaí.",
  },
  {
    slug: "sabrina-soares-melo",
    name: "Sabrina Soares Melo",
    role: "Bacharelanda",
    summary: "Bacharelanda na equipe do escritório em Itajaí.",
  },
  {
    slug: "celso-schaadt-neto",
    name: "Celso Schaadt Neto",
    role: "Equipe jurídica",
    summary: "Integra a equipe jurídica do escritório em Itajaí.",
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
