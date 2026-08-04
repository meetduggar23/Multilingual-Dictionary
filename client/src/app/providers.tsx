import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              border: '1px solid #ECE7DF',
              borderRadius: '16px',
              padding: '12px 16px',
              fontSize: '14px',
              color: '#14213D',
              boxShadow: '0 4px 24px rgba(20,33,61,0.08)',
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
