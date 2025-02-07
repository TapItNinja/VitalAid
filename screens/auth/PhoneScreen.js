import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils';

const PhoneInput = ({ value, onChange, error }) => (
  <View>
    <TextInput
      autoFocus={true}
      value={value}
      onChangeText={onChange}
      placeholder="Enter your phone number"
      placeholderTextColor={styles.theme.placeholder}
      keyboardType="numeric"
      style={[
        styles.input,
        error && styles.inputError
      ]}
      maxLength={10}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const PhoneScreen = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadSavedPhone = async () => {
      try {
        const data = await getRegistrationProgress('Phone');
        if (data?.phone) {
          setPhone(data.phone);
        }
      } catch (error) {
        console.error('Error loading saved phone:', error);
      }
    };

    loadSavedPhone();
  }, []);

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (text) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, '');
    setPhone(numericText);
    if (phoneError) {
      setPhoneError('');
    }
  };

  const handleNext = async () => {
    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number",
        [{ text: "OK" }]
      );
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      await saveRegistrationProgress('Phone', { phone });
      navigation.navigate('PreFinal');
    } catch (error) {
      console.error('Error saving phone:', error);
      Alert.alert(
        "Error",
        "Unable to save phone number. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons 
              name="cellphone" 
              size={26} 
              color="black" 
            />
          </View>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <Text style={styles.title}>What's your phone number?</Text>
        <Text style={styles.subtitle}>
          We'll use this to verify your identity and keep your account secure
        </Text>

        <PhoneInput
          value={phone}
          onChange={handlePhoneChange}
          error={phoneError}
        />

        <Text style={styles.note}>
          Note: Enter a valid 10-digit US phone number
        </Text>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={[
            styles.nextButton,
            !phone.trim() && styles.nextButtonDisabled
          ]}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color={phone.trim() ? styles.theme.primary : styles.theme.disabled}
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

export default PhoneScreen;



// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Alert } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { useEffect } from 'react';

// const PhoneScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     Alert.alert('QR Code Scanned!', `Data: ${data}`, [
//       {
//         text: 'Validate',
//         onPress: () => validateQrCode(data),
//       },
//       { text: 'Cancel', onPress: () => setScanned(false), style: 'cancel' },
//     ]);
//   };

//   const validateQrCode = async (data) => {
//     try {
//       const response = await fetch('https://your-backend-url.com/validate-qr', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ qrData: data }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', `JWT Token: ${result.token}`);
//         // Navigate to the restaurant page or handle further actions here
//       } else {
//         Alert.alert('Error', result.message || 'Validation failed');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to validate QR code');
//     } finally {
//       setScanned(false);
//     }
//   };

//   if (hasPermission === null) {
//     return (
//       <View style={styles.container}>
//         <Text>Requesting for camera permission...</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text>No access to camera</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && <Text style={styles.scanText}>QR Code Scanned</Text>}
//     </View>
//   );
// };

// export default PhoneScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   scanText: {
//     marginTop: 20,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
