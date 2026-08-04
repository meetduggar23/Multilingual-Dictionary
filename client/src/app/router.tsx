import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import DictionaryPage from '@/pages/DictionaryPage';
import DailyWordPage from '@/pages/DailyWordPage';
import FavoritesPage from '@/pages/FavoritesPage';
import HistoryPage from '@/pages/HistoryPage';
import QuizPage from '@/pages/QuizPage';
import TranslatorPage from '@/pages/TranslatorPage';
import AIAssistantPage from '@/pages/AIAssistantPage';
import ProfilePage from '@/pages/ProfilePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/dictionary', element: <DictionaryPage /> },
  { path: '/daily-word', element: <DailyWordPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/history', element: <HistoryPage /> },
  { path: '/quiz', element: <QuizPage /> },
  { path: '/translator', element: <TranslatorPage /> },
  { path: '/ai-assistant', element: <AIAssistantPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
