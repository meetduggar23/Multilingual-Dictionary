import { ShieldCheck } from 'lucide-react';
import { LegalPage } from '@/components/common/LegalPage';

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'When you use D. Dictionary AI, we collect information you provide directly, such as your name, email address, and password when you create an account. We also store data you generate while using the service, including saved words, search history, quiz progress, and vocabulary statistics.',
      'We automatically collect limited technical information such as your browser type, device information, and IP address to operate, secure, and improve the service.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'We use the information we collect to provide, maintain, and improve the D. Dictionary AI service — including personalizing word recommendations, syncing your favorites across devices, and delivering daily word reminders.',
      'We may use aggregated, anonymized data to analyze usage patterns and improve our AI features. We never sell your personal information.',
    ],
  },
  {
    title: 'AI Feature Data',
    body: [
      'Words you look up, phrases you translate, and messages you send to the AI Assistant are processed to generate definitions, translations, and responses. This data is used to power the core features of the service and to refine quality over time.',
      'You can delete your AI chat history and search history at any time from the History page.',
    ],
  },
  {
    title: 'Cookies and Local Storage',
    body: [
      'We use cookies and local browser storage to keep you signed in, remember your preferences, and remember words you have saved. You can disable cookies in your browser settings, though some features may not work as intended.',
    ],
  },
  {
    title: 'Data Security',
    body: [
      'We take reasonable technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. Passwords are stored using industry-standard hashing.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You can access, update, or delete your account information at any time. You may also export your saved words and statistics, or contact us to request the deletion of your personal data.',
      'To exercise any of these rights, contact us at support@dictionary.ai.',
    ],
  },
  {
    title: 'Contact Us',
    body: [
      'If you have questions about this Privacy Policy or how we handle your data, please reach out to support@dictionary.ai. We will respond as soon as possible.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How D. Dictionary AI collects, uses, and protects your information."
      icon={ShieldCheck}
      updated="August 4, 2026"
      current="privacy"
      sections={sections}
    />
  );
}
