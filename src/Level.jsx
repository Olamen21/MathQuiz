import React, { useState, useCallback, useContext } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,} from 'react-native';
import colors from '../style/Colors';
import { db } from '../firebase/index';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import QuestionItem from '../components/QuestionItem';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../components/UserContext';


const Level = ({ navigation, route }) => {
    const [questionList, setQuestionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const { user } = useContext(UserContext);
    const {id} = route.params;

    //reset trạng thái
    const resetState = () => {
        setQuestionList([]);
        setLoading(true);
        setCurrentQuestionIndex(0);
        setCorrectCount(0);
        setIncorrectCount(0);
    };

    //Lấy dữ liệu subcollection Question từ collection level
    const getQuestionList = async () => {
        setLoading(true);
        try {
            
            const levelDoc = doc(db, "level", id);
            
            const querySnapshot = await getDocs(collection(levelDoc, 'Question'));
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setQuestionList(items);
        } catch (error) {
            console.error("Error getting question list: ", error);
        } finally {
            setLoading(false);
        }
    };


    //Xử lý chuyển sang câu hỏi tiếp theo, đếm câu đúng và sai
    const handleNextQuestion = async (isCorrect) => {
        if (isCorrect) {
            setCorrectCount((prevCount) => prevCount + 1);
        } else {
            setIncorrectCount((prevCount) => prevCount + 1);
        }
        //Chuyển đến câu hỏi tiếp theo
        if (currentQuestionIndex < questionList.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            //set completed là true
            const levelDoc = doc(db, "users", user.userId, "level", id);
            await updateDoc(levelDoc, { completed: true });

            //Mở level mới
            await unlockNextLevel();
            
            navigation.navigate('ResultScreen', {
                correct: correctCount + (isCorrect ? 1 : 0),
                incorrect: incorrectCount + (isCorrect ? 0 : 1),
                id: route.params.id
            });
        }
    };

    //Mở level mới
    const unlockNextLevel = async () => {
        const currentLevelIndex = parseInt(id, 10);
        const nextLevelIndex = currentLevelIndex + 1;
        const nextLevelId = nextLevelIndex.toString();
        const nextLevelDoc = doc(db, "users", user.userId, "level", nextLevelId);
        await updateDoc(nextLevelDoc, { isPlayed: true });
    };

    const currentQuestion = questionList[currentQuestionIndex];

    useFocusEffect(
        useCallback(() => {
            resetState();
            getQuestionList();
        }, [route.params.id])
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <SafeAreaView style={styles.container}>
                    {currentQuestion && (
                        <QuestionItem 
                            {...currentQuestion}
                            onAnswer={handleNextQuestion}
                        />
                    )}
                </SafeAreaView>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    }
});

export default Level;
