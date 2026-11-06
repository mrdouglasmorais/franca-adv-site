import { firm } from "@/content/firm";
import { WhatsAppMark } from "@/components/site/whatsapp-mark";

const links = [
  {
    href: firm.contact.instagramUrl,
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: firm.contact.whatsappUrl,
    label: "WhatsApp",
    icon: WhatsAppMark,
  },
] as const;

export function SocialLinks({
  tone = "on-dark",
  className = "",
}: {
  tone?: "on-dark" | "on-light";
  className?: string;
}) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`social-link ${tone === "on-light" ? "social-link-light" : ""}`}
          >
            <item.icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  );
}

