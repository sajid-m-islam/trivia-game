import { useState, useEffect } from "react";

export default function Question({ questionData, onAnswer }) {
    const [choices, setChoices] = useState([]);
    const [selected, setSelected] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const allChoices = [
            questionData.correct_answer,
            ...questionData.incorrect_answers,
        ];

        setChoices(allChoices);
        setSelected("");
        setMessage("");
    }, [questionData]);

    const handleClick = (choice) => {
        setSelected(choice);
        const isCorrect = choice === questionData.correct_answer;

        onAnswer(isCorrect);
        setMessage(isCorrect ? "Correct!" : "Incorrect");
    };

    return (
        <>
            <h3>Question: {questionData.question}</h3>
            <p>Correct answer: {questionData.correct_answer}</p>
            <div>
                <ul>
                    {choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(choice)}
                            disabled={selected !== ""}
                        >
                            {choice}
                        </button>
                    ))}
                </ul>
            </div>
            {selected && (
                <div>
                    <p>{message}</p>
                </div>
            )}
        </>
    );
}
