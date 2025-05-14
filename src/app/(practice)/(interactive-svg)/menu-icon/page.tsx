"use client";

import { MotionConfig, motion } from "motion/react";
import React from "react";

export default function MenuIconPage() {
	const [open, setOpen] = React.useState(false);
	const menuIconState: "closed" | "open" = open ? "open" : "closed";

	/* Animation states */
	const topLineAnimation = {
		closed: {
			y: ["5px", "5px", "0px"],
			rotate: ["45deg", "0deg", "0deg"],
		},
		open: {
			y: ["0px", "5px", "5px"],
			rotate: ["0deg", "0deg", "45deg"],
		},
	};

	const middleLineAnimation = {
		closed: {
			rotate: ["45deg", "0deg", "0deg"],
		},
		open: {
			rotate: ["0deg", "0deg", "45deg"],
		},
	};

	const bottomLineAnimation = {
		closed: {
			y: ["-5px", "-5px", "0px"],
			rotate: ["-45deg", "0deg", "0deg"],
		},
		open: {
			y: ["0px", "-5px", "-5px"],
			rotate: ["0deg", "0deg", "-45deg"],
		},
	};

	return (
		<MotionConfig transition={{ ease: "easeInOut", duration: 0.4 }}>
			<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter">
				<button
					aria-pressed={open}
					onClick={() => setOpen(!open)}
					type="button"
					className="h-14 w-14 rounded-full bg-gray-200 p-2 text-black/90"
				>
					<span className="sr-only">{open ? "Close" : "Open"} menu</span>
					<svg aria-hidden="true" viewBox="0 0 24 24" width="100%">
						<motion.g
							strokeLinejoin="round"
							strokeLinecap="round"
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
						>
							<motion.line
								initial={false}
								animate={topLineAnimation[menuIconState]}
								x1="4"
								y1="7"
								x2="20"
								y2="7"
							/>
							<motion.line
								initial={false}
								animate={middleLineAnimation[menuIconState]}
								x1="4"
								y1="12"
								x2="20"
								y2="12"
							/>
							<motion.line
								initial={false}
								animate={bottomLineAnimation[menuIconState]}
								x1="4"
								y1="17"
								x2="20"
								y2="17"
							/>
						</motion.g>
					</svg>
				</button>
			</div>
		</MotionConfig>
	);
}
