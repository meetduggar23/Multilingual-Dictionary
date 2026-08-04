import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { DictionaryEditor } from '@/components/dictionary/DictionaryEditor';
import { FeatureCards } from '@/components/common/FeatureCards';

export function AIDictionarySection() {
  return (
    <section id="ai-dictionary" className="scroll-mt-20 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'AI Tools' },
            { label: 'AI Dictionary', active: true },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-50 mb-5">
            <Sparkles className="h-7 w-7 text-orange-500" />
          </div>
          <h1 className="font-display text-[36px] sm:text-[44px] font-extrabold text-navy">
            AI Dictionary
          </h1>
          <p className="text-navy/50 mt-2 text-[15px] sm:text-[16px]">
            Generate fast and accurate definitions of any word with AI.
          </p>
        </motion.div>
      </div>

      <DictionaryEditor />
      <FeatureCards />
    </section>
  );
}
