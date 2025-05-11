"use client";
import { useGetSliderDragValue } from "@/hooks/use-get-slider-drag-value";
import { useHoverTouch } from "@/hooks/use-hover-touch";
import { useIsKeyboardFocused } from "@/hooks/use-is-keyboard-focused";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { MotionConfig, motion } from "motion/react";
import { Slider as SliderPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import type React from "react";
import { mergeRefs } from "react-merge-refs";

type SliderProps = ComponentProps<typeof SliderPrimitive.Root>;

const MotionSpeakerXMarkIcon = motion.create(SpeakerXMarkIcon);
const MotionSpeakerWaveIcon = motion.create(SpeakerWaveIcon);
const MotionTrack = motion.create(SliderPrimitive.Track);
const MotionRange = motion.create(SliderPrimitive.Range);

export default function Slider({ ...props }: SliderProps) {
	// check if the slider is being hovered/touched
	const [sliderContainerRef, sliderIsActive] = useHoverTouch();

	// get the focus visible class name for the slider track;
	// this is used to show a focus ring when the slider is focused with a keyboard
	const [sliderRootFocusRef, trackParentIsKeyboardFocused] =
		useIsKeyboardFocused();

	const [sliderRootDragRef, sliderInternalValue, handleSetSliderValue] =
		useGetSliderDragValue({
			min: props.min,
			max: props.max,
		});

	const sliderRootRef = mergeRefs([sliderRootDragRef, sliderRootFocusRef]);

	const sliderState: "idle" | "hover" = sliderIsActive ? "hover" : "idle";

	/* Animation states */
	const sliderWrapperAnimation = {
		idle: {
			marginInline: "0px",
		},
		hover: {
			marginInline: "-20px",
		},
	};

	const sliderIconAnimation = {
		idle: {
			scale: 1,
			opacity: 0.6,
		},
		hover: {
			scale: 1.2,
			opacity: 1,
		},
	};

	const sliderTrackAnimation = {
		idle: {
			height: "8px",
			opacity: 0.8,
		},
		hover: {
			height: "16px",
			opacity: 1,
		},
	};

	return (
		<MotionConfig
			transition={{ type: "spring", stiffness: 800, damping: 100, mass: 4 }}
		>
			<motion.div
				ref={sliderContainerRef as React.RefObject<HTMLDivElement>}
				className={
					"group relative grid touch-none select-none grid-flow-col grid-cols-[auto_1fr_auto] items-center gap-3 hover:cursor-grab active:cursor-grabbing"
				}
				animate={sliderWrapperAnimation[sliderState]}
			>
				<MotionSpeakerXMarkIcon
					className="size-5 text-black/80"
					initial={false}
					animate={sliderIconAnimation[sliderState]}
				/>
				<SliderPrimitive.Root
					ref={sliderRootRef as React.RefObject<HTMLDivElement>}
					name="radix-slider"
					className="relative grid h-full grid-flow-col items-center rounded-full"
					value={[sliderInternalValue]}
					onValueChange={(value) => {
						if (trackParentIsKeyboardFocused) {
							handleSetSliderValue(value[0]);
						}
					}}
					min={props.min}
					max={props.max}
				>
					<MotionTrack
						className={cn(
							"relative overflow-hidden rounded-full bg-black/10",
							trackParentIsKeyboardFocused &&
								"group-has-[&:focus-visible]:outline-2 group-has-[&:focus-visible]:outline-sky-500 group-has-[&:focus-visible]:outline-offset-2",
						)}
						initial={false}
						animate={sliderTrackAnimation[sliderState]}
					>
						<MotionRange className="absolute h-full bg-blue-400" />
					</MotionTrack>
					<SliderPrimitive.Thumb className="absolute inset-0 bg-amber-300" />
				</SliderPrimitive.Root>
				<MotionSpeakerWaveIcon
					className="size-5 text-black/80"
					initial={false}
					animate={sliderIconAnimation[sliderState]}
				/>
			</motion.div>
		</MotionConfig>
	);
}
