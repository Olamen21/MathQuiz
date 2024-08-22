import React, { useState, useCallback, useContext } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import LevelItem from '../components/LevelItem';
import { db, collection, getDocs, doc, setDoc } from '../firebase/index';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../components/UserContext';

const Game = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const userLevelsRef = collection(db, 'users', user.userId, 'level');
    const levelsRef = collection(db, 'level');

    const [levelList, setLevelList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getLevelList = async () => {
        setLoading(true);
        try {
            
            //Lấy dữ liệu từ collection level -> name
            const querySnapshot = await getDocs(levelsRef);
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            //Lấy id của collection users -> level
            const userLevelsSnapshot = await getDocs(userLevelsRef);
            const userLevels = {};
            userLevelsSnapshot.forEach((doc) => {
                userLevels[doc.id] = doc.data();
            });


            // Merge data
            const updatedItems = await Promise.all(items.map(async (item, index) => {
                const userLevelData = userLevels[item.id] || {};
                item.isPlayed = userLevelData.isPlayed || false;
                item.completed = userLevelData.completed || false;
                return item;
            }));

            setLevelList(updatedItems);
        } catch (error) {
            console.error("Error getting level list: ", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getLevelList();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../img/icon_back.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.textBig}>Level</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                levelList.length > 0 ? (
                    <FlatList
                        style={styles.gridView}
                        data={levelList}
                        renderItem={({ item }) =>
                            <LevelItem
                                name={item.name}
                                isPlayed={item.isPlayed}
                                id={item.id}
                                navigation={navigation}
                                completed={item.completed}
                            />
                        }
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Text>No levels available</Text>
                )
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tinyLogo: {
        width: 30,
        height: 30,
        marginLeft: 10,
        tintColor: 'white',
    },
    row: {
        flexDirection: 'row',
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 10,
    },
    textBig: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 120,
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
});

export default Game;
