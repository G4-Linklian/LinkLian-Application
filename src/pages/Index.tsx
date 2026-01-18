import Header from '@/components/Header';
import MainSection from '@/components/MainSection';
import MobileDisplaySection from '@/components/MobileDisplaySection';
import FeaturesMobileSection from '@/components/FeaturesMobileSection';
import RegisterSection from '@/components/RegisterSection';
import FeaturesRegisterSection from '@/components/FeaturesRegisterSection';
import BenefitsSection from '@/components/BenefitsSection';
import ButtomSection from '@/components/ButtomSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Header />
        <MainSection />
        <MobileDisplaySection />
        <FeaturesMobileSection />
        <RegisterSection />
        <FeaturesRegisterSection />
        <BenefitsSection />
        <ButtomSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
