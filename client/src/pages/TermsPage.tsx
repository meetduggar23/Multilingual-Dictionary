import { Scale } from 'lucide-react';
import { LegalPage } from '@/components/common/LegalPage';

const sections = [
  {
    title: 'Introduction',
    body: [
      'These Terms of Service ("Terms") govern your access to and use of the D. Dictionary AI service. By accessing or using the service, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use the service.',
    ],
  },
  {
    title: 'Definitions',
    body: [
      'For the purposes of these Terms:',
      '"Service" means the D. Dictionary AI website, including its AI dictionary, translator, assistant, quizzes, and related learning features.',
      '"User" means any individual who accesses or uses the Service, whether or not they have registered an account.',
      '"Content" means any data, text, or material you submit to or generate through the Service.',
    ],
  },
  {
    title: 'User Responsibilities',
    body: [
      'You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.',
      'You must be at least 13 years old to create an account and use the Service.',
    ],
  },
  {
    title: 'Data Collection',
    body: [
      'When you use the Service, we collect information necessary to provide and improve the experience, including account details, saved words, search history, and learning progress.',
      'We use this information solely to power the features you use, sync your data across devices, and personalize your vocabulary recommendations. We do not sell your data.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'We use cookies and local storage to keep you signed in and to remember your preferences and saved words. You may disable cookies in your browser, though some features may not function correctly.',
    ],
  },
  {
    title: 'Third-party Services',
    body: [
      'The Service may integrate with or link to third-party services. We are not responsible for the content, privacy practices, or reliability of any external services, and your use of them is subject to their own terms and policies.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, D. Dictionary AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Service.',
      'The Service is provided "as is" without warranties of any kind, and we do not guarantee that it will be uninterrupted, error-free, or entirely accurate. AI-generated content is provided for educational purposes and should be used with judgment.',
    ],
  },
  {
    title: 'Contact Information',
    body: [
      'If you have any questions about these Terms of Service, please contact our support team at support@dictionary.ai.',
      'We may update these Terms from time to time. The latest version will always be available on this page, and continued use of the Service after changes are posted constitutes acceptance of the revised Terms.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The rules and guidelines for using D. Dictionary AI."
      icon={Scale}
      updated="August 2026"
      current="terms"
      sections={sections}
    />
  );
}
