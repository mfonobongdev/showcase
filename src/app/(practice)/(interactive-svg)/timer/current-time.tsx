export function CurrentTime({ time }: { time: number }) {
	return <p className="font-medium text-3xl">{formatTime(time)}</p>;
}

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};
