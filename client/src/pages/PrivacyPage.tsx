import { ShieldCheck } from 'lucide-react';
import { LegalPage } from '@/components/common/LegalPage';

const sections = [
  {
    title: 'Introduction',
    body: [
      'This Privacy Policy explains how D. Dictionary AI ("we", "our", or "us") collects, uses, stores, and protects your personal information when you use our service. By accessing or using the service, you agree to the practices described in this policy.',
      'We are committed to protecting your privacy and handling your data transparently. Please read this policy carefully to understand your rights and how your information is processed.',
    ],
  },
  {
    title: 'Definitions',
    body: [
      'For the purposes of this Privacy Policy:',
      '"Personal Data" means any information relating to an identified or identifiable individual, such as your name, email address, or saved vocabulary data.',
      '"Service" means the D. Dictionary AI website, its AI dictionary, translator, assistant, and related learning tools.',
      '"User" means any person who accesses or uses the Service.',
    ],
  },
  {
    title: 'User Responsibilities',
    body: [
      'You are responsible for keeping your account credentials confidential and for ensuring that the information you provide is accurate and up to date.',
      'You must not share your password with others, and you must notify us immediately if you suspect any unauthorized use of your account.',
    ],
  },
  {
    title: 'Data Collection',
    body: [
      'We collect information you provide directly, such as your name, email address, and password when you create an account. We also store data you generate while using the service, including saved words, search history, quiz progress, and vocabulary statistics.',
      'We automatically collect limited technical information such as browser type, device information, and IP address to operate, secure, and improve the service. We never sell your personal information.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'We use cookies and local browser storage to keep you signed in, remember your preferences, and remember words you have saved. These small files help the service function smoothly across visits.',
      'You can disable cookies in your browser settings at any time. Please note that some features of the service may not work as intended if you do.',
    ],
  },
  {
    title: 'Third-party Services',
    body: [
      'We may use trusted third-party service providers to help operate the service, such as hosting infrastructure, analytics, and authentication. These providers only have access to the information needed to perform their functions and are bound by confidentiality obligations.',
      'The Service may contain links to external websites. We are not responsible for the privacy practices of those websites and encourage you to review their policies.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, we shall not be liable for any loss or damage arising from your use of third-party services, from unauthorized access to your account, or from reliance on AI-generated content that may not always be accurate.',
    ],
  },
  {
    title: 'Contact Information',
    body: [
      'If you have any questions about this Privacy Policy or how we handle your data, please reach out to our support team. We will respond to your inquiry as soon as possible.',
      'Contact us at support@dictionary.ai for any privacy-related requests, including access, correction, or deletion of your personal data.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How D. Dictionary AI collects, uses, and protects your information."
      icon={ShieldCheck}
      updated="August 2026"
      current="privacy"
      sections={sections}
    />
  );
}
