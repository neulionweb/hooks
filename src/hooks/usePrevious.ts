import { useEffect, useRef } from 'react';

function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref.current;
}

export default usePrevious;
