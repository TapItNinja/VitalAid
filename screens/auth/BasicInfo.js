/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import food from '../../assets/food1.json';
import {useNavigation} from '@react-navigation/native';
import {getRegistrationProgress, saveRegistrationProgress} from '../../registrationUtils';

const BasicInfo = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('BasicInfo').then(data => {
      if (data?.completed) {
        navigation.navigate('Name');
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80, marginLeft: 15, marginRight: 10}}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            MarginHorizontal: 20,
          }}>
          You're One of a kind.
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            MarginHorizontal: 20,
            marginTop: 10,
          }}>
          Your Care should match, too.
        </Text>
      </View>
      <View>
        <LottieView
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          source={food}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>
      <Pressable
        onPress={() => {
          saveRegistrationProgress('BasicInfo', {completed: true});
          navigation.navigate('Name');
        }}
        style={{
          backgroundColor: 'black',
          padding: 30,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Enter basic info
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default BasicInfo;