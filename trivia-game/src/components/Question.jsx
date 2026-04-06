import { useState, useEffect } from "react";

export default function Question() {
    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");

    const getQuestions = async () => {
        try {
            const response = await fetch(
                "https://opentdb.com/api.php?amount=10",
            );
            const data = await response.json();
            console.log(data);

            setQuestion(data.results[0].question);
            setCorrectAnswer(data.results[0].correct_answer);

            const allChoices = [
                data.results[0].correct_answer,
                ...data.results[0].incorrect_answers,
            ];
            setChoices(allChoices);
        } catch (error) {
            console.error("Error occured: ", error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <>
            <h3>Question: {question}</h3>
            <p>Correct answer: {correctAnswer}</p>
            <ul>
                {choices.map((choice) => (
                    <li>{choice}</li>
                ))}
            </ul>
        </>
    );
}
