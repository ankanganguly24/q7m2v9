import { EvidenceSection } from "./EvidenceSection";
import { AudienceSection } from "./AudienceSection";
import { CapabilitySection } from "./CapabilitySection";
import { ClosingCTA } from "./ClosingCTA";
import { FAQSection } from "./FAQSection";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";
import { WorkflowSection } from "./WorkflowSection";

export function LandingPage() {
  return (
    <main className="landing-page overflow-hidden bg-landing-paper text-foreground">
      <div className="relative bg-landing-ink text-landing-paper">
        <PublicHeader />
        <HeroSection />
      </div>
      <ProblemSection />
      <WorkflowSection />
      <CapabilitySection />
      <EvidenceSection />
      <AudienceSection />
      <FAQSection />
      <ClosingCTA />
      <PublicFooter />
    </main>
  );
}
