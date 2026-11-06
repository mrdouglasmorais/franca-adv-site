import { practiceAreas } from "@/content/areas";
import { firm, resolveSiteUrl } from "@/content/firm";
import type { TeamMember } from "@/content/team";

function id(fragment: string) {
  return `${resolveSiteUrl()}${fragment}`;
}

export function organizationGraph() {
  const url = resolveSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": id("/#organization"),
        name: firm.name,
        legalName: firm.legalName,
        url,
        image: `${url}/opengraph-image`,
        logo: {
          "@type": "ImageObject",
          url: `${url}${firm.assets.wordmark}`,
        },
        email: firm.contact.email,
        telephone: firm.contact.phonePrimary,
        taxID: firm.cnpj,
        foundingDate: String(firm.foundingYear),
        sameAs: [firm.contact.instagramUrl],
        address: postalAddress(),
      },
      {
        "@type": "LegalService",
        "@id": id("/#legalservice"),
        name: firm.name,
        url,
        image: `${url}/opengraph-image`,
        description: firm.description,
        telephone: firm.contact.phonePrimary,
        email: firm.contact.email,
        priceRange: "$$",
        address: postalAddress(),
        areaServed: [
          { "@type": "City", name: "Itajaí" },
          { "@type": "State", name: "Santa Catarina" },
        ],
        hasMap: firm.mapUrl,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: firm.hoursSpec.days,
          opens: firm.hoursSpec.opens,
          closes: firm.hoursSpec.closes,
        },
        parentOrganization: { "@id": id("/#organization") },
        employee: { "@id": id("/#maicon") },
        knowsAbout: practiceAreas.map((area) => area.name),
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: firm.contact.phonePrimary,
            contactType: "customer support",
            availableLanguage: "Portuguese",
            areaServed: "BR",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: firm.hoursSpec.days,
              opens: firm.hoursSpec.opens,
              closes: firm.hoursSpec.closes,
            },
          },
          {
            "@type": "ContactPoint",
            telephone: firm.contact.phoneSecondary,
            contactType: "customer support",
            url: firm.contact.whatsappUrl,
            availableLanguage: "Portuguese",
            areaServed: "BR",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": id("/#website"),
        url,
        name: firm.name,
        inLanguage: "pt-BR",
        description: firm.description,
        publisher: { "@id": id("/#organization") },
      },
      {
        "@type": "Person",
        "@id": id("/#maicon"),
        name: firm.leadership.name,
        jobTitle: firm.leadership.role,
        worksFor: { "@id": id("/#legalservice") },
        url: `${url}/equipe/maicon-ferreira-franca`,
        knowsAbout: ["Direito", "Administração"],
      },
    ],
  };
}

export function serviceSchema(area: {
  slug: string;
  name: string;
  summary: string;
}) {
  const url = `${resolveSiteUrl()}/areas/${area.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: area.name,
    serviceType: area.name,
    description: area.summary,
    url,
    provider: { "@id": `${resolveSiteUrl()}/#legalservice` },
    areaServed: { "@type": "City", name: "Itajaí" },
    inLanguage: "pt-BR",
  };
}

export function personSchema(member: TeamMember) {
  const url = `${resolveSiteUrl()}/equipe/${member.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.summary,
    url,
    worksFor: { "@id": `${resolveSiteUrl()}/#organization` },
    ...(member.oab ? { identifier: member.oab } : {}),
    ...(member.photo ? { image: `${resolveSiteUrl()}${member.photo}` } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const origin = resolveSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, `${origin}/`).toString(),
    })),
  };
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: firm.address.street,
    addressLocality: firm.address.city,
    addressRegion: firm.address.region,
    postalCode: firm.address.postalCode,
    addressCountry: firm.address.country,
  };
}
