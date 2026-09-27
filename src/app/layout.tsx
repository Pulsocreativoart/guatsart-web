import type { Metadata, Viewport } from "next";

import "@fontsource-variable/manrope";
import "@fontsource-variable/syne";

import { MotionProvider } from "@/components/providers/MotionProvider";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GÜATSART — Una no galería",
    template: "%s · GÜATSART",
  },
  description: "GÜATSART es una no galería por NOUBODY: obra, materia, ciudad y archivo vivo.",
  keywords: ["arte contemporáneo", "galería de arte", "Guatemala", "NOUBODY", "GÜATSART"],
  openGraph: {
    description: "Obra, materia, ciudad y archivo vivo por NOUBODY.",
    images: [{ alt: "GÜATSART — Una no galería", height: 900, url: "/media/hero-gallery-poster.jpg", width: 1600 }],
    locale: "es_GT",
    title: "GÜATSART — Una no galería",
    type: "website",
    url: siteUrl,
  },
  robots: { follow: true, index: true },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#111312",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    name: "GÜATSART",
    description: "Una no galería por NOUBODY.",
    url: siteUrl,
  };

  return (
    <html lang="es">
      <body>
        <MotionProvider>{children}</MotionProvider>
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} type="application/ld+json" />
      </body>
    </html>
  );
}
