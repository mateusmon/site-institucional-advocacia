import type { Metadata } from "next";

import { ContactCallout } from "@/components/sections/contact/contact-callout";
import { HomeAbout } from "@/components/sections/home/home-about";
import { HomeDifferentials } from "@/components/sections/home/home-differentials";
import { HomeFaq } from "@/components/sections/home/home-faq";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeLocations } from "@/components/sections/home/home-locations";
import { HomePracticeAreas } from "@/components/sections/home/home-practice-areas";
import { HomeTeam } from "@/components/sections/home/home-team";
import { HomeTestimonials } from "@/components/sections/home/home-testimonials";
import { HomeTrajectory } from "@/components/sections/home/home-trajectory";
import { JsonLd } from "@/components/seo/json-ld";
import { homeFaqs } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Advocacia full service em Brasília e Taguatinga | Ravanelli & Roseno",
  description:
    "Ravanelli & Roseno Advogados Associados: atuação jurídica full service, preventiva e multidisciplinar no Distrito Federal desde 2010.",
  path: "/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      aria-label="Conteúdo principal"
      className="bg-background outline-none"
    >
      <JsonLd data={faqJsonLd} />
      <HomeHero />
      <HomeAbout />
      <HomePracticeAreas />
      <HomeDifferentials />
      <HomeTeam />
      <HomeTrajectory />
      <HomeTestimonials />
      <HomeFaq />
      <ContactCallout
        title="Converse com o escritório"
        description="Utilize os canais oficiais para apresentar sua necessidade e conhecer os próximos passos do atendimento."
      />
      <HomeLocations />
    </main>
  );
}
