import React from 'react'
import {
    ImageBackground,
    View,
    StyleSheet,
    TouchableOpacity,
    Image} from 'react-native';

import colors from '../style/Colors';
const banner = '../img/banner.png';


const Home = ({navigation}) => {
    

    return (
    <View style={styles.container}>
    <ImageBackground source={require(banner)} resizeMode="cover" style={styles.banner}>
       <TouchableOpacity style={styles.buttonsContainer} onPress={() => navigation.navigate('GameScreen')}>
            <Image source={require('../img/play_button.png')} style={styles.button}/>
       </TouchableOpacity>
    </ImageBackground>
    </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      buttonsContainer: {
          marginTop: 300,
          alignSelf: 'center',
          backgroundColor: colors.mainColor,
          zIndex: 1,
          height: 60,
          width: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 15,
      },
      banner: {
        flex: 1,
        justifyContent: 'center',
      },
      button: {
          tintColor: 'white',
          height: 40,
          width: 40,
          marginLeft:10,
      },
});