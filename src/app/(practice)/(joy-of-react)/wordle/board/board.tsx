"use client";

import classNames from "classnames";
import type { Guess } from "../page";
import type { GuessResult } from "../utils/check-guess";
import NUM_OF_GUESSES_ALLOWED from "../utils/constants";
import rangeBuilder from "../utils/range-builder";

export default function Board({ guesses }: { guesses: Guess[] }) {
	function rowHasGuess(row: number): boolean {
		return row < guesses.length;
	}

	return (
		<div className="grid grid-flow-row auto-rows-min grid-cols-1 gap-2 place-self-center">
			{rangeBuilder(NUM_OF_GUESSES_ALLOWED).map((row) => (
				<GuessRow key={row}>
					{rangeBuilder(5).map((cell) => (
						<GuessCell
							key={cell}
							guessResult={
								rowHasGuess(row) ? guesses[row].content[cell] : undefined
							}
						/>
					))}
				</GuessRow>
			))}
		</div>
	);
}

function GuessRow({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid auto-cols-min grid-flow-col grid-rows-1 gap-2">
			{children}
		</div>
	);
}

function GuessCell({ guessResult }: { guessResult: GuessResult | undefined }) {
	return (
		<div
			className={classNames(
				"grid h-20 w-20 place-items-center rounded-md bg-gray-100",
				guessResult?.status === "correct" && "bg-green-800",
				guessResult?.status === "misplaced" && "bg-yellow-500",
				guessResult?.status === "incorrect" && "bg-gray-600",
			)}
		>
			<span className="font-bold text-4xl text-white">
				{guessResult?.letter}
			</span>
		</div>
	);
}
