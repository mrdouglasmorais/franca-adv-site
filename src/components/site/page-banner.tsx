import Image from "next/image";
import type { Illustration } from "@/content/visuals";

export function PageBanner({ image }: { image: Illustration }) {
  return (
    <div className="image-frame relative h-[38vh] min-h-56 max-h-[480px] bg-ink">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover image-drift"
      />
      <div className="hero-shade hero-shade-band" aria-hidden="true" />
    </div>
  );
}
