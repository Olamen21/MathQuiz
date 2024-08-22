import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Welcome from '../src/Welcome';
import Login from '../src/Login';
import Signup from '../src/Signup';
import Signup_upImg from '../src/Signup_upImg';
import AppStack from './AppStack';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
            name='Welcome'
            component={Welcome}
        />
        <Stack.Screen
            name='Login'
            component={Login}
        />
        <Stack.Screen
            name='Signup'
            component={Signup}
        />
        <Stack.Screen
            name='Signup_upImg'
            component={Signup_upImg}
        />
        <Stack.Screen
            name='AppStack'
            component={AppStack}
            />

    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})