"use client";

import React from "react";
import Board from "./board";
import GameInput from "./game-input";
import Header from "./header";
import WORDS from "./utils/data";
import sample from "./utils/sample";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

export type Guess = {
	id: string;
	content: string;
};

export default function Wordle() {
	const [guesses, setGuesses] = React.useState<Guess[]>([]);

	function handleAddGuess(guess: string) {
		setGuesses((prevGuesses) => [
			...prevGuesses,
			{ id: crypto.randomUUID(), content: guess },
		]);
	}

	return (
		<div className="grid h-screen grid-rows-[auto_1fr_auto] justify-items-center font-open-runde">
			<Header />
			<Board guesses={guesses} />
			<GameInput handleAddGuess={handleAddGuess} />
		</div>
	);
}
