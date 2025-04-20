import type { Guess } from "../page";

export default function Board({ guesses }: { guesses: Guess[] }) {
	return (
		<div className="grid grid-cols-5 gap-2">
			{guesses.map((guess) => (
				<div key={guess.id}>{guess.content}</div>
			))}
		</div>
	);
}
