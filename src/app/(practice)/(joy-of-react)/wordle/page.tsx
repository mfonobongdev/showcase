"use client";

import React from "react";
import Banner from "./banner";
import Board from "./board";
import GameForm from "./game-form";
import Header from "./header";
import checkGuess, { type GuessResult } from "./utils/check-guess";
import NUM_OF_GUESSES_ALLOWED from "./utils/constants";
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
	const [gameState, setGameState] = React.useState<"playing" | "won" | "lost">(
		"playing",
	);

	function handleAddGuess(guess: string) {
		const guessResults = checkGuess(guess, answer);

		if (!guessResults) {
			return;
		}

		const isCorrect = guess.toLowerCase() === answer.toLowerCase();
		const isLastGuess = guesses.length === NUM_OF_GUESSES_ALLOWED - 1;
		const hasLost = !isCorrect && isLastGuess;
		const hasWon = isCorrect;

		setGuesses((prevGuesses) => [
			...prevGuesses,
			{ id: crypto.randomUUID(), content: guessResults },
		]);

		if (hasLost) {
			setGameState("lost");
		} else if (hasWon) {
			setGameState("won");
		}
	}

	return (
		<div className="grid h-screen grid-rows-[max-content_1fr_max-content] justify-items-center font-open-runde">
			<Header />
			<Board guesses={guesses} />
			<GameForm handleAddGuess={handleAddGuess} gameState={gameState} />
			<>
				{gameState === "won" && <Banner.Success numGuesses={guesses.length} />}
				{gameState === "lost" && <Banner.Failure answer={answer} />}
			</>
		</div>
	);
}
