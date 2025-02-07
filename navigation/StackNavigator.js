import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BasicInfo from '../screens/auth/BasicInfo';
import NameScreen from '../screens/auth/NameScreen';
import EmailScreen from '../screens/auth/EmailScreen';
import PasswordScreen from '../screens/auth/PasswordScreen';
import BirthScreen from '../screens/auth/BirthScreen';
import LocationScreen from '../screens/auth/LocationScreen';
import PhoneScreen from '../screens/auth/PhoneScreen';
import PreFinalScreen from '../screens/auth/PreFinalScreen';
// import QrScreen from '../screens/qrScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import SplashScreen from '../screens/auth/SplashScreen';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarStyle: { backgroundColor: '#101010' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="alpha" size={30} color="white" />
            ) : (
              <MaterialCommunityIcons name="alpha" size={30} color="#989898" />
            ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarStyle: { backgroundColor: '#101010' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="heart" size={30} color="white" />
            ) : (
              <Entypo name="heart" size={30} color="#989898" />
            ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarStyle: { backgroundColor: '#101010' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="chat-bubble-outline" size={30} color="white" />
            ) : (
              <MaterialIcons name="chat-bubble-outline" size={30} color="#989898" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarStyle: { backgroundColor: '#101010' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person-circle-outline" size={30} color="white" />
            ) : (
              <Ionicons name="person-circle-outline" size={30} color="#989898" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}> 
      <AuthStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false, animation: 'fade' }}
      />
      <AuthStack.Screen
        name="Basic"
        component={BasicInfo}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Name"
        component={NameScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Email"
        component={EmailScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Password"
        component={PasswordScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Birth"
        component={BirthScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Location"
        component={LocationScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Phone"
        component={PhoneScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="PreFinal"
        component={PreFinalScreen}
        options={{ headerShown: false }}
      />
      {/* <AuthStack.Screen
        name="QrScreen"
        component={QrScreen}
        options={{ headerShown: false }}
      /> */}
    </AuthStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      {/* <MainStack.Screen
        name="QrScreen"
        component={QrScreen}
        options={{ headerShown: false }}
      /> */}
    </MainStack.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});