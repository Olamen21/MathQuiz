import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native'
import React,{ useState, useContext } from 'react'
import ImagePicker from 'react-native-image-crop-picker';

import Icon from 'react-native-vector-icons/Ionicons'
import COLORS from '../style/Colors'
import Button from '../components/Button';
import { db,  collection, addDoc, getDoc, where, query, doc, updateDoc} from '../firebase/index'
import { UserContext } from '../components/UserContext'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Signup_upImg = ({navigation}) => {
    const { user, setUser } = useContext(UserContext);
    
    const [image, setImage] = useState('');


    const uploadImg = async (image) => {
        try {
            const userCheck = doc(db, "users", user.userId);
            await updateDoc(userCheck, {
              profileImage: image,
            })
            setUser((prevUser) => ({
                ...prevUser,
                profileImage: image,
            }));
        } catch (e) {
            console.error("Error updating document: ", e);
        }
      };
    
      const selectPhoto = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,
            cropperCircleOverlay: true,
            avoidEmptySpaceAroundImage: true,
            freeStyleCropEnabled: true,
        })
        .then(image => {
            if (image && image.data && image.mime) {
                const data = `data:${image.mime};base64,${image.data}`;
                setImage(data);
                uploadImg(data);
            } else {
                console.error("Invalid image data");
            }
        })
        .catch(error => {
            console.error("Error selecting image: ", error);
        });
      };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={selectPhoto} style={styles.container}>
                <View style={styles.ViewImg}>
                <View style={styles.Img_user}>
                    {image ?(
                        <Image
                            source={{ uri: image }}
                            style={{
                                height: 201,
                                width: 201,
                                left:-5,
                                top: -3,
                                borderRadius: 100,
                                borderWidth: 3,
                                borderColor: COLORS.black,
                            }}
                        />
                    ) : null}
                </View>
                
                    <View style={styles.iconContainer}>
                        <Icon name='camera' size={50} color={COLORS.white}/>
                    </View>
                </View>
            </TouchableOpacity>
            <Text style={styles.label}>Select your photo here!</Text>
            <View style={styles.Button}>
                <Button
                    title ="Go back"
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.ButtonBack}
                />
                <Button
                    title="Next"
                    filled 
                    onPress={() => navigation.navigate('AppStack')}
                    style={styles.ButtonNext}
                />
            </View>
        </View>
    )
}

export default Signup_upImg

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Img_user: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: COLORS.black,
    },
    
    ViewImg: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom: windowWidth * 0.2,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    
    iconContainer: {
        position: 'absolute',
        backgroundColor: COLORS.black,
        borderRadius: 100,
        top: windowWidth*0.35,
        left: windowWidth*0.35,
        padding: 5,
    },
    label:{
        fontSize: 28,
        color: COLORS.gray,
        textAlign:'center',
        bottom: windowWidth*0.8
    },
    Button:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        left: 20,
        right: 10,
        bottom: 30,
    },
    ButtonBack:{
        marginTop:300,
        width: 150,
    },
    ButtonNext:{
        marginTop: 300, 
        width: 150,
    }
})
