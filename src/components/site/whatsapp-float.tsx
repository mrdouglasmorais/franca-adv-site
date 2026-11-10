import { firm } from "@/content/firm";
import { WhatsAppMark } from "@/components/site/whatsapp-mark";

export function WhatsAppFloat() {
  return (
    <a
      href={firm.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="whatsapp-float fixed right-4 bottom-4 z-30 inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-medium text-white shadow-float transition-colors duration-200 ease-out hover:bg-whatsapp-deep"
      style={{ viewTransitionName: "site-whatsapp" }}
    >
      <WhatsAppMark />
      WhatsApp
    </a>
  );
}
