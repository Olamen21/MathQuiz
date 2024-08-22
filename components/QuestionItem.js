import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import COLORS from "../style/Colors";

const QuestionItem = (props) => {
    const { Name, A, B, C, D, Content, Correct, onAnswer } = props;

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);


    //Xử lý câu trả lời (đúng/sai)
    const handlePress = (answer) => {
        if (!isAnswered) {
            setSelectedAnswer(answer);
            const correct = answer === Correct;
            setIsCorrect(correct);
            setIsAnswered(true);
            setTimeout(() => {
                onAnswer(correct);
            }, 3000);
        }
    };

    //Đổi màu câu trả lời
    const getBackgroundColor = (answer) => {
        if (selectedAnswer === answer) {
            return isCorrect ? 'green' : 'red';
        }
        if (isAnswered && answer === Correct) {
            return 'green';
        }
        return 'white';
    };

    useEffect(() => {
        setIsAnswered(false);
        setIsCorrect(null);
        setSelectedAnswer(null);
    }, [Correct]);

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.textQuestion}>{Name}</Text>
                <Text style={styles.textContent}>{Content}</Text>
            </View>
            {[A, B, C, D].map((answer, index) => (
                <Pressable
                    key={index}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? COLORS.mainColor : getBackgroundColor(answer),
                        },
                        styles.answer
                    ]}
                    onPress={() => handlePress(answer)}
                    disabled={isAnswered}
                >
                    <Text style={styles.textAnswer}>{answer}</Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginLeft: 5,
    },
    questionContainer: {
        borderRadius: 15,
        borderColor: 'black',
        marginHorizontal: 10,
        marginBottom: 50,
        borderWidth: 2,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '90%',
        padding: 10,
        height: '30%',
        backgroundColor: COLORS.buttonColor,
    },
    answer: {
        borderRadius: 30,
        borderColor: 'black',
        marginHorizontal: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 70,
        width: '90%',
        marginTop: 10,
    },
    textAnswer: {
        fontSize: 20,
        color: 'black',
    },
    textQuestion: {
        fontSize: 24,
        fontWeight: '500',
        color: 'black',
    },
    textContent: {
        fontSize: 24,
        color: 'black',
        justifyContent: 'center',
        alignSelf: 'center'
    },
});

export default QuestionItem;
