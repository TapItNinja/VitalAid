import React, { FC, useEffect, useCallback } from 'react';
import { Image, Platform, StatusBar, View, Animated } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { splashStyles } from '../global/unistyles/authStyles';
import CustomText from '../global/unistyles/CustomText';
import { useNavigation, CommonActions } from '@react-navigation/native';

const SplashScreen: FC = () => {
  const { styles } = useStyles(splashStyles);
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  const startAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 808,
      delay: 488,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const resetAndNavigate = useCallback((screenName: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName }],
      })
    );
  }, [navigation]);

  useEffect(() => {
    startAnimation();
    const timeoutId = setTimeout(() => {
      resetAndNavigate('Login');
    }, 3000);

    return () => {
      timeoutId && clearTimeout(timeoutId);
      fadeAnim.stopAnimation();
      fadeAnim.setValue(0);
    };
  }, [startAnimation, resetAndNavigate]);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{
      translateY: fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
      }),
    }],
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS === 'android'} />

      <Image
        source={require('../../assets/vital.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <Image
          source={require('../../assets/vitl.png')}
          style={styles.treeImage}
          resizeMode="contain"
        />

        <CustomText
          variant="h5"
          style={styles.msgText}
          fontFamily="Okra-Medium"
          color="#111"
        >
          Our Trusted Health Companion for Quick & Reliable Diagnosis
        </CustomText>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;