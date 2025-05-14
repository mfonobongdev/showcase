"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function TreadsIconPage() {
	const [isPlaying, setIsPlaying] = useState(false);
	const iconState: "idle" | "running" = isPlaying ? "running" : "idle";

	/* Animation states */
	const iconAnimation = {
		idle: {
			strokeDashoffset: 0,
			transition: {
				delay: 0.5,
				duration: 0,
			},
		},
		running: {
			strokeDashoffset: -70,
			transition: {
				duration: 3,
				ease: "linear",
			},
		},
	};

	return (
		<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter text-sky-500">
			<div className="grid grid-rows-[1fr_max-content] gap-5">
				<svg aria-hidden="true" viewBox="0 0 15 18" width="300">
					{/* background */}
					<path
						d="M14 5.90968C14 5.90968 12.8403 1.19575 7.91139 1.00639C2.98244 0.817033 1.42001 4.88117 1.12694 6.92737C0.833871 8.97357 0.881464 13.037 3.12748 15.2537C5.3735 17.4704 8.11821 17.075 9.56208 16.734C11.006 16.3929 12.9214 15.2174 13.2172 12.8483C13.5129 10.4792 12.0864 8.96269 9.47703 8.50011C6.86763 8.03754 5.28195 8.77766 5.07004 10.6679C4.85814 12.5581 8.25931 13.7735 9.65099 11.9232C11.0427 10.0729 10.5208 7.01987 9.91193 6.18724C9.30307 5.3546 7.91139 4.98454 7.04159 5.16957C5.75156 5.444 5.21501 6.37227 5.21501 6.37227"
						stroke="black"
						strokeWidth="1.5"
						strokeLinecap="round"
						fill="none"
					/>
					<motion.path
						initial={false}
						animate={iconAnimation[iconState]}
						onAnimationComplete={() => setIsPlaying(false)}
						d="M14 5.90968C14 5.90968 12.8403 1.19575 7.91139 1.00639C2.98244 0.817033 1.42001 4.88117 1.12694 6.92737C0.833871 8.97357 0.881464 13.037 3.12748 15.2537C5.3735 17.4704 8.11821 17.075 9.56208 16.734C11.006 16.3929 12.9214 15.2174 13.2172 12.8483C13.5129 10.4792 12.0864 8.96269 9.47703 8.50011C6.86763 8.03754 5.28195 8.77766 5.07004 10.6679C4.85814 12.5581 8.25931 13.7735 9.65099 11.9232C11.0427 10.0729 10.5208 7.01987 9.91193 6.18724C9.30307 5.3546 7.91139 4.98454 7.04159 5.16957C5.75156 5.444 5.21501 6.37227 5.21501 6.37227"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeDasharray="8 70"
						strokeLinecap="round"
						fill="none"
					/>
				</svg>
				<button
					type="button"
					className="cursor-pointer rounded-lg bg-black/80 px-2 py-1 text-white text-xs"
					onClick={() => setIsPlaying(!isPlaying)}
				>
					Play
				</button>
			</div>
		</div>
	);
}
