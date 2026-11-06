/** Inscrições confirmadas no cadastro interno do FrancaAdv. Todas em Santa Catarina. */

export type OabEntry = {
  uf: string;
  state: string;
  number: string;
  holder: string;
};

export const oabEntries: readonly OabEntry[] = [
  {
    uf: "SC",
    state: "Santa Catarina",
    number: "PJ 9264",
    holder: "Ferreira França Sociedade de Advocacia",
  },
  {
    uf: "SC",
    state: "Santa Catarina",
    number: "52540",
    holder: "Maicon Ferreira França",
  },
  {
    uf: "SC",
    state: "Santa Catarina",
    number: "061535-B",
    holder: "Maria Alice Gomes Marques",
  },
  {
    uf: "SC",
    state: "Santa Catarina",
    number: "075307",
    holder: "Monike Eva Oliveira Araujo",
  },
];

export function oabByState() {
  const groups = new Map<string, { uf: string; state: string; entries: OabEntry[] }>();
  for (const entry of oabEntries) {
    const current = groups.get(entry.uf) ?? { uf: entry.uf, state: entry.state, entries: [] };
    current.entries.push(entry);
    groups.set(entry.uf, current);
  }
  return [...groups.values()];
}
