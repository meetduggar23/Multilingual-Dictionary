import * as React from 'react';

interface ThemeContextValue {
  theme: 'light';
  resolvedTheme: 'light';
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme: 'light',
      resolvedTheme: 'light',
      toggleTheme: () => {},
    }),
    [],
  );

  React.useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
