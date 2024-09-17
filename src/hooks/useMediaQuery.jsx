import { useEffect, useState } from 'react';

export function useMediaQuery(feature, value) {
  const [match, setMatch] = useState(window.matchMedia(`(${feature}: ${value})`).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(${feature}: ${value})`);
    const handleChange = (e) => setMatch(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return match;
}
