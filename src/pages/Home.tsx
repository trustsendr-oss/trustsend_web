import { Nav } from "../components/Nav";
import { CookieConsent } from "../components/CookieConsent";
import { Hero } from "../components/Hero";
import { LogoMarquee } from "../components/LogoMarquee";
import { PlatformStandards } from "../components/PlatformStandards";
import { FeatureTabs } from "../components/FeatureTabs";
import { IndustryGrid } from "../components/IndustryGrid";
import { AfricaAPIs } from "../components/AfricaAPIs";
import { DevShowcase } from "../components/DevShowcase";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { AboutReemite } from "../components/AboutReemite";

export function Home() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <PlatformStandards />
        <FeatureTabs />
        <IndustryGrid />
        <AfricaAPIs />
        <DevShowcase />
        <Testimonials />
        <FAQ />
        <AboutReemite />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}
