import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const PreFinalScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a loading delay and then navigate to the Login screen
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>All set to register</Text>
        <Text style={styles.subHeaderText}>Setting up your profile for you</Text>
      </View>

      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/love.json')}
          style={styles.animation}
          autoPlay
          loop
          speed={0.7}
        />
      </View>

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#900C3F" />
        <Text style={styles.loadingText}>Redirecting to Login...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    marginTop: 80,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'GeezaPro-Bold' : 'sans-serif-bold',
    marginLeft: 20,
  },
  subHeaderText: {
    fontSize: 33,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'GeezaPro-Bold' : 'sans-serif-bold',
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: 260,
    width: 300,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#900C3F',
  },
});

export default PreFinalScreen;