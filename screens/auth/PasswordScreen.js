import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils';

const PasswordInput = ({ value, onChange, error }) => (
  <View>
    <TextInput
      autoFocus={true}
      value={value}
      onChangeText={onChange}
      placeholder="Enter your password"
      placeholderTextColor={styles.theme.placeholder}
      secureTextEntry={true}
      style={[
        styles.input,
        error && styles.inputError
      ]}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Password').then(data => {
      if (data?.password) {
        setPassword(data.password);
      }
    });
  }, []);

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleNext = () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 6 characters long",
        [{ text: "OK" }]
      );
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    saveRegistrationProgress('Password', { password });
    navigation.navigate('Birth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <AntDesign name="lock1" size={26} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <Text style={styles.title}>Please choose a password</Text>
        <Text style={styles.subtitle}>
          Create a strong password to secure your account
        </Text>

        <PasswordInput
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />

        <Text style={styles.note}>
          Note: Password must be at least 6 characters long
        </Text>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={[
            styles.nextButton,
            !password.trim() && styles.nextButtonDisabled
          ]}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color={password.trim() ? styles.theme.primary : styles.theme.disabled}
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

export default PasswordScreen;