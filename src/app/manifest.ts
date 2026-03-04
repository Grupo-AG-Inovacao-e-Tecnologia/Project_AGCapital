import type { MetadataRoute } from "next";
import { paths } from "@/lib/paths";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Grupo AG Capital",
    short_name: "AG",
    description: "Grupo AG Capital é um sistema interno para uso corporativo.",
    start_url: paths.auth.login,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
