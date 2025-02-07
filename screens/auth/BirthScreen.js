import React, { useRef, useState, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils';

const InputField = ({ value, onChange, placeholder, maxLength, keyboardType, reference, onSubmitEditing, error, width }) => (
  <TextInput
    ref={reference}
    value={value}
    onChangeText={onChange}
    placeholder={placeholder}
    maxLength={maxLength}
    keyboardType={keyboardType}
    placeholderTextColor={styles.theme.placeholder}
    style={[
      styles.input,
      error && styles.inputError,
      { width: width },
    ]}
    onSubmitEditing={onSubmitEditing}
    autoFocus={placeholder === "DD"}
  />
);

const BirthScreen = () => {
  const navigation = useNavigation();
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState({
    day: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    getRegistrationProgress('Birth').then(progressData => {
      if (progressData && progressData.dateOfBirth) {
        const [dayValue, monthValue, yearValue] = progressData.dateOfBirth.split('/');
        setDay(dayValue || '');
        setMonth(monthValue || '');
        setYear(yearValue || '');
      }
    });
  }, []);

  const validateDate = () => {
    let isValid = true;
    const newErrors = { day: '', month: '', year: '' };

    // Day validation
    const dayNum = parseInt(day);
    if (!day.trim()) {
      newErrors.day = 'Day is required';
      isValid = false;
    } else if (dayNum < 1 || dayNum > 31) {
      newErrors.day = 'Invalid day';
      isValid = false;
    }

    // Month validation
    const monthNum = parseInt(month);
    if (!month.trim()) {
      newErrors.month = 'Month is required';
      isValid = false;
    } else if (monthNum < 1 || monthNum > 12) {
      newErrors.month = 'Invalid month';
      isValid = false;
    }

    // Year validation
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    if (!year.trim()) {
      newErrors.year = 'Year is required';
      isValid = false;
    } else if (yearNum < 1900 || yearNum > currentYear) {
      newErrors.year = 'Invalid year';
      isValid = false;
    }

    // Additional validation for days in month
    if (isValid) {
      const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
      if (dayNum > daysInMonth) {
        newErrors.day = `Invalid day for ${monthNum}/${yearNum}`;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleDayChange = text => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setDay(numericText);
    if (errors.day) {
      setErrors(prev => ({ ...prev, day: '' }));
    }
    if (numericText.length === 2) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = text => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setMonth(numericText);
    if (errors.month) {
      setErrors(prev => ({ ...prev, month: '' }));
    }
    if (numericText.length === 2) {
      yearRef.current.focus();
    }
  };

  const handleYearChange = text => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setYear(numericText);
    if (errors.year) {
      setErrors(prev => ({ ...prev, year: '' }));
    }
  };

  const handleNext = () => {
    if (validateDate()) {
      const dateOfBirth = `${day}/${month}/${year}`;
      saveRegistrationProgress('Birth', { dateOfBirth });
      navigation.navigate('Location');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.disclaimer}>No Background Checks Are Conducted</Text>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="cake-variant-outline"
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
          <Text style={styles.title}>What's your date of birth?</Text>
          <View style={styles.dateInputContainer}>
            <View style={styles.dateFieldContainer}>
              <InputField
                value={day}
                onChange={handleDayChange}
                placeholder="DD"
                maxLength={2}
                keyboardType="numeric"
                error={errors.day}
                width={60}
              />
              {errors.day ? <Text style={styles.errorText}>{errors.day}</Text> : null}
            </View>

            <View style={styles.dateFieldContainer}>
              <InputField
                reference={monthRef}
                value={month}
                onChange={handleMonthChange}
                placeholder="MM"
                maxLength={2}
                keyboardType="numeric"
                error={errors.month}
                width={60}
              />
              {errors.month ? <Text style={styles.errorText}>{errors.month}</Text> : null}
            </View>

            <View style={styles.dateFieldContainer}>
              <InputField
                reference={yearRef}
                value={year}
                onChange={handleYearChange}
                placeholder="YYYY"
                maxLength={4}
                keyboardType="numeric"
                error={errors.year}
                width={100}
              />
              {errors.year ? <Text style={styles.errorText}>{errors.year}</Text> : null}
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={[
            styles.nextButton,
            (!day.trim() || !month.trim() || !year.trim()) && styles.nextButtonDisabled,
          ]}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color={(day.trim() && month.trim() && year.trim()) ? styles.theme.primary : styles.theme.disabled}
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
    marginBottom: 30,
  },
  dateInputContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  dateFieldContainer: {
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 10,
    fontSize: 22,
    fontFamily: 'GeezaPro-Bold',
    textAlign: 'center',
  },
  inputError: {
    borderBottomColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
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

export default BirthScreen;