export function Controls({
	timeLeft,
	isRunning,
	onTimeChange,
	onPlay,
}: {
	timeLeft: number;
	isRunning: boolean;
	onTimeChange: (time: number) => void;
	onPlay: () => void;
}) {
	return (
		<div className="grid grid-cols-[max-content_max-content_max-content] place-content-center gap-4 text-xs">
			<button
				className="cursor-pointer rounded-full bg-black/30 px-2.5 py-1 text-white disabled:opacity-50"
				type="button"
				disabled={isRunning}
				onClick={() => {
					const nextTime = Math.max(0, timeLeft - 10);
					onTimeChange(nextTime);
				}}
			>
				-
			</button>
			<button
				className="cursor-pointer rounded-full bg-black/30 px-2.5 py-1 text-white disabled:opacity-50"
				type="button"
				id="play"
				disabled={isRunning}
				onClick={onPlay}
			>
				Play
			</button>
			<button
				className="cursor-pointer rounded-full bg-black/30 px-2.5 py-1 text-white disabled:opacity-50"
				type="button"
				disabled={isRunning}
				onClick={() => {
					const nextTime = timeLeft + 10;
					onTimeChange(nextTime);
				}}
			>
				+
			</button>
		</div>
	);
}
