import { useState, useEffect } from "react";

export default function Question() {
    const getQuestions = async () => {
        try {
            const response = await fetch(
                "https://opentdb.com/api.php?amount=10",
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error occured: ", error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return null;
}
