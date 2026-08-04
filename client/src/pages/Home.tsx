import { Navbar } from '@/components/navbar/Navbar';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Hero } from '@/components/common/Hero';
import { DictionaryEditor } from '@/components/dictionary/DictionaryEditor';
import { FeatureCards } from '@/components/common/FeatureCards';
import { Footer } from '@/components/common/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'AI Tools' },
        { label: 'AI Dictionary', active: true },
      ]} />
      <Hero />
      <main className="flex-1">
        <DictionaryEditor />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  );
}
