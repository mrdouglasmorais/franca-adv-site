import { clientLogos } from "@/content/clients";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/heading";

export function LogoRail() {
  if (clientLogos.length === 0) return null;

  const copies = Math.max(2, Math.ceil(24 / clientLogos.length));
  const half = Array.from({ length: copies }, () => clientLogos).flat();
  const loop = [...half, ...half];

  return (
    <section className="logo-rail border-b border-line py-10 md:py-12" aria-label="Clientes">
      <Container>
        <Eyebrow>Clientes</Eyebrow>
      </Container>
      <div className="logo-rail-track mt-6">
        {loop.map((logo, index) => (
          <div className="logo-rail-item" key={`${logo.src}-${index}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={index < clientLogos.length ? logo.name : ""} draggable={false} />
          </div>
        ))}
      </div>
    </section>
  );
}
