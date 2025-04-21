"use client";

import React from "react";
import Board from "./board";
import GameForm from "./game-form";
import Header from "./header";
import checkGuess, { type GuessResult } from "./utils/check-guess";
import WORDS from "./utils/data";
import sample from "./utils/sample";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

export type Guess = {
	id: string;
	content: GuessResult[];
};

export default function Wordle() {
	const [guesses, setGuesses] = React.useState<Guess[]>([]);

	function handleAddGuess(guess: string) {
		const guessResults = checkGuess(guess, answer);

		if (!guessResults) {
			return;
		}

		setGuesses((prevGuesses) => [
			...prevGuesses,
			{ id: crypto.randomUUID(), content: guessResults },
		]);
	}

	return (
		<div className="grid h-screen grid-rows-[max-content_1fr_max-content] justify-items-center font-open-runde">
			<Header />
			<Board guesses={guesses} />
			<GameForm handleAddGuess={handleAddGuess} />
		</div>
	);
}
