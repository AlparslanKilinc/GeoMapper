import { useState, useEffect } from 'react';

export const useDebounce = (value, delay, onDebounce) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isExternalUpdate, setIsExternalUpdate] = useState(true);

  useEffect(() => {
    setDebouncedValue(value);
    setIsExternalUpdate(true);
  }, [value]);

  useEffect(() => {
    if (!isExternalUpdate) {
      const handler = setTimeout(() => {
        onDebounce(debouncedValue);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [debouncedValue, delay, onDebounce, isExternalUpdate]);

  const updateValue = (newValue) => {
    setDebouncedValue(newValue);
    setIsExternalUpdate(false);
  };

  return [debouncedValue, updateValue];
};
