import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/bandaid-icon.png')}
            style={styles.logoIcon}
          />
          <Text style={styles.logoText}>VitalAid</Text>
        </View>

        {/* Tagline Section */}
        <View style={styles.taglineContainer}>
          <Text style={styles.mainTagline}>
            Bringing Healthcare{'\n'}Closer to Every Village.
          </Text>
          <Text style={styles.subTagline}>
            our Trusted Health Companion for{'\n'}Quick & Reliable Diagnosis
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createAccountText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#965286',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  logoIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  mainTagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subTagline: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
  },
  createAccountButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  createAccountText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
