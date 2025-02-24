import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {getRegistrationProgress, saveRegistrationProgress} from '../../registrationUtils';

// Define theme colors outside of StyleSheet
const theme = {
  primary: '#581845',
  placeholder: '#BEBEBE',
  error: '#FF3B30',
  disabled: '#CCCCCC',
};

const LocationScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Load saved location data
    getRegistrationProgress('Location').then(data => {
      if (data && data.location) {
        setLocation(data.location);
      }
    });

    // Get current location
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setIsFetchingLocation(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion(prev => ({...prev, latitude, longitude}));
        fetchAddress(latitude, longitude);
        setError('');
      },
      error => {
        console.error('Error getting location:', error);
        setError('Unable to get your location. Please try again.');
        setIsFetchingLocation(false);
        Alert.alert(
          'Location Error',
          'Unable to get your location. Please check your location permissions.',
          [{text: 'OK'}],
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchAddress = (latitude, longitude) => {
    setIsFetchingLocation(true);
    const apiKey = '';
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          let street = '',
            area = '',
            city = '',
            state = '',
            country = '';

          // Parse address components
          addressComponents.forEach(component => {
            if (component.types.includes('route')) street = component.long_name;
            if (component.types.includes('sublocality_level_1'))
              area = component.long_name;
            if (component.types.includes('locality')) city = component.long_name;
            if (component.types.includes('administrative_area_level_1'))
              state = component.long_name;
            if (component.types.includes('country')) country = component.long_name;
          });

          const addressParts = [street, area, city, state, country].filter(
            Boolean,
          );
          const formattedAddress = addressParts.join(', ');
          setLocation(formattedAddress);
          setError('');
        } else {
          setError('Unable to find address for this location');
        }
      })
      .catch(error => {
        console.error('Error fetching the location:', error);
        setError('Failed to fetch address. Please try again.');
      })
      .finally(() => setIsFetchingLocation(false));
  };

  const handleRegionChangeComplete = newRegion => {
    setRegion(newRegion);
    fetchAddress(newRegion.latitude, newRegion.longitude);
  };

  const handleNext = () => {
    if (!location.trim()) {
      Alert.alert('Location Required', 'Please wait while we fetch your location');
      return;
    }
    saveRegistrationProgress('Location', {location});
    navigation.navigate('Phone');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.disclaimer}>No Background Checks Are Conducted</Text>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="location-outline" size={26} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <Text style={styles.title}>Where do you live?</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={handleRegionChangeComplete}>
          </MapView>
          <View style={styles.markerContainer}>
            <FontAwesome5 name="map-pin" size={40} color={theme.primary} />
          </View>
        </View>

        <View style={styles.locationContainer}>
          {isFetchingLocation ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.locationText}>{location || 'Fetching location...'}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={[
            styles.nextButton,
            (!location.trim() || isFetchingLocation) && styles.nextButtonDisabled,
          ]}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color={
              location.trim() && !isFetchingLocation
                ? theme.primary
                : theme.disabled
            }
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
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
    marginBottom: 20,
  },
  mapContainer: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },
  locationContainer: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
    textAlign: 'center',
  },
  errorText: {
    color: theme.error,
    fontSize: 14,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
  },
  nextButtonDisabled: {
    opacity: 0.7,
  },
});

export default LocationScreen;
