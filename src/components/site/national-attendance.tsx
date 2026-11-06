"use client";

import { useState } from "react";
import type { FeatureCollection } from "geojson";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import statesGeo from "@/content/brazil-states.json";
import { firm } from "@/content/firm";
import { oabEntries } from "@/content/registrations";
import { brazilStates } from "@/content/states";
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

export function NationalAttendance() {
  const [uf, setUf] = useState("SC");
  const [hoverUf, setHoverUf] = useState<string | null>(null);
  const selected = brazilStates.find((state) => state.uf === uf) ?? brazilStates[0];
  const hovered = brazilStates.find((state) => state.uf === hoverUf);
  const shown = hovered ?? selected;
  const local = selected.uf === "SC";

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
            Toque o estado no mapa. Santa Catarina é a sede. Nos demais, o acompanhamento é remoto.
          </p>

          <div key={selected.uf} className="state-sheet mt-8 space-y-6 border-t border-line pt-8">
            <div>
              <p className="font-display text-5xl leading-none font-medium tracking-tight text-seal">{selected.uf}</p>
              <p className="mt-2 text-sm font-semibold tracking-[0.12em] text-ink-soft uppercase">{selected.name}</p>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
                {local ? "Atendimento presencial" : "Acompanhamento remoto"}
              </h3>
              <p className="mt-3 max-w-[42ch] text-ink-soft">
                {local
                  ? `Sede em ${firm.address.full}. Horário: ${firm.contact.hours.toLowerCase()}.`
                  : `Para quem está em ${selected.name}, o contato é remoto. As inscrições vigentes são as da OAB/SC. Não há seccional própria neste estado.`}
              </p>
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
            <span className="text-xs tracking-[0.08em] text-ink-soft uppercase">
              {shown.uf === "SC" ? "Sede" : "Remoto"}
            </span>
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
                      className={["brazil-geo", code === "SC" ? "is-home" : ""].filter(Boolean).join(" ")}
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
        </div>
      </Container>
    </section>
  );
}
