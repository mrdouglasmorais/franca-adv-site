import Image from "next/image";
import Link from "next/link";
import { firm } from "@/content/firm";
import { HeaderShell } from "@/components/site/header-shell";
import { SiteNav } from "@/components/site/site-nav";

export function Header() {
  return (
    <HeaderShell>
      <div className="header-cluster relative z-10 flex h-(--header-height) w-full items-center justify-between gap-8 px-6 md:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={firm.shortName}>
          <Image
            src={firm.assets.brasao}
            alt=""
            width={firm.assets.brasaoWidth}
            height={firm.assets.brasaoHeight}
            className="h-9 w-auto shrink-0"
            sizes="36px"
            priority
            draggable={false}
          />
          <Image
            src={firm.assets.wordmark}
            alt={firm.legalName}
            width={firm.assets.wordmarkWidth}
            height={firm.assets.wordmarkHeight}
            className="h-8 w-auto max-w-[min(220px,calc(100vw-11.5rem))] object-contain object-left"
            sizes="220px"
            priority
            draggable={false}
          />
        </Link>
        <SiteNav />
      </div>
    </HeaderShell>
  );
}
