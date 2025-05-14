"use client";

import { motion } from "motion/react";
import { useId } from "react";
import type { DataInput } from "./page";
import { toPoints } from "./utils";

export function Data({ data }: { data: DataInput }) {
	const id = useId();
	return (
		<g>
			<defs>
				<marker id={id} markerWidth="4" markerHeight="4" refX="2" refY="2">
					<circle cx="2" cy="2" r="2" fill="currentColor" />
				</marker>
			</defs>
			<motion.polygon
				initial={false}
				animate={{
					points: toPoints(data),
				}}
				stroke="currentColor"
				strokeWidth="0.3"
				fill="#EAEC8A"
				fillOpacity="0.18"
				markerStart={`url(#${id})`}
				markerMid={`url(#${id})`}
			/>
		</g>
	);
}
