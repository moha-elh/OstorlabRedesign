import Hero from "@/components/Hero";
import FreeScan from "@/components/FreeScan";
import TwoWays from "@/components/TwoWays";
import Agentic from "@/components/Agentic";
import ProofReviews from "@/components/ProofReviews";
import PlatformTour from "@/components/PlatformTour";
import Integrations from "@/components/Integrations";
import Faq from "@/components/Faq";
import CtaFooter from "@/components/CtaFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <FreeScan />
      <TwoWays />
      <Agentic />
      <ProofReviews />
      <PlatformTour />
      <Integrations />
      <Faq />
      <CtaFooter />
    </main>
  );
}
