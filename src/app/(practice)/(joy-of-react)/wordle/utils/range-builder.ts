export default function rangeBuilder(
	start: number,
	end?: number,
	step = 1,
): number[] {
	const output: number[] = [];
	let rangeStart = start;
	let rangeEnd = end;

	if (typeof rangeEnd === "undefined") {
		rangeEnd = rangeStart;
		rangeStart = 0;
	}

	for (let i = rangeStart; i < rangeEnd; i += step) {
		output.push(i);
	}
	return output;
}
