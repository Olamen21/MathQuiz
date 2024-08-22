import { Image, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import {LinearGradient} from 'react-native-linear-gradient'
import COLORS from '../style/Colors'
import Button from '../components/Button'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Welcome = ({ navigation }) => {
  return (
    
    <LinearGradient
        style={{
            flex:1
        }}
        colors={[COLORS.secondary, COLORS.primary]}
    >
      
        <View style={{flex:1}}>
            <Image 
                source={require('../img/welcome4.png')}
                style={styles.img1}/>

            <Image 
                source={require('../img/welcome2.png')}
                style={styles.img2}/>    

            <Image 
                source={require('../img/welcome3.png')}
                style={styles.img3}/>

            <Image 
                source={require('../img/welcome1.png')}
                style={styles.img4}/>
        </View>

        <View style={styles.View}>
            <Text style={styles.TextMath}>Math Quizz</Text>
            <Text style={styles.TextSlogan}> Let's go</Text>
              <View style={{marginVertical: 22}}>
                <Text style={styles.Slogan}>Train Your Brain with Lightning-Fast Mental Math!</Text>
              </View>

              <Button
               title ="Join now"
               onPress={() => navigation.navigate('Signup')}
               style={styles.ButtonJoin}
                />
                

              <View style={styles.ViewLogin}>
                <Text style={styles.TextAsk}>Already have an account?</Text>
                <Pressable
                  onPress={()=> navigation.navigate("Login")}
                >
                  <Text style={styles.TextLogin}>Login</Text>

                </Pressable>
              </View>
        </View>
    </LinearGradient>
  )
}

export default Welcome

const styles = StyleSheet.create({
  img1:{
    height:100,
    width:100,
    borderRadius:20,
    position:"absolute",
    top:10,
    transform: [
      { translateX:20},
      { translateY: 50},
      { rotate: "-15deg"}
    ]
  },
  img2:{
    height:100,
    width:100,
    borderRadius:20,
    position:"absolute",
    top:-30,
    left:100,
    transform: [
      { translateX:50},
      { translateY: 50},
      { rotate: "-5deg"}
    ]
  },
  img3:{
    height:100,
    width:100,
    borderRadius:20,
    position:"absolute",
    top:140,
    left:-30,
    transform: [
      { translateX:50},
      { translateY: 50},
      { rotate: "-15deg"}
    ]
  },
  img4:{
    height:200,
    width:200,
    borderRadius:20,
    position:"absolute",
    top:110,
    left:120,
    transform: [
      { translateX:50},
      { translateY: 50},
      { rotate: "-15deg"}
    ]
  },
  View:{
    paddingHorizontal:22,
    position:'absolute',
    top:windowWidth*1.05,
    width:"100%"
  },
  TextMath:{
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.white
  },
  TextSlogan:{
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.white 
  },
  Slogan:{
    fontSize: 16,
    color:COLORS.white,
  },
  ButtonJoin:{
    marginTop:22,
    width: "100%"
   },
  ViewLogin:{
    flexDirection: 'row',
    marginTop: 12, 
    justifyContent: 'center'
  },
  TextAsk:{
    fontSize: 16,
    color: COLORS.white,
    top:windowWidth*0.03,
  },
  TextLogin:{
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft:windowHeight*0.01,
    top:windowWidth*0.03,
  }
})