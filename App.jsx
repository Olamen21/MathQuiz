import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Welcome';
import Login from './src/Login';
import Signup from './src/Signup';
import Signup_upImg from './src/Signup_upImg';
import AppStack from './navigation/AppStack';
import { UserProvider } from './components/UserContext'; // Import the UserProvider

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signup_upImg" component={Signup_upImg} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;

