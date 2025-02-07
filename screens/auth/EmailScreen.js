import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils';

const EmailInput = ({ value, onChange, error }) => (
  <View>
    <TextInput
      autoFocus={true}
      value={value}
      onChangeText={onChange}
      placeholder="email@example.com"
      placeholderTextColor={styles.theme.placeholder}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      style={[
        styles.input,
        error && styles.inputError
      ]}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const EmailScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Email').then(data => {
      if (data?.email) {
        setEmail(data.email);
      }
    });
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
  };

  const handleNext = () => {
    if (!email.trim()) {
      // Alert.alert(
      //   "Required Field",
      //   "Please enter your email address",
      //   [{ text: "OK" }]
      // );
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address",
        [{ text: "OK" }]
      );
      setEmailError('Please enter a valid email address');
      return;
    }

    saveRegistrationProgress('Email', { email });
    navigation.navigate('Password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Fontisto name="email" size={26} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <Text style={styles.title}>Please provide a valid email.</Text>
        <Text style={styles.subtitle}>
          Email verification helps us keep the account secure.
        </Text>

        <EmailInput
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />

        <Text style={styles.note}>
          Note: You will be asked to verify your email.
        </Text>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={[
            styles.nextButton,
            !email.trim() && styles.nextButtonDisabled
          ]}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color={email.trim() ? styles.theme.primary : styles.theme.disabled}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  theme: {
    primary: '#581845',
    placeholder: '#BEBEBE',
    error: '#FF3B30',
    disabled: '#CCCCCC',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginTop: 90,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'GeezaPro-Bold',
    marginTop: 15,
  },
  subtitle: {
    marginTop: 30,
    fontSize: 15,
    color: 'grey',
  },
  input: {
    width: '100%',
    marginVertical: 10,
    marginTop: 25,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontFamily: 'GeezaPro-Bold',
    fontSize: 22,
  },
  inputError: {
    borderBottomColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
  },
  note: {
    color: 'grey',
    marginTop: 7,
    fontSize: 15,
  },
  nextButton: {
    marginTop: 30,
    marginLeft: 'auto',
  },
  nextButtonDisabled: {
    opacity: 0.7,
  },
});

export default EmailScreen;