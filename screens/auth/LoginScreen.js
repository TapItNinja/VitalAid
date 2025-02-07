import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const InputField = ({
  value,
  onChange,
  placeholder,
  secureTextEntry,
  error,
  icon,
}) => (
  <View>
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={styles.theme.placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.input, error && styles.inputError]}
      />
      {icon}
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    // Navigate to MainTabs with the specified state
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainTabs',
          state: {
            routes: [{ name: 'Menu' }],
            index: 1, // Index 1 corresponds to the Menu tab in your bottom tab navigation
          },
        },
      ],
    });
  };

  const goToRegister = () => {
    navigation.navigate('Basic');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="user-lock" size={24} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={require('../../assets/food.json')}
          />
        </View>

        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Please sign in to continue.</Text>

        <InputField
          value={email}
          onChange={text => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
          placeholder="email@example.com"
          error={emailError}
        />

        <InputField
          value={password}
          onChange={text => {
            setPassword(text);
            if (passwordError) setPasswordError('');
          }}
          placeholder="Password"
          secureTextEntry={!showPassword}
          error={passwordError}
          icon={
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={styles.theme.placeholder}
              />
            </TouchableOpacity>
          }
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.loginButton,
            (!email.trim() || !password) && styles.loginButtonDisabled,
          ]}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToRegister} style={styles.registerLink}>
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text style={styles.registerHighlight}>Register</Text>
          </Text>
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
    marginLeft: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subtitle: {
    marginTop: 30,
    fontSize: 15,
    color: 'grey',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginTop: 25,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  inputError: {
    borderBottomColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#581845',
    padding: 15,
    borderRadius: 8,
    marginTop: 40,
  },
  loginButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: 'grey',
  },
  registerHighlight: {
    color: '#581845',
    fontWeight: '600',
  },
});

export default LoginScreen;