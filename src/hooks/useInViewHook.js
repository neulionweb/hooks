import {useCallback, useState} from 'react';
import {useInView} from 'react-hook-inview';

function useInViewHook({inViewConfig}) {
	const [domInView, setDomInView] = useState(false);
	const onEnter = useCallback(() => {
		setDomInView(true);
	}, []);
	const [ref] = useInView(inViewConfig || {
		rootMargin: '100px',
		onEnter,
	});

	return [ref, domInView];
}

export default useInViewHook;
