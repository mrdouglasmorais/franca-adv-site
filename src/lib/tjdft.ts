import { jurisprudenceSectors, type JurisprudenceSector } from "@/content/jurisprudence-sectors";

export type TjdftDecision = {
  id: string;
  uuid: string;
  process: string;
  ementa: string;
  decision: string;
  chamber: string;
  rapporteur: string;
  judgedAt: string | null;
  publishedAt: string | null;
  hasFullText: boolean;
};

export type SectorJurisprudence = {
  sector: JurisprudenceSector;
  hits: number;
  items: TjdftDecision[];
  error?: string;
};

type ApiRegistro = {
  uuid?: string;
  identificador?: string | number;
  processo?: string;
  ementa?: string;
  decisao?: string;
  descricaoOrgaoJulgador?: string;
  nomeRelator?: string;
  dataJulgamento?: string;
  dataPublicacao?: string;
  possuiInteiroTeor?: boolean;
};

type ApiResponse = {
  hits?: { value?: number };
  registros?: ApiRegistro[];
};

const ENDPOINT = "https://jurisdf.tjdft.jus.br/api/v1/pesquisa";
const SOURCE_URL = "https://www.tjdft.jus.br/transparencia/tecnologia-da-informacao-e-comunicacao/dados-abertos/webservice-ou-api";

function cleanText(value: string | undefined, max = 320) {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function mapRegistro(reg: ApiRegistro, index: number): TjdftDecision {
  return {
    id: String(reg.identificador ?? reg.uuid ?? `tjdft-${index}`),
    uuid: reg.uuid ?? "",
    process: reg.processo?.trim() || "Processo não informado",
    ementa: cleanText(reg.ementa, 360),
    decision: cleanText(reg.decisao, 120),
    chamber: cleanText(reg.descricaoOrgaoJulgador, 80) || "Órgão julgador",
    rapporteur: cleanText(reg.nomeRelator, 60) || "Relator não informado",
    judgedAt: reg.dataJulgamento ?? null,
    publishedAt: reg.dataPublicacao ?? null,
    hasFullText: Boolean(reg.possuiInteiroTeor),
  };
}

export async function fetchTjdftSector(
  sector: JurisprudenceSector,
  size = 4,
): Promise<SectorJurisprudence> {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: sector.query, pagina: 0, tamanho: size }),
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!response.ok) {
      return {
        sector,
        hits: 0,
        items: [],
        error: "A consulta à jurisprudência está indisponível no momento.",
      };
    }

    const data = (await response.json()) as ApiResponse;
    return {
      sector,
      hits: data.hits?.value ?? 0,
      items: (data.registros ?? []).map((reg, index) => mapRegistro(reg, index)),
    };
  } catch {
    return {
      sector,
      hits: 0,
      items: [],
      error: "A consulta à jurisprudência está indisponível no momento.",
    };
  }
}

export async function fetchAllJurisprudenceSectors() {
  return Promise.all(jurisprudenceSectors.map((sector) => fetchTjdftSector(sector)));
}

export function tjdftSourceUrl() {
  return SOURCE_URL;
}

export function formatPtDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(date);
}

export function formatHits(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}
