import { firm } from "@/content/firm";

export function WhatsAppFloat() {
  return (
    <a
      href={firm.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-4 bottom-4 z-30 inline-flex h-12 items-center rounded-full bg-seal px-5 text-sm font-medium text-on-seal shadow-float transition-colors duration-200 ease-out hover:bg-seal-deep"
      style={{ viewTransitionName: "site-whatsapp" }}
    >
      WhatsApp
    </a>
  );
}
