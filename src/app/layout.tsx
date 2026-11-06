import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { BackToTopFloat } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { LgpdNotice } from "@/components/site/lgpd-notice";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { JsonLd } from "@/components/seo/json-ld";
import { firm, resolveSiteUrl } from "@/content/firm";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationGraph } from "@/lib/seo/schema";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: firm.seo.defaultTitle,
    description: firm.description,
    path: "/",
    absoluteTitle: true,
  }),
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    default: firm.seo.defaultTitle,
    template: firm.seo.titleTemplate,
  },
  applicationName: firm.shortName,
  authors: [{ name: firm.name, url: resolveSiteUrl() }],
  creator: firm.name,
  publisher: firm.name,
  category: "Law",
  keywords: [...firm.seo.keywords],
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={dmSans.variable}>
      <body className="antialiased">
        <JsonLd data={organizationGraph()} />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <LgpdNotice />
        <BackToTopFloat />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
