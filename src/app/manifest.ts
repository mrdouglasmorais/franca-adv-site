import type { MetadataRoute } from "next";
import { firm } from "@/content/firm";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: firm.name,
    short_name: "Ferreira França",
    description: firm.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    lang: "pt-BR",
    icons: [{ src: "/fav.png", sizes: "643x643", type: "image/png", purpose: "any" }],
  };
}
