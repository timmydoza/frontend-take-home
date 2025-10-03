import { useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(val: T, delay: number): T => {
  const [debouncedVal, setDebouncedVal] = useState<T>(val);

  const timeoutRef = useRef<number>(0);
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setDebouncedVal(val), delay);
  }, [timeoutRef, val, delay]);

  return debouncedVal;
};
