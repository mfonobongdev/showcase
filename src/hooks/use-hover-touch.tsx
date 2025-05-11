"use client";

import * as React from "react";

export function useHoverTouch() {
	const elementRef = React.useRef<HTMLElement>(null);
	const [isActive, setIsActive] = React.useState<boolean>(false);

	// Mouse event handlers
	const handleMouseEnter = React.useCallback(() => {
		setIsActive(true);
	}, []);

	const handleMouseLeave = React.useCallback(() => {
		setIsActive(false);
	}, []);

	// Touch event handlers
	const handleTouchStart = React.useCallback(() => {
		setIsActive(true);
	}, []);

	const handleTouchEnd = React.useCallback(() => {
		setIsActive(false);
	}, []);

	const handleTouchCancel = React.useCallback(() => {
		setIsActive(false);
	}, []);

	React.useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		// Mouse events
		element.addEventListener("mouseenter", handleMouseEnter);
		element.addEventListener("mouseleave", handleMouseLeave);

		// Touch events
		element.addEventListener("touchstart", handleTouchStart);
		element.addEventListener("touchend", handleTouchEnd);
		element.addEventListener("touchcancel", handleTouchCancel);

		return () => {
			// Clean up mouse events
			element.removeEventListener("mouseenter", handleMouseEnter);
			element.removeEventListener("mouseleave", handleMouseLeave);

			// Clean up touch events
			element.removeEventListener("touchstart", handleTouchStart);
			element.removeEventListener("touchend", handleTouchEnd);
			element.removeEventListener("touchcancel", handleTouchCancel);
		};
	}, [
		handleMouseEnter,
		handleMouseLeave,
		handleTouchStart,
		handleTouchEnd,
		handleTouchCancel,
	]);

	return [elementRef, isActive] as const;
}
