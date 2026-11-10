"use client";

import { useState } from "react";
import type { SectorJurisprudence } from "@/lib/tjdft";
import { formatHits, formatPtDate, tjdftSourceUrl } from "@/lib/tjdft";
import { Eyebrow, Heading } from "@/components/ui/heading";

function JurisArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d={direction === "prev" ? "M14.5 6.5 9 12l5.5 5.5" : "M9.5 6.5 15 12l-5.5 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function JurisprudenceBoard({ sectors }: { sectors: SectorJurisprudence[] }) {
  const initial = sectors.find((item) => item.items.length > 0)?.sector.id ?? sectors[0]?.sector.id;
  const [activeId, setActiveId] = useState(initial);
  const activeIndex = Math.max(
    0,
    sectors.findIndex((item) => item.sector.id === activeId),
  );
  const active = sectors[activeIndex] ?? sectors[0];

  if (!active) return null;

  const canPrevSector = activeIndex > 0;
  const canNextSector = activeIndex < sectors.length - 1;

  function goSector(delta: number) {
    const next = sectors[activeIndex + delta];
    if (next) setActiveId(next.sector.id);
  }

  return (
    <section className="juris-board" aria-labelledby="juris-titulo">
      <div className="juris-board-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-[70rem] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40rem]">
            <Eyebrow tone="gold">Fonte pública · TJDFT</Eyebrow>
            <Heading level={2} id="juris-titulo" className="mt-3 text-paper">
              Jurisprudência de referência
            </Heading>
            <p className="mt-4 max-w-[48ch] text-lg text-gold-soft">
              Acórdãos oficiais do Tribunal de Justiça do Distrito Federal, agrupados pelas
              áreas do escritório. Não são casos da Ferreira França. Não é parecer.
            </p>
          </div>
          <p className="text-right">
            <span className="block font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-medium tracking-[-0.04em] text-gold">
              {formatHits(active.hits)}
            </span>
            <span className="mt-2 block text-xs font-semibold tracking-[0.14em] text-gold-soft uppercase">
              acórdãos TJDFT · {active.sector.name}
            </span>
          </p>
        </div>

        <div className="juris-nav mt-10">
          <button
            type="button"
            className="juris-arrow"
            aria-label="Área anterior"
            disabled={!canPrevSector}
            onClick={() => goSector(-1)}
          >
            <JurisArrow direction="prev" />
          </button>

          <div className="juris-tabs" role="tablist" aria-label="Áreas da jurisprudência">
            {sectors.map((item) => {
              const selected = item.sector.id === active.sector.id;
              return (
                <button
                  key={item.sector.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`juris-tab ${selected ? "is-on" : ""}`}
                  onClick={() => setActiveId(item.sector.id)}
                >
                  <span>{item.sector.name}</span>
                  <span className="juris-tab-count">{formatHits(item.hits)}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="juris-arrow"
            aria-label="Próxima área"
            disabled={!canNextSector}
            onClick={() => goSector(1)}
          >
            <JurisArrow direction="next" />
          </button>
        </div>

        <div className="mt-8" role="tabpanel" aria-label={active.sector.name}>
          <p className="max-w-[48ch] text-sm text-gold-soft">{active.sector.blurb}</p>

          {active.error ? (
            <p className="mt-8 border border-line-light bg-ink-soft/20 px-5 py-4 text-sm text-gold-soft">
              {active.error}
            </p>
          ) : null}

          <ul className="juris-grid mt-8">
            {active.items.map((item, index) => {
              const published = formatPtDate(item.publishedAt) ?? formatPtDate(item.judgedAt);
              return (
                <li key={item.id} className="juris-card">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-display text-4xl leading-none text-seal">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    {published ? (
                      <p className="text-xs font-semibold tracking-[0.12em] text-gold-soft uppercase">
                        {published}
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                    {item.chamber}
                  </p>
                  <p className="mt-3 font-display text-xl leading-snug font-medium tracking-tight text-paper">
                    {item.process}
                  </p>
                  <p className="mt-4 text-[15px] leading-6 text-gold-soft">
                    {item.ementa || item.decision}
                  </p>
                  <p className="mt-6 text-sm text-paper/70">Relator: {item.rapporteur}</p>
                </li>
              );
            })}
          </ul>

          {!active.error && active.items.length === 0 ? (
            <p className="mt-8 text-sm text-gold-soft">Não há decisões disponíveis nesta área no momento.</p>
          ) : null}
        </div>

        <p className="mt-12 max-w-[52ch] text-xs leading-5 text-gold-soft/80">
          Fonte:{" "}
          <a
            href={tjdftSourceUrl()}
            className="underline decoration-gold-soft/40 underline-offset-4 hover:text-gold"
            target="_blank"
            rel="noreferrer"
          >
            Tribunal de Justiça do Distrito Federal e dos Territórios
          </a>
          . Conteúdo de referência. Não substitui a análise do caso concreto em Santa Catarina.
        </p>
      </div>
    </section>
  );
}
