import { useCallback, useState } from "react";

export const useCallbackRef =<T>() => {
	const [element, setElement] = useState<T>();
	const refCallback = useCallback((node: T) => {
		setElement(node);
	}, []);
  return { element, refCallback}
};
