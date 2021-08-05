import {useCallback, useState, useEffect} from 'react';

function useWindowSize() {
	const [isClient] = useState(typeof window === 'object');

	const getSizeCallback = useCallback(() => ({
		width: isClient ? window.innerWidth : undefined,
		height: isClient ? window.innerHeight : undefined,
	}), [isClient]);

	const [windowSize, setWindowSize] = useState(getSizeCallback());

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		function handleResize() {
			setWindowSize(getSizeCallback());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [getSizeCallback, isClient]);

	return windowSize;
}

export default useWindowSize;
