"use client";

import cn from "classnames";
import { motion } from "motion/react";
import { Switch } from "radix-ui";

export default function SwitchPage() {
	return (
		<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter">
			<div className="grid grid-flow-col items-center gap-2">
				<label className="cursor-pointer text-xs" htmlFor="airplane-mode">
					Airplane mode
				</label>
				<Switch.Root
					id="airplane-mode"
					className={cn(
						"grid w-11 cursor-pointer grid-flow-row rounded-full p-px shadow-black/10 shadow-inner transition-colors duration-600",
						"data-[state=unchecked]:justify-items-start data-[state=checked]:justify-items-end",
						"data-[state=checked]:bg-sky-500 data-[state=unchecked]:bg-gray-300",
						"outline-transparent focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2",
					)}
				>
					<Switch.Thumb asChild>
						<motion.div
							layout
							transition={{ type: "tween", ease: "easeInOut", duration: 0.28 }}
							className={"block h-6 w-6 rounded-full bg-white shadow-sm"}
						/>
					</Switch.Thumb>
				</Switch.Root>
			</div>
		</div>
	);
}
