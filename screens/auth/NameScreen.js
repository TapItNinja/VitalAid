import React, { useEffect, useState } from 'react';
import { 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Alert 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils';

const InputField = ({ value, onChange, placeholder, required, error }) => (
  <View>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={styles.theme.placeholder}
      style={[
        styles.input,
        error && styles.inputError
      ]}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Name').then(data => {
      if (data) {
        const fullName = data.fullName || '';
        const nameParts = fullName.split(' ');
        setFirstName(nameParts[0] || '');
        setLastName(nameParts.slice(1).join(' ') || '');
      }
    });
  }, []);

  const validateName = () => {
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      return false;
    }
    setFirstNameError('');
    return true;
  };

  const handleNext = () => {
    if (validateName()) {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim(); // Concatenate first and last names
      saveRegistrationProgress('Name', { fullName }); // Save fullName as a single property
      navigation.navigate('Email');
    }
  };

  // Clear error when user starts typing
  const handleFirstNameChange = (text) => {
    setFirstName(text);
    if (firstNameError) {
      setFirstNameError('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.disclaimer}>No Background Checks Are Conducted</Text>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons 
              name="newspaper-variant-outline" 
              size={26} 
              color="black" 
            />
          </View>
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.title}>What's your name?</Text>
          <InputField
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name (Required)"
            error={firstNameError}
          />
          <InputField
            value={lastName}
            onChange={setLastName}
            placeholder="Last Name"
          />
          <Text style={styles.optional}>Last Name is optional</Text>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={[
            styles.nextButton,
            !firstName.trim() && styles.nextButtonDisabled
          ]}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color={firstName.trim() ? styles.theme.primary : styles.theme.disabled}
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
  disclaimer: {
    marginTop: 50,
    textAlign: 'center',
    color: 'grey',
  },
  content: {
    marginTop: 30,
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
  inputContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'GeezaPro-Bold',
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
  optional: {
    fontSize: 12,
    color: 'grey',
    fontWeight: '500',
  },
  nextButton: {
    marginTop: 30,
    marginLeft: 'auto',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.7,
  },
});

export default NameScreen;
