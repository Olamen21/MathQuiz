import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, Pressable, Modal, TextInput, Dimensions, Alert} from 'react-native'
import React,{ useState, useContext, useEffect } from 'react'
import COLORS from '../style/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-crop-picker';

import CustomDrawer from '../components/CustomDrawer'
import { UserContext } from '../components/UserContext'
import { db,  collection, addDoc, getDoc, where, query, doc, updateDoc,deleteDoc, FIREBASE_AUTH} from '../firebase/index'
import { updateEmail, updatePassword } from 'firebase/auth'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({navigation}) => {
  const { user, setUser } = useContext(UserContext);
  const auth = FIREBASE_AUTH;
  

  const [showModalPersonal, setShowModalPersonal] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showModalPass, setShowModalPass] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPasswordShown1, setIsPasswordShown1] = useState(false);
  const [isPasswordShown2, setIsPasswordShown2] = useState(false);

  const [selectedGender, setSelectedGender] = useState('Male/Female');
  const [USERNAME, SETUSERNAME] = useState('')
  const [EMAIL, SETEMAIL] = useState('')
  const [PHONE, SETPHONE] = useState('')
  const [image, setImage]=useState('');
  const [GENDER, SETGENDER] = useState(false);

  const [PASSWORD, SETPASSWORD] = useState('')
  const [OLDPASSWORD, SETOLDPASSWORD] = useState('')
  const [NEWPASSWORD, SETNEWPASSWORD] = useState('')
  const [UPDATEPASSWORD, SETUPDATEPASSWORD] = useState('')

  const [oldpassError, setOldpassError] = useState('');
  const [updatepassError, setUpdatePassError] = useState('')

  //validate email
  const [emailError, setEmailError] = useState('');
  //validate phone
  const [phoneError, setPhoneError] = useState('');
  //validate username
  

  const getInfo = async () => {
    try {
      console.log(user.userId)
        const docRef = doc(db, "users", user.userId);
        const docSnap = await getDoc(docRef);


        if (docSnap.exists()) {
            const users = docSnap.data();

            const username = users.username;
            const email = users.email;
            const phone = users.phone;
            const img = users.profileImage;
            const gender = users.gender;
            const pass = users.password;
           

            SETUSERNAME(username);
            SETEMAIL(email);
            SETPHONE(phone);
            setImage(img);
            
            SETPASSWORD(pass);
            SETGENDER(gender);
            if(gender===true){
              setSelectedGender("Male")
            }else if(gender===false){
              setSelectedGender("Female")
            }else{
              setSelectedGender("Male/Female")
            }
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting info of user: ", error);
    }
  };

  useEffect(() => {
      getInfo();
  },[]);

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

  const validateEmail = (text) => {
    SETEMAIL(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(text)) {
      setEmailError('The email is invalid. Please enter it again.');
    } else {
      setEmailError('');
    }
  };
  
  const validatePhone = (text) => {
    SETPHONE(text);
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(text)) {
      setPhoneError('Phone number must be exactly 10 digits and start with 0.');
    } else {
      setPhoneError('');
    }
  };
  

  const updateContact = async() => {
    try {
      if(EMAIL=="" || PHONE==""){
        Alert.alert("Please fill in all the required information.");
        return;
      }
      if (emailError || phoneError) {
        Alert.alert("Invalid Input", "Please correct the errors before signing up.");
        return;
      }
      
      const users = auth.currentUser;
      if(PASSWORD=="null"){
        Alert.alert("Cannot update email", "You logged in with email, cannot update email address.");
        return;
      }
      if (EMAIL !== users.email) {
        await updateEmail(user, EMAIL);
      }
      console.log("Checkkkkk")
      console.log(EMAIL)

      
      const Contact = doc(db, "users", user.userId);
      console.log("2")
      await updateDoc(Contact, {
        email: EMAIL,
        phone: PHONE,
      })
      setUser((prevUser) => ({
        ...prevUser,
        email: EMAIL,
      }));
      console.log("Contact information updated successfully");
      Alert.alert("Updated successfully")
    } catch (error) {
      console.log("Error updating document: " + error)
    }
  }

  const updateInfo = async() => {
    try {
      if(USERNAME==""){
        Alert.alert("Please fill in all the required information.");
        return;
      }
      
  
      console.log("-------------------------------")
      console.log(selectedGender)
      const gender = selectedGender === "Male" ? true : false;
      console.log(gender);
      const Info = doc(db, "users", user.userId);
      await updateDoc(Info, {
        username: USERNAME,
        gender: gender
      })
      setUser((prevUser) => ({
        ...prevUser,
        username: USERNAME
      }));
      console.log("Contact information updated successfully");
      Alert.alert("Updated successfully")
    } catch (error) {
      console.log("Error updating document: " + error)
    }
  }
  const updateUserPassword = async (newPassword) => {
    try {
      const user = auth.currentUser;

      if(newPassword !==user.password){
          // Cập nhật mật khẩu của người dùng
          await updatePassword(user, newPassword);
            
          console.log("User password updated successfully.");
      }
      
  
    } catch (error) {
      console.error("Error updating user password:", error);
      // Xử lý lỗi nếu có
    }
  };

  const updatePasswordUser = async()=>{
    try {
      if(PASSWORD!=OLDPASSWORD){
        setOldpassError('The password is invalid. Please enter it again.')
      }else{
        setOldpassError('')
      }
      if(NEWPASSWORD!=UPDATEPASSWORD){
        setUpdatePassError('The password you entered does not match the new password.')
      }else{
        setUpdatePassError('')
      }

      if(OLDPASSWORD==PASSWORD && NEWPASSWORD==UPDATEPASSWORD){
        updateUserPassword(UPDATEPASSWORD)
        const pass = doc(db, "users", user.userId);
        await updateDoc(pass, {
          password: UPDATEPASSWORD
        })
        SETPASSWORD(UPDATEPASSWORD)
        SETOLDPASSWORD('')
        SETNEWPASSWORD('')
        SETUPDATEPASSWORD('')
        console.log("Contact information updated successfully");
        Alert.alert("Updated successfully")
        setShowModalPass(false)
        
      }else{
        setShowModalPass(true)
      }
     
    } catch (error) {
      console.log("Error updating document: " + error)
    }
  } 

  const deleteAccount = async() =>{

    try {
      const user = auth.currentUser;
      
      if (user) {
        // Xóa tài khoản người dùng khỏi Firebase Authentication
        await user.delete();
  
        // Xóa thông tin người dùng khỏi Firestore
        await deleteDoc(doc(db, "users", user.uid));
  
        console.log("User account deleted successfully.");
        // Bạn có thể điều hướng người dùng đến trang đăng nhập hoặc trang khác sau khi xóa tài khoản
        navigation.navigate("Login");
      } else {
        console.log("No user is currently logged in.");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error deleting user account: ", errorCode, errorMessage);
  
      // Xử lý lỗi chi tiết
      switch (errorCode) {
        case 'auth/requires-recent-login':
          Alert.alert("Please re-login and try again.");
          // Điều hướng người dùng đến trang đăng nhập để đăng nhập lại
          navigation.navigate("Login");
          break;
        // Thêm các lỗi khác nếu cần
        default:
          console.error("An unknown error occurred.");
          break;
      }
    }
  };
  

  

  return (
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.white}}>
      <ScrollView>
        
        
        <View>
          <ImageBackground
            source={require("../img/profile_bg.jpg")}
            style={styles.Img_bg}
          />
          <TouchableOpacity onPress={()=>selectPhoto()}>
            <View style={styles.ViewImg}>
            {image ? (
                  <Image
                      source={{ uri: image }}
                      style={styles.Img_user}
                  />
              ) : null}
              <View style={styles.iconContainer}>
                <Icon name='camera' size={35} color={COLORS.white}/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.ViewProfile}>
          <Text style={styles.TextProfile}>{USERNAME}</Text>
        </View>


        {/* Phần thông tin cơ bản */}
        
        <View style={styles.Container}>
          <TouchableOpacity onPress={()=>setShowModalPersonal(true)} style={{paddingVertical:5}}>
            <View style={styles.contentContainer}>
              <View style={styles.contentColumn}>
                <View style={styles.ViewContentName}>
                  <Text style={styles.Title}>Personal information</Text>
                  <Icon2 name='edit' size={22} color={COLORS.black}/>
                </View>
                
                <View style={styles.ViewContentName}>
                  <Text style={styles.TextName}>User name</Text>
                  <Text style={styles.InputName}>{USERNAME}</Text>
                </View>
                {/* <View style={styles.ViewContentName}>
                  <Text style={styles.TextName}>Date</Text>
                  <Text style={styles.InputName}>dd/mm/yyyy</Text>
                </View> */}
                <View style={styles.ViewContentName}>
                  <Text style={styles.TextName}>Gender</Text>
                  <Text style={styles.InputName}>{selectedGender}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

            {/* Modal sửa thông tin cơ bản */}
            <Modal
                visible={showModalPersonal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.ViewModal}>
                    <View style={styles.ViewModalContent}>
                      <Text style={styles.ModalTitle}>Edit Personal information</Text>
                      <View style={{marginBottom: 8,flexDirection:'row'}}>
                        <Text style={styles.TextEmail}>Username</Text>
                        <View style={styles.ViewEmail}>
                          <TextInput
                            placeholder='Enter your username'
                            placeholderTextColor={COLORS.black}
                            value={USERNAME}
                            onChangeText={(text)=>SETUSERNAME(text)}
                            keyboardType='email-address'
                            style={{
                              width: "100%",
                              color: COLORS.black
                            }}/>
                        </View>
                      </View>
                      <View style={{marginBottom: 8,flexDirection:'row'}}>
                        <Text style={styles.TextEmail}>Gender</Text>
                        <View style={styles.wrapper}>
                          {['Male', 'Female'].map(feeling => (
                          <View key={feeling} style={styles.mood}>
                            <Text style={styles.feeling}>{feeling}</Text>
                            
                            <Pressable
                              style={styles.optionButton}
                              onPress={()=>setSelectedGender(feeling)}
                              > 
                                  {selectedGender === feeling && <View style={styles.selectedOption}/>}
                                
                            </Pressable>
                            
                          </View>
                          ))}
                        </View>
                      
                      </View>
                      
                      <View style={styles.ViewButtonModal}>
                            <Pressable
                             style={styles.Pressable}
                             onPress={()=>{
                                updateInfo()
                                setShowModalPersonal(false)
                            }}>
                                <Text style={styles.TextButton}>Confirm</Text>
                            </Pressable>
                            <Pressable 
                             style={styles.Pressable}
                             onPress={()=>{
                              SETUSERNAME(USERNAME)
                              setSelectedGender(selectedGender)
                              setShowModalPersonal(false)}}>
                                <Text style={styles.TextButton}>Cancel</Text>
                            </Pressable>
                        </View>
                  </View>
                </View>
            </Modal>



          {/* Phần thông tin liên lạc */}
          <TouchableOpacity onPress={()=>setShowModalContact(true)} style={{paddingVertical:5}}>
            <View style={styles.contentContainer}>
              <View style={styles.contentColumn}>
                <View style={styles.ViewContentName}>
                  <Text style={styles.Title}>Contact information</Text>
                  <Icon2 name='edit' size={22} color={COLORS.black}/>
                </View>
                
                <View style={styles.ViewContentName}>
                  <Text style={styles.TextName}>Email address</Text>
                  <Text style={{
                    flex: 2, 
                    fontSize:13,
                    marginVertical: 8,
                    color: COLORS.gray,
                    marginRight: 10, 
                  }}>{EMAIL}</Text>
                </View>
                <View style={styles.ViewContentName}>
                  <Text style={styles.TextName}>Phone number</Text>
                  <Text style={styles.InputName}>{PHONE}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Modal sửa thông tin liên lạc */}
          <Modal
                visible={showModalContact}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.ViewModal}>
                    <View style={styles.ViewModalContent}>
                      <Text style={styles.ModalTitle}>Edit Contact information</Text>
                      <View style={{marginBottom: 8,flexDirection:'row'}}>
                        <Text style={styles.TextEmail}>Email address</Text>
                        <View style={styles.ViewEmail}>
                          <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            value={EMAIL}
                            onChangeText={(text)=>validateEmail(text)}
                            keyboardType='email-address'
                            style={{
                              width: "100%",
                              color: COLORS.black
                            }}/>
                        </View>
        
                      </View>
                      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                      <View style={{marginBottom: 8,flexDirection:'row'}}>
                        <Text style={styles.TextPhone}>Phone Number</Text>
                        <View style={styles.ViewPhone}>
                          <TextInput
                            placeholder='+84'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            
                            style={{
                              width: "15%",
                              borderRightWidth: 1,
                              borderLeftColor: COLORS.grey,
                              height: "100%"
                            }}/>

                            <TextInput
                              placeholder='Enter your phone number'
                              placeholderTextColor={COLORS.black}
                              keyboardType='numeric'
                              value={PHONE}
                              onChangeText={(text) => validatePhone(text)}
                              style={{
                                width: "80%",
                                color: COLORS.black
                              }}/>
                        </View>
                      </View>
                      {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
                      <View style={styles.ViewButtonModal}>
                            <Pressable
                             style={styles.Pressable}
                             onPress={()=>{
                                updateContact();
                                setShowModalContact(false);
                            }}>
                                <Text style={styles.TextButton}>Confirm</Text>
                            </Pressable>
                            <Pressable 
                             style={styles.Pressable}
                             onPress={()=>{
                              SETEMAIL(EMAIL)
                              SETPHONE(PHONE)
                              setShowModalContact(false)}}>
                                <Text style={styles.TextButton}>Cancel</Text>
                            </Pressable>
                        </View>
                  </View>
                </View>
            </Modal>


          {/* Phần thay đổi mật khẩu */}
          <TouchableOpacity onPress={()=>setShowModalPass(true)} style={{paddingVertical:5}}>
            <View style={styles.contentContainer}>
              <View style={styles.contentColumn}>
                <View style={styles.ViewContentName}>
                  <Text style={styles.Change}>Change Password</Text>
                  <Icon3 name='right' size={22} color={COLORS.black}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Modal của thay đổi mật khẩu */}
          <Modal
                visible={showModalPass}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.ViewModal}>
                    <View style={styles.ViewModalContent}>
                      <Text style={styles.ModalTitle}>Change Password</Text>
                      <View style={{marginBottom: 8, flexDirection:'row'}}>
                        <Text style={styles.TextPass}>Old password</Text>
                        <View style={styles.ViewPass}>
                          <TextInput
                            placeholder='Enter your old password'
                            placeholderTextColor={COLORS.black}
                            value={OLDPASSWORD}
                            onChangeText={(text) => SETOLDPASSWORD(text)}
                            secureTextEntry={!isPasswordShown}
                            style={{
                              color: COLORS.black,
                              flex:1,
                              width:"100%",
                            }}/>

                            <Pressable
                              onPress={()=> setIsPasswordShown(!isPasswordShown)}
                              style={{
                                position: "absolute",
                                right: 12,
                              }}
                            >

                              {
                                isPasswordShown == true ? (
                                  <Icon name="eye" size={24} color={COLORS.black}/>
                                ) : (
                                  <Icon name="eye-off" size={24} color={COLORS.black}/>
                                )
                              }
                            </Pressable>
                        </View>
                        
                      </View>
                      {oldpassError ? <Text style={styles.error}>{oldpassError}</Text> : null}
                      <View style={{marginBottom: 8, flexDirection:'row'}}>
                        <Text style={styles.TextPass}>New password</Text>
                        <View style={styles.ViewPass}>
                          <TextInput
                            placeholder='Enter your new password'
                            placeholderTextColor={COLORS.black}
                            value={NEWPASSWORD}
                            onChangeText={(text)=>SETNEWPASSWORD(text)}
                            secureTextEntry={!isPasswordShown1}
                            style={{
                              color: COLORS.black,
                              flex:1,
                              width:"100%",
                            }}/>

                            <Pressable
                              onPress={()=> setIsPasswordShown1(!isPasswordShown1)}
                              style={{
                                position: "absolute",
                                right: 12,
                              }}
                            >

                              {
                                isPasswordShown1 == true ? (
                                  <Icon name="eye" size={24} color={COLORS.black}/>
                                ) : (
                                  <Icon name="eye-off" size={24} color={COLORS.black}/>
                                )
                              }
                            </Pressable>
                        </View>
                      </View>
                      <View style={{marginBottom: 8, flexDirection:'row'}}>
                        <Text style={styles.TextPass}>Confirm new password</Text>
                        <View style={styles.ViewPass}>
                          <TextInput
                            placeholder='Enter your new password again'
                            placeholderTextColor={COLORS.black}
                            value={UPDATEPASSWORD}
                            onChangeText={(text)=>SETUPDATEPASSWORD(text)}
                            secureTextEntry={!isPasswordShown2}
                            style={{
                              color: COLORS.black,
                              width:"100%",
                              flex:1
                            }}/>

                            <Pressable
                              onPress={()=> setIsPasswordShown2(!isPasswordShown2)}
                              style={{
                                position: "absolute",
                                right: 12,
                              }}
                            >

                              {
                                isPasswordShown2 == true ? (
                                  <Icon name="eye" size={24} color={COLORS.black}/>
                                ) : (
                                  <Icon name="eye-off" size={24} color={COLORS.black}/>
                                )
                              }
                            </Pressable>
                        </View>
                        
                      </View>
                      {updatepassError ? <Text style={styles.error}>{updatepassError}</Text> : null}
                        <View style={styles.ViewButtonModal}>
                            <Pressable
                             style={styles.Pressable}
                             onPress={()=>{
                                updatePasswordUser()
                              
                            }}>
                                <Text style={styles.TextButton}>Confirm</Text>
                            </Pressable>
                            <Pressable 
                             style={styles.Pressable}
                             onPress={()=>{
                              SETOLDPASSWORD('')
                              SETNEWPASSWORD('')
                              SETUPDATEPASSWORD('')
                              setShowModalPass(false)}}
                             >
                                <Text style={styles.TextButton}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
          

          {/* Phần xóa tài khoản */}
            <TouchableOpacity onPress={()=>setShowModalDelete(true)} style={{paddingVertical:5}}>
              <View style={styles.contentContainer}>
                <View style={styles.contentColumn}>
                  <View style={styles.ViewContentName}>
                    <Text style={styles.Change}>Delete account</Text>
                    <Icon3 name='right' size={22} color={COLORS.black}/>
                </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Modal của xóa tài khoản */}
            <Modal
                visible={showModalDelete}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.ViewModal}>
                    <View style={styles.ViewModalContent}>
                        <Text style={styles.TextModal}>Are you sure you want to delete account?</Text>
                        <View style={styles.ViewButtonModal}>
                            <Pressable
                             style={styles.Pressable}
                             onPress={()=>{
                                deleteAccount()
                            }}>
                                <Text style={styles.TextButton}>Confirm</Text>
                            </Pressable>
                            <Pressable 
                             style={styles.Pressable}
                             onPress={()=>setShowModalDelete(false)}>
                                <Text style={styles.TextButton}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
          
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  Img_bg:{
    width: "100%",
    height: 180,
  },
  Img_user:{
    height:150, 
    width: 150, 
    borderRadius: 100, 
    alignSelf: 'center',
    marginTop: -70,
    borderWidth:3,
    borderColor: COLORS.black
  },
  ViewProfile:{
    marginBottom: 2
  },
  TextProfile:{
    color: COLORS.black,
    textAlign:'center',
    fontSize: 25
  },
  Container:{
    padding: 10,
    flex:1,
    
  },
  Title:{
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 13
  },
  contentContainer: {
    flex: 1,
    padding:20,
    flexDirection: 'row', 
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 15,
    marginBottom: 15,
  },
  contentColumn: {
    flex: 1, 
  },
  ViewContentName:{
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  TextName:{
    flex: 1.4, 
    fontSize:16,
    marginVertical: 8,
    color: COLORS.black,
    fontWeight: '490',
  },
  InputName:{
    flex: 2, 
    fontSize:16,
    marginVertical: 8,
    color: COLORS.gray,
    marginRight: 10, 
  },
  Change:{
    color: COLORS.black,
    fontSize:19,
    fontWeight: 'bold'
  },
  ViewModal:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
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
  },
  ModalTitle:{
    fontSize: 20,
    fontWeight:'bold',
    textAlign:'center',
    color: COLORS.black,
    padding: 5,
    marginBottom: 20
  },
  TextPass:{
    fontSize:16,
    marginVertical: 8,
    color: COLORS.black,
    fontWeight: 'bold',
    marginRight: 10,
    width: 80
  },
  ViewPass:{
    width: 260,
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22
  },
  TextEmail:{
    fontSize:16,
    width:100,
    fontWeight: 400,
    marginVertical: 8,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  ViewEmail:{
    width: 250,
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22
  },
  TextPhone:{
    width:100,
    fontSize:16,
    fontWeight: 400,
    marginVertical: 8,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  ViewPhone:{
    width: 250,
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8, 
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  optionButton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.gray,
    marginTop: 8,
    marginLeft: 12
  },
  selectedOption: {
      width: 12,
      height: 12,
      backgroundColor: COLORS.gray,
      borderRadius: 10
  },
  label:{
    color: COLORS.black
  }, 
  wrapper:{
    flexDirection: 'row',
    justifyContent:'space-evenly',
    marginTop: 10
  },
  mood:{
    marginHorizontal:15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  feeling:{
    fontSize: 18,
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  ViewImg:{
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: COLORS.black,
    borderRadius: 100,
    top: 30,
    right: 0,
    padding: 5,
  },error:{
    color: 'red',
    top: -10,
    left: windowWidth*0.02
  }
})
