import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function useDarkMode() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const node = useMemo(() => {
    if (!mounted) return null;

    if (currentTheme === 'dark') {
      return (
        <>
          <SunIcon className='w-4 h-4 text-white' />
          <p>Light mode</p>
        </>
      );
    } else {
      return (
        <>
          <MoonIcon className='w-4 h-4 text-white' />
          <p>Dark mode</p>
        </>
      );
    }
  }, [currentTheme, mounted]);

  const themeChanger = useCallback(() => {
    if (currentTheme === 'dark') {
      return setTheme('light');
    }
    return setTheme('dark');
  }, [currentTheme]);

  return {
    currentTheme,
    node,
    themeChanger,
  };
}

export default useDarkMode;
