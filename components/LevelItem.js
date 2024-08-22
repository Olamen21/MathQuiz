import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import COLORS from '../style/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const LevelItem = (props) => {
    const { navigation, id, name, isPlayed, completed } = props;
    const [played, setPlayed] = useState(isPlayed);

    const handlePress = () => {
        if (isPlayed) {
            navigation.navigate('Level', { id, completed });
        } else {
            Alert.alert("Thông báo", "Bạn chưa đạt đến màn này");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.touch} 
                onPress={handlePress}>
                <Text style={styles.text}>{name}</Text>
                {
                    played ? (
                        <Icon name="unlock" size={24} color='black'/>
                    ) : (
                        <Icon name="lock" size={24} color='black' />
                    )
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    touch: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
        width: '90%',
        height: 50,
        backgroundColor: COLORS.buttonColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
});

export default LevelItem;