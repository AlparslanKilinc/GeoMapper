import { useState, useEffect } from 'react';

export const useDebounce = (value, delay, onDebounce) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedValue !== value) {
        onDebounce(debouncedValue);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue, delay, onDebounce]);

  return [debouncedValue, setDebouncedValue];
};
