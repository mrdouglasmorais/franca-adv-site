import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export default function NotFound() {
  return (
    <Container className="py-24">
      <Heading level={1}>Página não encontrada</Heading>
      <p className="mt-4 max-w-[62ch] text-ink-soft">
        Este endereço não faz parte do site. Volte ao início ou veja as áreas de atuação.
      </p>
      <p className="mt-8">
        <Link href="/" className="underline underline-offset-4">
          Ir para o início
        </Link>
      </p>
    </Container>
  );
}
