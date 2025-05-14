"use client";

import { useHoverTouch } from "@/hooks/use-hover-touch";
import { MotionConfig, motion } from "motion/react";

export default function HelloPolylinePage() {
	const [polylineRef, polylineIsActive] = useHoverTouch();
	const polylineState: "idle" | "hover" = polylineIsActive ? "hover" : "idle";

	/* Animation states */
	const polylineAnimation = {
		idle: {
			points: "20,50 40,70 60,30 80,50",
		},
		hover: {
			points: "20,50 40,30 60,70 80,50",
		},
	};

	return (
		<MotionConfig transition={{ ease: "easeInOut", duration: 0.4 }}>
			<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter">
				<div
					ref={polylineRef as React.RefObject<HTMLDivElement>}
					className="h-40 w-40 rounded-full bg-black/20 p-2 text-black/90"
				>
					<svg aria-hidden="true" width="420" viewBox="0 0 100 100">
						<motion.polyline
							initial={false}
							animate={polylineAnimation[polylineState]}
							points="20,50 40,30 60,70 80,50"
							stroke="currentColor"
							strokeWidth="5"
							strokeLinecap="round"
							strokeLinejoin="round"
							fill="none"
						/>
					</svg>
				</div>
			</div>
		</MotionConfig>
	);
}
