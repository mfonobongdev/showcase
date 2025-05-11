import { useMeasure } from "@uidotdev/usehooks";
import React from "react";
import { mergeRefs } from "react-merge-refs";

type UseGetSliderDragValueProps = {
	min?: number;
	max?: number;
	startingValue?: number;
	value?: number;
	onValueChange?: (value: number) => void;
};

type internalState = {
	value: number;
	startingDragValue: number;
	startingDragPosition: number;
};

export function useGetSliderDragValue({
	min = 0,
	max = 100,
	value = 50,
	onValueChange,
}: UseGetSliderDragValueProps) {
	const elementRef = React.useRef<HTMLElement>(null);
	const [measureRef, { width, height }] = useMeasure();
	const mergedRef = mergeRefs<HTMLElement>([elementRef, measureRef]);

	const [internalState, setInternalState] = React.useState<internalState>({
		value: value,
		startingDragValue: value,
		startingDragPosition: 0,
	});

	const handleSetSliderValue = React.useCallback(
		(value: number) => {
			setInternalState((prev) => ({
				...prev,
				value: value,
			}));
			onValueChange?.(value);
		},
		[onValueChange],
	);

	const handlePointerDown = React.useCallback((e: PointerEvent) => {
		setInternalState((prev) => ({
			...prev,
			startingDragValue: prev.value,
			startingDragPosition: e.clientX,
		}));
	}, []);

	const handlePointerMove = React.useCallback(
		(e: PointerEvent) => {
			if (!width) return;
			if (e.buttons <= 0) return;

			const pixelsPerUnit = (max - min) / width;
			const pixelsDragged = e.clientX - internalState.startingDragPosition;
			const differenceInUnits = pixelsDragged * pixelsPerUnit;
			setInternalState((prev) => {
				const newValue = prev.startingDragValue + differenceInUnits;
				if (newValue < min) return { ...prev, value: min };
				if (newValue > max) return { ...prev, value: max };
				return {
					...prev,
					value: newValue,
				};
			});
		},
		[internalState, max, min, width],
	);

	React.useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		element.addEventListener("pointerdown", handlePointerDown);
		element.addEventListener("pointermove", handlePointerMove);

		return () => {
			element.removeEventListener("pointerdown", handlePointerDown);
			element.removeEventListener("pointermove", handlePointerMove);
		};
	}, [handlePointerDown, handlePointerMove]);

	return [mergedRef, internalState.value, handleSetSliderValue] as const;
}
