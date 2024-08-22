import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import COLORS from "../style/Colors";

const Result = ({ navigation, route }) => {
    const { correct, incorrect } = route.params;
    return (
        <View style={styles.container}>
            <View style={[styles.box, styles.boxShadow]}>
                <Text style={styles.header}>
                    KẾT QUẢ
                </Text>
                <View style={styles.row}>
                    <View style={styles.result}>
                        <Text style={[styles.text, {color: 'green'}]}>ĐÚNG</Text>
                        <Text style={styles.textSmall}>{correct}</Text>
                    </View>
                    <View style={styles.result}>
                        <Text style={[styles.text, {color: 'red'}]}>SAI</Text>
                        <Text style={styles.textSmall}>{incorrect}</Text>
                    </View>
                </View>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? COLORS.mainColor : 'white',
                        },
                            styles.buttonBottom
                    ]}
                    onPress={() => navigation.navigate('GameScreen')}
                >
                        <Text style={styles.textButton}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        height: '50%',
        width: '90%',
        backgroundColor: COLORS.buttonColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 100,
        borderRadius: 20,
    },
    boxShadow: {
        shadowColor: "#333333",
        shadowOffset: {
            width: 6, 
            height: 6,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 10,

    },
    header: {
        fontSize: 24,
        marginTop: 20,
        fontWeight: '500',
        color: 'black',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 50,
    },
    result: {
      marginHorizontal: 50,
    },
    text: {
        fontSize: 24,
        fontWeight: '500',
    },
    textSmall: {
        marginTop: 20,
        marginLeft: 15,
        fontSize: 20,
        color: 'black',
    },
    buttonBottom: {
        borderRadius: 15,
        borderWidth: 2,
        width: '30%',
        marginBottom: 20,
    },
    textButton: {
        fontSize: 20,
        color: 'black',
        padding: 10,
        textAlign: 'center'
    },
})

export default Result;