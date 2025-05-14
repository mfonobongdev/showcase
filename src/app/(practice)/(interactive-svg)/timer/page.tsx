"use client";

import useInterval from "@use-it/interval";
import { motion } from "motion/react";
import { useState } from "react";
import { Controls } from "./controls";
import { CurrentTime } from "./current-time";

export default function TimerPage() {
	const [startTime, setStartTime] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useInterval(
		() => {
			if (timeLeft === 0) {
				setIsRunning(false);
				return;
			}
			setTimeLeft((prev) => Math.max(0, prev - 1));
		},
		isRunning ? 1000 : null,
	);

	const timerState: "idle" | "running" = isRunning ? "running" : "idle";

	/* Animation states */
	const circleAnimation = {
		idle: {
			pathLength: 0,
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
		running: {
			pathLength: 1,
			transition: {
				duration: startTime,
				ease: "linear",
			},
		},
	};

	const lineAnimation = {
		idle: {
			rotate: 0,
			transition: {
				duration: 0,
			},
		},
		running: {
			rotate: -360,
			transition: {
				duration: startTime,
				ease: "linear",
			},
		},
	};

	return (
		<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter">
			<div className="grid w-[300px] grid-flow-row gap-4 ">
				<div className="grid w-full grid-flow-col items-center justify-between gap-4 rounded-full bg-black/90 pr-4 text-[#f6a11e]">
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						width="64"
						strokeWidth="1.5"
					>
						<g fill="none" stroke="currentColor">
							<circle cx="12" cy="12" r="6" opacity="0.2" />
							<motion.path
								d="M 11.999,6 A 6,6 0 1 0 12,6"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								initial={false}
								animate={circleAnimation[timerState]}
							/>
						</g>
						<motion.line
							style={{
								originX: "12px",
								originY: "12px",
							}}
							x1="12"
							y1="8"
							x2="12"
							y2="10"
							stroke="currentColor"
							strokeLinecap="round"
							initial={false}
							animate={lineAnimation[timerState]}
						/>
					</svg>
					<CurrentTime time={timeLeft} />
				</div>
				<Controls
					timeLeft={timeLeft}
					isRunning={isRunning}
					onTimeChange={(nextTime) => {
						setTimeLeft(nextTime);
						setStartTime(nextTime);
					}}
					onPlay={() => {
						if (timeLeft !== startTime) {
							setTimeLeft(startTime);
						}
						setIsRunning(!isRunning);
					}}
				/>
			</div>
		</div>
	);
}
