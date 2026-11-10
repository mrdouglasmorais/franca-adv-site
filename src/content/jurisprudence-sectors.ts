/** Setores alinhados às áreas do escritório. Fonte: API pública do TJDFT. */
export type JurisprudenceSector = {
  id: string;
  name: string;
  query: string;
  blurb: string;
};

export const jurisprudenceSectors: readonly JurisprudenceSector[] = [
  {
    id: "civil",
    name: "Civil",
    query: "responsabilidade civil dano moral",
    blurb: "Patrimônio, obrigação e responsabilidade.",
  },
  {
    id: "imobiliario",
    name: "Imobiliário",
    query: "locação imóvel compra e venda",
    blurb: "Locação, compra, venda e posse.",
  },
  {
    id: "familia",
    name: "Família",
    query: "guarda alimentos divórcio",
    blurb: "Guarda, alimentos e dissolução.",
  },
  {
    id: "trabalho",
    name: "Trabalho",
    query: "verbas trabalhistas acidente de trabalho",
    blurb: "Demandas cíveis afins ao trabalho.",
  },
  {
    id: "empresarial",
    name: "Empresarial",
    query: "sociedade empresária contrato social",
    blurb: "Sociedade, sócios e contrato.",
  },
  {
    id: "contratos",
    name: "Contratos",
    query: "inadimplemento contratual",
    blurb: "Inadimplemento e obrigação contratual.",
  },
  {
    id: "criminal",
    name: "Criminal",
    query: "direito penal habeas corpus",
    blurb: "Matéria penal e processual penal.",
  },
] as const;
