import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Alert,
    Chip,
} from "@mui/material";

export default function Question({ questionData, onAnswer }) {
    const [selected, setSelected] = useState("");
    const [message, setMessage] = useState("");

    const allChoices = [
        questionData.correct_answer,
        ...questionData.incorrect_answers,
    ];

    allChoices.sort(() => Math.random() - 0.5);

    const handleClick = (choice) => {
        setSelected(choice);
        const isCorrect = choice === questionData.correct_answer;

        onAnswer(isCorrect);
        setMessage(isCorrect ? "Correct!" : "Incorrect");
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ mb: 3 }}
                >
                    {questionData.question}
                </Typography>
                <Box sx={{ mb: 3 }}>
                    {allChoices.map((choice, index) => (
                        <Button
                            key={index}
                            variant={
                                selected === choice ? "contained" : "outlined"
                            }
                            color={
                                selected === choice
                                    ? choice === questionData.correct_answer
                                        ? "success"
                                        : "error"
                                    : "primary"
                            }
                            onClick={() => handleClick(choice)}
                            disabled={selected !== ""}
                            fullWidth
                            sx={{
                                mb: 1,
                                justifyContent: "flex-start",
                                textAlign: "left",
                                minHeight: 48,
                            }}
                        >
                            {choice}
                        </Button>
                    ))}
                </Box>
                {selected && (
                    <Alert
                        severity={
                            selected === questionData.correct_answer
                                ? "success"
                                : "error"
                        }
                        sx={{ mb: 2 }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {message}
                        </Typography>
                        {selected !== questionData.correct_answer && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Correct answer:{" "}
                                <Chip
                                    label={questionData.correct_answer}
                                    color="success"
                                    size="small"
                                />
                            </Typography>
                        )}
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
