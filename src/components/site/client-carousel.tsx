import { clientLogos } from "@/content/clients";

export function LogoRail() {
  if (clientLogos.length === 0) return null;

  const loop = [...clientLogos, ...clientLogos];

  return (
    <section className="logo-rail border-b border-line" aria-label="Clientes">
      <div className="logo-rail-track">
        {loop.map((logo, index) => (
          <div className="logo-rail-item" key={`${logo.src}-${index}`}>
            {/* O nome fica só para leitura de tela: a faixa mostra a marca. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={index < clientLogos.length ? logo.name : ""} />
          </div>
        ))}
      </div>
    </section>
  );
}
