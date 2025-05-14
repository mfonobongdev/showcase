"use client";

import React from "react";
import { Background } from "./background";
import { Data } from "./data";

export type DataInput = {
	neutral: number;
	buy: number;
	sell: number;
	strongSell: number;
	strongBuy: number;
};

export default function FeyStatsChartPage() {
	const [data, setData] = React.useState<DataInput>({
		neutral: 7,
		buy: 22,
		sell: 5,
		strongSell: 1,
		strongBuy: 13,
	});
	return (
		<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter">
			<div className="grid grid-cols-[1fr_auto] gap-4 text-amber-700">
				<svg aria-hidden="true" viewBox="0 0 100 100" width="450">
					<Background data={data} />
					<Data data={data} />
				</svg>
				<button
					type="button"
					className="cursor-pointer self-end justify-self-end rounded-full bg-black/20 p-2 text-black/90"
					onClick={() => {
						setData({
							neutral: randomBetween(1, 30),
							buy: randomBetween(1, 30),
							sell: randomBetween(1, 30),
							strongSell: randomBetween(1, 30),
							strongBuy: randomBetween(1, 30),
						});
					}}
				>
					Shuffle
				</button>
			</div>
		</div>
	);
}

function randomBetween(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
