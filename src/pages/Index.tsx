import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SchoolWorkflowSlider from '@/components/SchoolWorkflowSlider';
import MobileAppDisplay from '@/components/MobileAppDisplay';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Header />
        <HeroSection />
        <SchoolWorkflowSlider />
        <MobileAppDisplay />
        <FeaturesShowcase />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
