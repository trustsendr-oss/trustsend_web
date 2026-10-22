import { Nav } from "../components/Nav";
// import { AskAssistant } from "../components/AskAssistant";
import { CookieConsent } from "../components/CookieConsent";
import { Hero } from "../components/Hero";
import { LogoMarquee } from "../components/LogoMarquee";
import { PlatformStandards } from "../components/PlatformStandards";
import { FeatureTabs } from "../components/FeatureTabs";
import { IndustryGrid } from "../components/IndustryGrid";
import { FeatureBlocks } from "../components/FeatureBlocks";
import { AfricaAPIs } from "../components/AfricaAPIs";
import { DevShowcase } from "../components/DevShowcase";
import { NoCodeShowcase } from "../components/NoCodeShowcase";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { CTABanner } from "../components/CTABanner";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

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
        <FeatureBlocks />
        <AfricaAPIs />
        <DevShowcase />
        <NoCodeShowcase />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      {/* <AskAssistant /> */}
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}
