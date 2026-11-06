"use client";

import { useState } from "react";
import type { FeatureCollection } from "geojson";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import statesGeo from "@/content/brazil-states.json";
import { firm } from "@/content/firm";
import { oabEntries } from "@/content/registrations";
import { attendanceMode, brazilStates, principalUfs, type AttendanceMode } from "@/content/states";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";

/** Contornos: Click That Hood (MIT), simplificados para o mapa. Sede: Itajaí/SC. */

function siglaOf(geo: { properties?: { sigla?: unknown } | null }) {
  const value = geo.properties?.sigla;
  return typeof value === "string" ? value.toUpperCase() : "";
}

function nameOf(geo: { properties?: { name?: unknown; sigla?: unknown } | null }) {
  const value = geo.properties?.name;
  return typeof value === "string" ? value : siglaOf(geo);
}

const modeLabel: Record<AttendanceMode, string> = {
  sede: "Presencial",
  presencial: "Presencial",
  principal: "Principal",
  remoto: "Remoto",
};

function modeTitle(mode: AttendanceMode) {
  if (mode === "principal") return "Atuação principal";
  if (mode === "remoto") return "Acompanhamento remoto";
  return "Atendimento presencial";
}

function modeText(mode: AttendanceMode, name: string) {
  if (mode === "sede") {
    return `Sede em ${firm.address.full}. Horário: ${firm.contact.hours.toLowerCase()}.`;
  }
  if (mode === "presencial") {
    return `Em ${name}, o atendimento é presencial. As inscrições vigentes são as da OAB/SC.`;
  }
  if (mode === "principal") {
    return `Em ${name}, a atuação é principal. O presencial segue com correspondente. As inscrições vigentes são as da OAB/SC.`;
  }
  return `Para quem está em ${name}, o contato é remoto. As inscrições vigentes são as da OAB/SC.`;
}

function geoTier(uf: string) {
  const mode = attendanceMode(uf);
  if (mode === "sede" || mode === "presencial") return "is-present";
  if (mode === "principal") return "is-principal";
  return "";
}

export function NationalAttendance() {
  const [uf, setUf] = useState("SC");
  const [hoverUf, setHoverUf] = useState<string | null>(null);
  const selected = brazilStates.find((state) => state.uf === uf) ?? brazilStates[0];
  const hovered = brazilStates.find((state) => state.uf === hoverUf);
  const shown = hovered ?? selected;
  const mode = attendanceMode(selected.uf);
  const shownMode = attendanceMode(shown.uf);
  const principal = principalUfs.map(
    (code) => brazilStates.find((state) => state.uf === code) ?? { uf: code, name: code },
  );

  return (
    <section
      id="atendimento-nacional"
      className="section-in scroll-mt-(--header-height) border-b border-line bg-paper"
      aria-labelledby="nacional-titulo"
    >
      <Container className="grid items-start gap-12 py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 md:py-24">
        <div>
          <Eyebrow tone="seal">Atendimento nacional</Eyebrow>
          <Heading level={2} id="nacional-titulo" className="mt-3">
            De Itajaí para o seu estado
          </Heading>
          <p className="mt-4 max-w-[42ch] text-ink-soft">
            O presencial cobre Santa Catarina, Paraná e Rio Grande do Sul. São Paulo, Rio de Janeiro e Bahia entram na
            atuação principal, com correspondente.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {principal.map((state) => {
              const current = state.uf === selected.uf;
              const present = attendanceMode(state.uf) !== "principal";
              return (
                <li key={state.uf}>
                  <button
                    type="button"
                    aria-pressed={current}
                    className={[
                      "state-chip min-h-11 px-3 py-2 text-left",
                      present ? "is-present" : "",
                      current ? "is-on" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setUf(state.uf)}
                  >
                    <span className="block text-sm font-medium">{state.name}</span>
                    <span className="mt-0.5 block text-[11px] tracking-[0.12em] uppercase">
                      {present ? "Presencial" : "Correspondente"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div key={selected.uf} className="state-sheet mt-8 space-y-6 border-t border-line pt-8">
            <div>
              <p className="font-display text-5xl leading-none font-medium tracking-tight text-seal">{selected.uf}</p>
              <p className="mt-2 text-sm font-semibold tracking-[0.12em] text-ink-soft uppercase">{selected.name}</p>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">{modeTitle(mode)}</h3>
              <p className="mt-3 max-w-[42ch] text-ink-soft">{modeText(mode, selected.name)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-seal uppercase">Inscrições vigentes</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {oabEntries.map((entry) => (
                  <li key={entry.number}>
                    OAB/{entry.uf} {entry.number}
                    <span className="text-ink-soft"> — {entry.holder}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button href="/contato" pill>
              Falar com o escritório
            </Button>
          </div>
        </div>

        <div className="map-rise min-w-0">
          <p className="brazil-caption px-0">
            <span>
              <span className="font-semibold tracking-[0.08em] text-seal uppercase">{shown.uf}</span>
              <span> · {shown.name}</span>
            </span>
            <span className="text-xs tracking-[0.08em] text-ink-soft uppercase">{modeLabel[shownMode]}</span>
          </p>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-54, -14.8], scale: 780 }}
            width={620}
            height={660}
            className="brazil-svg"
            role="group"
            aria-label="Mapa do Brasil"
          >
            <Geographies geography={statesGeo as FeatureCollection}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const code = siglaOf(geo);
                  const current = code === selected.uf;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      role="button"
                      tabIndex={0}
                      aria-label={nameOf(geo)}
                      aria-pressed={current}
                      className={["brazil-geo", geoTier(code)].filter(Boolean).join(" ")}
                      onMouseEnter={() => setHoverUf(code)}
                      onMouseLeave={() => setHoverUf((currentHover) => (currentHover === code ? null : currentHover))}
                      onFocus={() => setHoverUf(code)}
                      onBlur={() => setHoverUf((currentHover) => (currentHover === code ? null : currentHover))}
                      onClick={() => setUf(code)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setUf(code);
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
            <Marker coordinates={[-48.66, -26.91]} className="pointer-events-none">
              <circle r="10" className="seat-ring" />
              <circle r="3.2" className="seat-dot" />
              <text y={-16} textAnchor="middle" className="seat-label">
                Itajaí
              </text>
            </Marker>
          </ComposableMap>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs tracking-[0.08em] text-ink-soft uppercase">
            <li className="inline-flex items-center gap-2">
              <span className="map-swatch is-present" aria-hidden="true" />
              Presencial
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="map-swatch is-principal" aria-hidden="true" />
              Principal
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="map-swatch" aria-hidden="true" />
              Remoto
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
