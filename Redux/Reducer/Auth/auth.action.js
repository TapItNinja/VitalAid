import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  SIGNUP_SUCCESS,
  CLEAR_ERROR,
} from './auth.types';

const API_URL = 'http://api.swiftdine.rest';

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const login = (email, password) => async dispatch => {
  dispatch({ type: AUTH_LOADING });
  try {
    const response = await api.post('/auth/login', {
      email: email.trim(),
      password,
    });

    if (response?.data?.access_token) {
      await AsyncStorage.setItem('token', response.data.access_token);
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          token: response.data.access_token,
          user: response.data.user,
        },
      });
      return true;
    }
    throw new Error('No access token received');
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: AUTH_ERROR,
      payload: errorMessage,
    });
    return false;
  }
};

export const signup = userData => async dispatch => {
  dispatch({ type: AUTH_LOADING });
  try {
    const response = await api.post('/auth/signup', userData);

    if (response.data.message === 'User registered successfully') {
      // Clear registration data from AsyncStorage
      await clearRegistrationData();
      dispatch({ type: SIGNUP_SUCCESS });
      return true;
    }
    throw new Error(response.data.error || 'Registration failed');
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: AUTH_ERROR,
      payload: errorMessage,
    });
    return false;
  }
};

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.multiRemove(['token', 'cart', 'menu', 'orders']);
    dispatch({ type: AUTH_LOGOUT });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Helper functions
const getErrorMessage = (error) => {
  if (error.response?.status === 401) {
    return 'Invalid email or password';
  }
  if (error.message.includes('Network request failed')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }
  if (error.message.includes('already registered')) {
    return 'This email is already registered.';
  }
  return error.message || 'An unexpected error occurred';
};

const clearRegistrationData = async () => {
  const keys = [
    'registration_progress_Name',
    'registration_progress_Email',
    'registration_progress_Password',
    'registration_progress_Phone',
  ];
  await AsyncStorage.multiRemove(keys);
};
