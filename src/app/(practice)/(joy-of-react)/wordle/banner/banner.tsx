function SuccessBanner({ numGuesses }: { numGuesses: number }) {
	return (
		<div className="-translate-x-1/2 fixed bottom-0 left-1/2 z-10 mx-auto max-w-[600px] transform rounded-t-md bg-wordle-success p-10 text-center text-2xl text-white">
			<p>
				<strong>Congratulations!</strong> Got it in
				<strong> {numGuesses} guesses</strong>.
			</p>
		</div>
	);
}

function FailureBanner({ answer }: { answer: string }) {
	return (
		<div className="-translate-x-1/2 fixed bottom-0 left-1/2 z-10 mx-auto max-w-[600px] transform rounded-t-md bg-wordle-error p-10 text-center text-2xl text-white">
			<p>
				Sorry, the correct answer is <strong>{answer}</strong>.
			</p>
		</div>
	);
}

function Banner() {
	return null;
}

Banner.Success = SuccessBanner;
Banner.Failure = FailureBanner;

export default Banner;
