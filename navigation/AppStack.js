import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../src/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../src/Profile';
import news from '../src/news';
import CustomDrawer from '../components/CustomDrawer'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import COLORS from '../style/Colors';

import Game from '../src/Game';
import Level from '../src/Level';
import Result from '../src/Result';
import Welcome from '../src/Welcome';

const Drawer = createDrawerNavigator();


const AppStack = () => {
 
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props}/>} 
      gestureEnabled={true} 
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.menuIcon,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.black,
        drawerLabelStyle:{
          marginLeft:-22,
          fontSize:15,
        },
      }}
    >
      
      <Drawer.Screen  
        name="Home" 
        component={Home} 
        options={{
          drawerIcon: ({color}) => (
            <Icon name='home-outline' size={22} color={color}/>
          )
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={Profile} 
        options={({ navigation }) => ({
          drawerIcon: ({color}) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon2 name='user-o' size={22} color={color}/>
            </View>
          ),
        })}
      />
      <Drawer.Screen 
        name="News" 
        component={news} 
        options={{
          drawerIcon: ({color}) => (
            <Icon name='notifications-outline' size={25} color={color}/>
          )
        }}
      />
      
      <Drawer.Screen 
        name="GameScreen" 
        component={Game} 
        options={{ 
          drawerLabel: () => null, 
          headerShown: false 
        }}
      />

      <Drawer.Screen 
        name="ResultScreen" 
        component={Result} 
        options={{ 
          drawerLabel: () => null, 
          headerShown: false 
        }}
      />
      <Drawer.Screen 
        name="Level" 
        component={Level} 
        options={{ 
          drawerLabel: () => null, 
          headerShown: false 
        }}
      />
    </Drawer.Navigator>
  )
}

export default AppStack;