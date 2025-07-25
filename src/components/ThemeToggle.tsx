import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage and system preference
    const getInitialTheme = () => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme') === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const initialTheme = getInitialTheme();
    const currentTheme = document.documentElement.classList.contains('dark');

    // Sync state with actual DOM
    setIsDark(currentTheme);
    setIsLoaded(true);

    // If there's a mismatch, fix it
    if (initialTheme !== currentTheme) {
      document.documentElement.classList.toggle('dark', initialTheme);
      setIsDark(initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);

    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }
  };

  // Don't render until we've determined the correct theme
  if (!isLoaded) {
    return (
      <div className='rounded-md p-2 w-9 h-9 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'>
        {/* Placeholder while loading */}
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className='rounded-md p-2 text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 transition-colors'
      aria-label='Toggle theme'
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
            clipRule='evenodd'
          />
        </svg>
      ) : (
        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
        </svg>
      )}
    </button>
  );
}
