// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Provider } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { AUTH_SUCCESS } from './Redux/Reducer/Auth/auth.types';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import store from './Redux/store';
// // Import screens
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/auth/LoginScreen';
// import BasicInfoScreen from './screens/auth/BasicInfo';
// import NameScreen from './screens/auth/NameScreen';
// import PasswordScreen from './screens/auth/PasswordScreen';
// import EmailScreen from './screens/auth/EmailScreen';
// import BirthScreen from './screens/auth/BirthScreen';
// import LocationScreen from './screens/auth/LocationScreen';
// import PhoneScreen from './screens/auth/PhoneScreen';
// import PreFinalScreen from './screens/auth/PreFinalScreen';
// import QrScreen from './screens/QrScreen';
// import MenuScreen from './screens/MenuScreen';
// import CartScreen from './screens/CartScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import SplashScreen from './screens/auth/SplashScreen';
// import './screens/global/unistyles/unistyles'
// // import ''

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // Bottom Tab Navigator
// const BottomTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={() => ({
//         tabBarShowLabel: false,
//         tabBarStyle: { backgroundColor: '#101010' }
//       })}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <MaterialCommunityIcons
//               name="alpha"
//               size={30}
//               color={focused ? "white" : "#989898"}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Menu"
//         component={MenuScreen}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <Entypo
//               name="heart"
//               size={30}
//               color={focused ? "white" : "#989898"}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Cart"
//         component={CartScreen}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <MaterialIcons
//               name="chat-bubble-outline"
//               size={30}
//               color={focused ? "white" : "#989898"}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <Ionicons
//               name="person-circle-outline"
//               size={30}
//               color={focused ? "white" : "#989898"}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// // Main App Component
// const App = () => {
//   const { isAuthenticated } = useSelector(state => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     checkToken();
//   }, []);

//   const checkToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (token) {
//         dispatch({
//           type: AUTH_SUCCESS,
//           payload: { token, user: null }
//         });
//       }
//     } catch (error) {
//       console.error('Error checking token:', error);
//     }
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{ headerShown: false }}
//         initialRouteName="Splash" // Set SplashScreen as initial route
//       >
//         {/* SplashScreen is always first */}
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         {!isAuthenticated ? (
//           // Auth Stack
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Basic" component={BasicInfoScreen} />
//             <Stack.Screen name="Name" component={NameScreen} />
//             <Stack.Screen name="Password" component={PasswordScreen} />
//             <Stack.Screen name="Email" component={EmailScreen} />
//             <Stack.Screen name="Birth" component={BirthScreen} />
//             <Stack.Screen name="Location" component={LocationScreen} />
//             <Stack.Screen name="Phone" component={PhoneScreen} />
//             <Stack.Screen name="PreFinal" component={PreFinalScreen} />
//           </>
//         ) : (
//           // Main Stack
//           <>
//             <Stack.Screen name="MainTabs" component={BottomTabs} />
//             <Stack.Screen name="QrScreen" component={QrScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// // App Wrapper with Redux Provider
// const AppWrapper = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// export default AppWrapper;
import './screens/global/unistyles/unistyles'
import React, { useEffect, useReducer, useRef } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// SVG
import Svg, { Path } from 'react-native-svg';
// Reanimated
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated';
// Lottie
import Lottie from 'lottie-react-native';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/auth/SplashScreen';
import LoginScreen from './screens/auth/LoginScreen';
import BirthScreen from './screens/auth/BirthScreen';
import NameScreen from './screens/auth/NameScreen';
import EmailScreen from './screens/auth/EmailScreen';
import PhoneScreen from './screens/auth/PhoneScreen';
import PasswordScreen from './screens/auth/PasswordScreen';
import LocationScreen from './screens/auth/LocationScreen';
import BasicInfoScreen from './screens/auth/BasicInfo';
import PreFinalScreen from './screens/auth/PreFinalScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// ------------------------------------------------------------------

const BottomTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./assets/home.icon.json')} style={styles.icon} />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./assets/chat.icon.json')} style={styles.icon} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./assets/upload.icon.json')} style={styles.icon} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./assets/settings.icon.json')} style={styles.icon} />,
        }}
      />
    </Tab.Navigator>
  );
};

// ------------------------------------------------------------------

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Basic" component={BasicInfoScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Password" component={PasswordScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="Birth" component={BirthScreen} />
        <Stack.Screen name="PreFinal" component={PreFinalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// ------------------------------------------------------------------

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors } : BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  const reducer = (state: any, action: { x: number, index: number }) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg width={110} height={60} viewBox="0 0 110 60" style={[styles.activeBackground, animatedStyles]}>
        <Path
          fill="#5F3254"
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const TabBarComponent = ({ active, options, onLayout, onPress }: TabBarComponentProps) => {
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(active ? 1 : 0, { duration: 250 }) }],
    };
  });

const animatedIconContainerStyles = useAnimatedStyle(() => {
  return {
    opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
  };
});

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View style={[styles.componentCircle, animatedComponentCircleStyles]} />
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  );
};

// ------------------------------------------------------------------

const styles = StyleSheet.create({
  tabBar: { backgroundColor: 'white' },
  activeBackground: { position: 'absolute' },
  tabBarContainer: { flexDirection: 'row', justifyContent: 'space-evenly' },
  component: { height: 60, width: 60, marginTop: -5 },
  componentCircle: { flex: 1, borderRadius: 30, backgroundColor: 'white' },
  iconContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  icon: { height: 36, width: 36 },
});

export default App;
