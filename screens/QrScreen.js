// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMenuAsync } from '../Redux/Reducer/QR/qr.action';

// const QrScreen = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const loading = useSelector(state => state.qr?.loading ?? false);
//   const error = useSelector(state => state.qr?.error ?? null);

//   const handleFetchMenu = async (restaurantId) => {
//     try {
//       await dispatch(fetchMenuAsync(restaurantId));
//       // Navigate to MainTabs and then switch to the Menu tab
//       navigation.reset({
//         index: 0,
//         routes: [
//           {
//             name: 'MainTabs',
//             state: {
//               routes: [{ name: 'Menu' }],
//               index: 1, // Index 1 corresponds to the Menu tab in your bottom tab navigation
//             },
//           },
//         ],
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message || 'An error occurred while fetching the menu');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.centerText}>
//         Tap the button below to fetch the menu for a hardcoded restaurant.
//       </Text>
//       <TouchableOpacity
//         style={[styles.button, loading && styles.buttonDisabled]}
//         disabled={loading}
//         onPress={() => handleFetchMenu('778ae883-3db1-4629-a1a1-71091bfb1f2e')}>
//         <Text style={styles.buttonText}>
//           {loading ? 'Loading...' : 'Fetch Menu'}
//         </Text>
//       </TouchableOpacity>
//       {error && (
//         <Text style={styles.errorText}>{error}</Text>
//       )}
//     </View>
//   );
// };

// export default QrScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   centerText: {
//     fontSize: 16,
//     padding: 10,
//     color: '#777',
//   },
//   button: {
//     marginTop: 30,
//     backgroundColor: '#581845',
//     padding: 15,
//     borderRadius: 8,
//   },
//   buttonDisabled: {
//     backgroundColor: '#888',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });