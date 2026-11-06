import Image from "next/image";
import Link from "next/link";
import { firm } from "@/content/firm";
import { Container } from "@/components/ui/container";
import { SiteNav } from "@/components/site/site-nav";

export function Header() {
  return (
    <header
      id="topo"
      className="sticky top-0 z-40 border-b border-line-light bg-ink text-paper"
      style={{ viewTransitionName: "site-header" }}
    >
      <Container className="flex h-(--header-height) items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label={firm.shortName}>
          <Image
            src={firm.assets.brasao}
            alt=""
            width={firm.assets.brasaoWidth}
            height={firm.assets.brasaoHeight}
            className="h-9 w-auto"
            sizes="36px"
            priority
          />
          <Image
            src={firm.assets.wordmark}
            alt={firm.legalName}
            width={firm.assets.wordmarkWidth}
            height={firm.assets.wordmarkHeight}
            className="h-8 w-auto"
            sizes="220px"
            priority
          />
        </Link>
        <SiteNav />
      </Container>
    </header>
  );
}
