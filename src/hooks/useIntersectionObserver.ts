import { useEffect } from 'react';
import { useCallbackRef } from './useCallbackRef';

export const useIntersectionObserver = <T>(
	onObserve: IntersectionObserverCallback
) => {
	const { element, refCallback } = useCallbackRef<T>();

	useEffect(() => {
		const observer = new IntersectionObserver(onObserve, {
			rootMargin: '500px'
		});
		element && observer.observe(element as unknown as Element);
		return () => {
			if (element) {
				observer.disconnect();
			}
		};
	}, [element]);

	return { refCallback };
};
