import { useCallback, useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): WindowSize {
  const [isClient] = useState<boolean>(typeof window === 'object');

  const getSizeCallback = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient]
  );

  const [windowSize, setWindowSize] = useState<WindowSize>(getSizeCallback());

  useEffect(() => {
    if (!isClient) return undefined;

    function handleResize() {
      setWindowSize(getSizeCallback());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSizeCallback, isClient]);

  return windowSize;
}

export default useWindowSize;
