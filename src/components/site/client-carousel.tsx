import { clientLogos } from "@/content/clients";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/heading";

export function LogoRail() {
  if (clientLogos.length === 0) return null;

  const half = [...clientLogos, ...clientLogos];
  const loop = [...half, ...half];

  return (
    <section className="logo-rail border-b border-line py-10 md:py-12" aria-label="Logos de exemplo">
      <Container>
        <Eyebrow>Logos de exemplo</Eyebrow>
      </Container>
      <div className="logo-rail-track mt-6">
        {loop.map((logo, index) => (
          <div className="logo-rail-item" key={`${logo.src}-${index}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={index < clientLogos.length ? logo.name : ""} />
          </div>
        ))}
      </div>
    </section>
  );
}
