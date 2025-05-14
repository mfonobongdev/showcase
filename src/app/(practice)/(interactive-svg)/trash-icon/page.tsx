"use client";
import { MotionConfig } from "motion/react";

import { useHoverTouch } from "@/hooks/use-hover-touch";
import { motion } from "motion/react";

export default function TrashIconPage() {
	const [trashIconRef, trashIconIsActive] = useHoverTouch();

	const trashIconState: "idle" | "hover" = trashIconIsActive ? "hover" : "idle";

	/* Animation states */
	const trashBodyAnimation = {
		idle: {
			y: "0px",
		},
		hover: {
			y: "0.5px",
		},
	};

	const trashLidAnimation = {
		idle: {
			rotate: "0deg",
		},
		hover: {
			rotate: "120deg",
		},
	};

	return (
		<MotionConfig
			transition={{ type: "spring", stiffness: 800, damping: 100, mass: 4 }}
		>
			<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter">
				<button
					ref={trashIconRef as React.RefObject<HTMLButtonElement>}
					type="button"
					className="grid grid-flow-col items-center gap-2 rounded-full border-2 border-[#991b1b] bg-[#7f1d1d] px-4 py-2 text-white"
				>
					<span>Delete</span>
					<motion.svg aria-hidden="true" viewBox="0 0 24 24" width="32">
						<g
							strokeLinejoin="round"
							strokeLinecap="round"
							stroke="currentColor"
							strokeWidth="1.5"
							fill="none"
						>
							{/* body */}
							<motion.g
								initial={false}
								animate={trashBodyAnimation[trashIconState]}
							>
								<polygon points="6 8, 7 20, 17 20, 18 8" />
								<line x1="14" y1="11" x2="14" y2="17" />
								<line x1="10" y1="11" x2="10" y2="17" />
							</motion.g>
							{/* lid */}
							<motion.g
								initial={false}
								animate={trashLidAnimation[trashIconState]}
								style={{
									originX: "18px",
									originY: "8px",
								}}
							>
								<line x1="5" y1="8" x2="19" y2="8" />
								<rect width="4" height="2.5" x="10" y="5.5" />
							</motion.g>
						</g>
					</motion.svg>
				</button>
			</div>
		</MotionConfig>
	);
}
