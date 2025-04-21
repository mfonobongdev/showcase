"use client";

import { Form, Formik, useField, useFormikContext } from "formik";
import type React from "react";
import * as Yup from "yup";

const guessValidationSchema = Yup.object({
	guess: Yup.string()
		.required("Guess is required")
		.min(5, "Guess must be 5 characters long")
		.max(5, "Guess must be 5 characters long"),
});

export default function GameForm({
	handleAddGuess,
}: {
	handleAddGuess: (guess: string) => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center gap-2 p-5">
			<h3 className="font-semibold text-gray-600 text-sm uppercase">
				Enter a guess
			</h3>
			<Formik
				initialValues={{ guess: "" }}
				validationSchema={guessValidationSchema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(values, { resetForm, setSubmitting }) => {
					handleAddGuess(values.guess);
					setSubmitting(false);
					resetForm();
				}}
			>
				<Form>
					<GuessTextInput name="guess" />
				</Form>
			</Formik>
		</div>
	);
}

const GuessTextInput = ({ name }: { name: string }) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toUpperCase();
		if (value.length > 5) return;
		setFieldValue(name, value);
	};

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<input
				{...field}
				className="rounded-md border-1 border-gray-600 p-2"
				onChange={handleGuessChange}
			/>
			<div className="h-4">
				{meta.touched && meta.error ? (
					<div className="error text-center text-red-500 text-xs">
						{meta.error}
					</div>
				) : null}
			</div>
		</div>
	);
};
