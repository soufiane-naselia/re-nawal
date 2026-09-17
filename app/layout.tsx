import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { preload } from "react-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HERO_VIDEO } from "@/content/media";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Laboratoire de soutien`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Same URL the PageLoader and <Hero> use — warm the cache as early as the
  // document head so the first visit only pays for the ~7 MB reel once.
  preload(HERO_VIDEO, { as: "video", type: "video/mp4" });

  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PageLoader />
        <SmoothScroll>
          <Header />
          {/* The header is fixed, so main reserves its 64px. Interior pages
              land exactly where they did when it was sticky; the Hero cancels
              this with -mt-16 to run full-bleed under it. */}
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
