import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from '@/app/RequireAuth';
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
  {
    path: '/favorites',
    element: (
      <RequireAuth>
        <FavoritesPage />
      </RequireAuth>
    ),
  },
  {
    path: '/history',
    element: (
      <RequireAuth>
        <HistoryPage />
      </RequireAuth>
    ),
  },
  {
    path: '/quiz',
    element: (
      <RequireAuth>
        <QuizPage />
      </RequireAuth>
    ),
  },
  { path: '/translator', element: <TranslatorPage /> },
  { path: '/ai-assistant', element: <AIAssistantPage /> },
  {
    path: '/profile',
    element: (
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    ),
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/privacy-policy', element: <PrivacyPage /> },
  { path: '/terms-of-service', element: <TermsPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
