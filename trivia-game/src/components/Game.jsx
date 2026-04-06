import { useState, useEffect } from "react";
import Question from "./Question";

export default function Game() {
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [showNextQuestion, setShowNextQuestion] = useState(false);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await fetch(
                    "https://opentdb.com/api.php?amount=10",
                );
                const data = await response.json();
                console.log(data);
                if (data.results) {
                    setQuestions(data.results);
                } else {
                    console.error("No results in API response");
                }
            } catch (error) {
                console.error("Error occured: ", error);
            }
        };

        getQuestions();
    }, []);

    const handleUpdateAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }
        setShowNextQuestion(true);
    };

    const handleNext = () => {
        if (questions && questionNumber < questions.length - 1) {
            setQuestionNumber((prev) => prev + 1);
        }
        setShowNextQuestion(false);
    };

    return (
        <>
            <h2>Score: {score} </h2>
            {questions.length > 0 ? (
                <Question
                    questionData={questions[questionNumber]}
                    onAnswer={handleUpdateAnswer}
                ></Question>
            ) : (
                <p>Loading questions...</p>
            )}
            <button
                onClick={handleNext}
                disabled={
                    !questions ||
                    questions.length === 0 ||
                    questionNumber >= questions.length - 1 ||
                    !showNextQuestion
                }
            >
                Next Question
            </button>
        </>
    );
}
