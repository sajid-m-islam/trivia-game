import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    LinearProgress,
} from "@mui/material";
import Question from "./Question";

export default function Game() {
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [showNextQuestion, setShowNextQuestion] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

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

        if (questionNumber >= questions.length - 1) {
            setGameCompleted(true);
        } else {
            setShowNextQuestion(true);
        }
    };

    const handleNext = () => {
        if (questions && questionNumber < questions.length - 1) {
            setQuestionNumber((prev) => prev + 1);
        }
        setShowNextQuestion(false);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    color="primary"
                >
                    Trivia Game
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {gameCompleted
                            ? `Final Score: ${score}/10`
                            : `Score: ${score}`}
                    </Typography>
                </Box>
                {gameCompleted && (
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            Game Completed!
                        </Typography>
                        <Typography variant="body1">
                            You answered {score} out of 10 questions correctly!
                        </Typography>
                    </Box>
                )}
                {questions.length > 0 && !gameCompleted ? (
                    <Question
                        key={questionNumber}
                        questionData={questions[questionNumber]}
                        onAnswer={handleUpdateAnswer}
                    />
                ) : !gameCompleted ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            py: 4,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Loading questions...
                        </Typography>
                        <LinearProgress sx={{ width: "100%", maxWidth: 300 }} />
                    </Box>
                ) : null}
                {!gameCompleted && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 3,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={
                                !questions ||
                                questions.length === 0 ||
                                questionNumber >= questions.length - 1 ||
                                !showNextQuestion
                            }
                            size="large"
                        >
                            Next Question
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
