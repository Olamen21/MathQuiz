import { ImageBackground, StyleSheet, Text, View, Image, Modal, Pressable, Dimensions } from 'react-native'
import React,{ useState, useContext, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import { db,  collection, addDoc, getDoc, where, query, doc, updateDoc} from '../firebase/index'
import { TouchableOpacity } from 'react-native-gesture-handler'

import COLORS from '../style/Colors'
import Login from '../src/Login'
import Signup_upImg from '../src/Signup_upImg'
import { UserContext } from './UserContext'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Design Drawer (Thanh bar bên cạnh)
const CustomDrawer = (props) => {
    const { navigation } = props;
    const { user, setUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    const getInfo = async () => {
        try {
            const docRef = doc(db, "users", user.userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUser((prevUser) => ({
                    ...prevUser,
                    ...userData
                }));
            } else {
                console.log("No such document!");
            }
            console.log("---Check---")
            console.log(user.username)
            console.log(user.email)
        } catch (error) {
            console.error("Error getting info of user: ", error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('drawerOpen', getInfo);
        return unsubscribe;
    }, [navigation]);


  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: COLORS.main}}>
            <ImageBackground source={require('../img/menu_bg.jpg')} style={{padding: 20, }}>
            <View style={{ flexDirection: 'row' }}>
                        {user.profileImage ? (
                            <Image source={{ uri: user.profileImage }} style={styles.BgImg} />
                        ) : null}
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.ContentImg}>{user.username}</Text>
                            <Text style={styles.ContentEmail}>{user.email}</Text>
                        </View>
                    </View>
            </ImageBackground>

            <View style={styles.ItemList}>
                <DrawerItemList {...props}/>
            </View>         
            
        </DrawerContentScrollView>
        <View style={styles.ViewBottom}>
            <TouchableOpacity onPress={()=>setShowModal(true)} style={{paddingVertical:5}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="exit-outline" size={25} color={COLORS.black}/>
                    <Text style={styles.TextLogOut}> Sign Out</Text>
                </View>
            </TouchableOpacity>
    
            
        </View>
        <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.ViewModal}>
                    <View style={styles.ViewModalContent}>
                        <Text style={styles.TextModal}>Are you sure you want to sign out?</Text>
                        <View style={styles.ViewButtonModal}>
                            <Pressable
                             style={styles.Pressable}
                             onPress={()=>{
                                navigation.navigate('Welcome')
                                setShowModal(false)
                            }}>
                                <Text style={styles.TextButton}>Confirm</Text>
                            </Pressable>
                            <Pressable 
                             style={styles.Pressable}
                             onPress={()=>setShowModal(false)}>
                                <Text style={styles.TextButton}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    BgImg:{
        height:80, 
        width: 80, 
        borderRadius: 40, 
        marginBottom: 3, 
        marginTop: 10,
        marginLeft: -5
    },
    ContentImg:{
        color: COLORS.white,
        fontSize: 17,
        marginTop: 25,
        marginLeft: 10,
    },
    ContentEmail:{
        color: COLORS.grey,
        fontSize: 12,
        marginLeft: 10,
    },
    ItemList:{
        flex: 1,
        backgroundColor: COLORS.white,
        
    },
    ViewBottom:{
       padding: windowWidth*0.02,
       borderTopWidth: 1,
       borderTopColor: COLORS.grey, 
    },
    TextLogOut:{
        color: COLORS.black,
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 2
    },
    ViewModal:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    ViewModalContent:{
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 10
    },
    TextModal:{
        color: COLORS.black,
        fontSize: 18
    },
    ViewButtonModal:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 10,
        justifyContent: 'center',
    },
    TextButton:{
        color: COLORS.black,
        fontWeight: 'bold',
        textAlign: 'center',
        width: "100%"
    },
    Pressable:{
        flex: 1,
        marginTop: 4,
        paddingVertical: 5,
        alignItems: 'center'
    }
})
