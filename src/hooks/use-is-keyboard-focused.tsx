import React from "react";

export function useIsKeyboardFocused() {
	const elementRef = React.useRef<HTMLElement>(null);
	const [isUsingPointer, setIsUsingPointer] = React.useState(false);

	const handlePointerDown = React.useCallback(() => {
		setIsUsingPointer(true);
	}, []);

	const handleFocusOut = React.useCallback(() => {
		setIsUsingPointer(false);
	}, []);

	React.useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		// Attach the event listeners
		element.addEventListener("pointerdown", handlePointerDown);
		element.addEventListener("focusout", handleFocusOut);

		// Clean up the event listeners
		return () => {
			element.removeEventListener("pointerdown", handlePointerDown);
			element.removeEventListener("focusout", handleFocusOut);
		};
	}, [handleFocusOut, handlePointerDown]);

	return [elementRef, !isUsingPointer] as const;
}
