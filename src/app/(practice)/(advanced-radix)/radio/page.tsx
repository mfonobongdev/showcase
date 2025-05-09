"use client";

import { RadioGroup } from "radix-ui";
import { useState } from "react";

const options = [
	{ value: "1tb", label: "1TB SSD Storage", price: 0 },
	{ value: "2tb", label: "2TB SSD Storage", price: 400 },
	{ value: "4tb", label: "4TB SSD Storage", price: 1000 },
	{ value: "8tb", label: "8TB SSD Storage", price: 2200 },
];

export default function RadioPage() {
	const [selectedValue, setSelectedValue] = useState(options[0].value);
	const selectedOption = options.find((o) => o.value === selectedValue);

	return (
		<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter">
			<div className="p-4">
				<form
					className="grid grid-flow-row gap-2"
					action={(formData) => {
						alert(JSON.stringify(Object.fromEntries(formData)));
					}}
				>
					<p className="font-medium">Storage</p>
					<RadioGroup.Root
						className="grid grid-flow-row gap-1.5"
						name="storage"
						required
						value={selectedValue}
						onValueChange={setSelectedValue}
					>
						{options.map((option) => (
							<RadioGroup.Item
								className="grid w-full grid-flow-col grid-cols-2 items-center gap-2 rounded-lg border border-gray-500 p-4 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-[3px] data-[state=checked]:border-blue-500 data-[state=checked]:ring-1 data-[state=checked]:ring-blue-500 data-[state=checked]:ring-inset"
								key={option.value}
								value={option.value}
							>
								<span className="font-semibold text-black/60 text-sm">
									{option.label}
								</span>

								{selectedOption && option.value !== selectedValue && (
									<span className="justify-self-end text-black/30 text-xs tabular-nums">
										{option.price > selectedOption.price ? "+ " : "- "}
										{toCurrency(option.price - selectedOption.price)}
									</span>
								)}
							</RadioGroup.Item>
						))}
					</RadioGroup.Root>

					<div className="mt-8 text-right">
						<button
							type="submit"
							className="rounded bg-blue-500 px-3 py-1 font-semibold text-sm text-white hover:bg-blue-400 focus:outline-none focus-visible:outline focus-visible:outline-blue-500 focus-visible:outline-offset-2"
						>
							Buy
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function toCurrency(v: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		signDisplay: "never",
	}).format(v);
}
