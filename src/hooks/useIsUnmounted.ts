import { useEffect, useRef } from 'react';

const useIsUnmounted = () => {
  const unmountedRef = useRef(false);
  useEffect(
    () => () => {
      unmountedRef.current = true;
    },
    [],
  );

  return () => unmountedRef?.current;
};

export default useIsUnmounted;
