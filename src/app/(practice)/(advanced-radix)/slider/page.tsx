"use client";

import Slider from "./slider";

export default function SliderPage() {
	return (
		<div className="grid h-screen w-screen grid-flow-col place-items-center bg-[#fafafa] font-inter">
			<form
				action={async (formData) => {
					const data = Object.fromEntries(formData);
					alert(JSON.stringify(data));
				}}
				className="grid w-full max-w-xs grid-flow-row gap-10"
			>
				<p className="font-medium text-black/60 text-sm">Settings</p>
				<Slider name="radix-slider" />
				{/* <input type="range" name="native-slider" className="w-full" /> */}
				<div className="grid grid-flow-col justify-items-start">
					<button type="submit" className="rounded-lg bg-black/80 px-4 py-1">
						<span className="text-sm text-white">Save</span>
					</button>
				</div>
			</form>
		</div>
	);
}
