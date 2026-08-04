import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { AIDictionarySection } from '@/components/landing/AIDictionarySection';
import { DailyLearning } from '@/components/landing/DailyLearning';
import { QuickActions } from '@/components/landing/QuickActions';
import { LearningPath } from '@/components/landing/LearningPath';
import { Categories } from '@/components/landing/Categories';
import { AITools } from '@/components/landing/AITools';
import { LearningStats } from '@/components/landing/LearningStats';
import { LanguageSupport } from '@/components/landing/LanguageSupport';
import { DailyChallenge } from '@/components/landing/DailyChallenge';
import { WhyChoose } from '@/components/landing/WhyChoose';
import { Community } from '@/components/landing/Community';
import { FinalCTA } from '@/components/landing/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AIDictionarySection />
        <DailyLearning />
        <QuickActions />
        <LearningPath />
        <Categories />
        <AITools />
        <LearningStats />
        <LanguageSupport />
        <DailyChallenge />
        <WhyChoose />
        <Community />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
