import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Storage } from 'expo-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// screens
import InitialScreen from './Screens/InitialScreen/InitialScreen';
import Signup from './Screens/Authenticate/Sigunp';
import Login from './Screens/Authenticate/Login';
import Notification from './Notification';
import AllNotifications from './Screens/AllNotifications';

import DashboardRoute from './Screens/Dashboard/DashboardRoute';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
export default function App() {  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {/* <Stack.Screen name="Home" component={InitialScreen} options={{headerShown: false}} /> */}
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Notifications' component={Notification}/>
        {/* <Stack.Screen name='DashboardRoute' component={DashboardRoute} options={{headerShown: false}}/> */}
        <Stack.Screen name="AllNotifications" component={AllNotifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
