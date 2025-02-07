// CartScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const doctors = [
  {
    id: '1',
    name: 'Dr. Rohan Gupta',
    specialty: 'General Physician',
    experience: '15 years',
    location: 'South Delhi, India',
    rating: 4.8,
    phone: '+1 (555) 123-4567',
    image: require('../assets/rohna.jpeg'),
  },
  {
    id: '2',
    name: 'Dr. M Rohit',
    specialty: 'Cardiologist',
    experience: '12 years',
    location: 'Kerala, India',
    rating: 4.9,
    phone: '+1 (555) 234-5678',
    image: require('../assets/rohit.jpeg'),
  },
  {
    id: '3',
    name: 'Dr. Shubham Shaswat',
    specialty: 'Pediatrician',
    experience: '10 years',
    location: "Mumbai, India",
    rating: 4.7,
    phone: '+1 (555) 345-6789',
    image: require('../assets/shubham.jpeg'),
  },
];

const initialCartItems = [
  { id: '1', name: 'Paracetamol', price: 5.99, quantity: 1, image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Cough Syrup', price: 9.99, quantity: 1, image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Vitamin C', price: 7.49, quantity: 1, image: 'https://via.placeholder.com/100' },
];

const OrderConfirmationModal = ({ visible, onClose, orderTotal, onConfirm }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleConfirmOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      onConfirm();
    }, 3000);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { minHeight: orderPlaced ? '80%' : '40%' }]}>
          {!orderPlaced ? (
            <>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
              
              <View style={styles.confirmationContent}>
                <MaterialCommunityIcons name="cart-check" size={60} color="#6A0572" />
                <Text style={styles.confirmationTitle}>Confirm Your Order</Text>
                <Text style={styles.confirmationTotal}>Total Amount: ₹{orderTotal}</Text>
                
                <View style={styles.deliveryInfo}>
                  <MaterialCommunityIcons name="truck-delivery" size={24} color="#666" />
                  <Text style={styles.deliveryText}>Estimated Delivery: 2-3 Business Days</Text>
                </View>
                
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
                  <Text style={styles.confirmButtonText}>Confirm Order</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.successContent}>
              <View style={styles.successIconContainer}>
                <MaterialCommunityIcons name="check-circle" size={100} color="#4CAF50" />
              </View>
              
              <Text style={styles.successHeader}>Order Confirmed!</Text>
              <Text style={styles.successSubHeader}>Thank you for your purchase</Text>
              
              <View style={styles.orderDetailsCard}>
                <Text style={styles.cardTitle}>Order Details</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Order Number:</Text>
                  <Text style={styles.detailValue}>#ORD-2024-{Math.floor(Math.random() * 10000)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Order Total:</Text>
                  <Text style={styles.detailValue}>₹{orderTotal}</Text>
                </View>
              </View>
              
              <View style={styles.statusCard}>
                <Text style={styles.cardTitle}>Delivery Status</Text>
                <View style={styles.statusStep}>
                  <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusTitle}>Order Confirmed</Text>
                    <Text style={styles.statusTime}>Just Now</Text>
                  </View>
                </View>
                <View style={[styles.statusLine, styles.activeLine]} />
                <View style={styles.statusStep}>
                  <MaterialCommunityIcons name="clock-outline" size={24} color="#6A0572" />
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusTitle}>Processing</Text>
                    <Text style={styles.statusTime}>Estimated: 1 day</Text>
                  </View>
                </View>
                <View style={styles.statusLine} />
                <View style={styles.statusStep}>
                  <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#666" />
                  <View style={styles.statusTextContainer}>
                    <Text style={styles.statusTitle}>Out for Delivery</Text>
                    <Text style={styles.statusTime}>Pending</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const DoctorConsultModal = ({ visible, onClose }) => {
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleVideoCall = (doctorId) => {
    console.log(`Starting video call with doctor ${doctorId}`);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Available Doctors</Text>
          <ScrollView style={styles.doctorsList}>
            {doctors.map((doctor) => (
              <View key={doctor.id} style={styles.doctorCard}>
                <View style={styles.doctorHeader}>
                  <Image source={doctor.image} style={styles.doctorImage} />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                    <Text style={styles.doctorExperience}>{doctor.experience}</Text>
                    <View style={styles.ratingContainer}>
                      <MaterialCommunityIcons name="star" size={16} color="#FFA000" />
                      <Text style={styles.ratingText}>{doctor.rating}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.locationText}>
                  <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                  {' '}{doctor.location}
                </Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() => handleCall(doctor.phone)}>
                    <MaterialCommunityIcons name="phone" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.videoButton]}
                    onPress={() => handleVideoCall(doctor.id)}>
                    <MaterialCommunityIcons name="video" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Video Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [doctorModalVisible, setDoctorModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const updateQuantity = (id, amount) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    setConfirmModalVisible(false);
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>
        
        <TouchableOpacity style={styles.consultButton} onPress={() => setDoctorModalVisible(true)}>
          <MaterialCommunityIcons name="doctor" size={24} color="white" />
          <Text style={styles.consultButtonText}>Consult a Doctor</Text>
        </TouchableOpacity>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}>
                    <MaterialCommunityIcons name="minus" size={20} color="#333" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
                    <MaterialCommunityIcons name="plus" size={20} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
                <MaterialCommunityIcons name="delete" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${getTotal()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>$5.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${(parseFloat(getTotal()) + 5).toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => setConfirmModalVisible(true)}>
            <Text style={styles.checkoutText}>Checkout</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <DoctorConsultModal visible={doctorModalVisible} onClose={() => setDoctorModalVisible(false)} />
        <OrderConfirmationModal 
          visible={confirmModalVisible} 
          onClose={() => setConfirmModalVisible(false)} 
          orderTotal={(parseFloat(getTotal()) + 5).toFixed(2)} 
          onConfirm={handlePlaceOrder}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    color: '#333',
  },
  consultButton: {
    backgroundColor: '#6A0572',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  consultButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 8,
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 15,
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#6A0572',
  },
  checkoutButton: {
    backgroundColor: '#5F3254',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 15,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 25,
    top: 25,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    marginTop: 10,
    color: '#333',
  },
  doctorsList: {
    marginTop: 10,
  },
  doctorCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 5,
  },
  doctorSpecialty: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
    marginBottom: 3,
  },
  doctorExperience: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#888',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
    marginLeft: 5,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    flex: 0.48,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  callButton: {
    backgroundColor: '#4CAF50',
  },
  videoButton: {
    backgroundColor: '#6A0572',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  confirmationContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  confirmationTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  confirmationTotal: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#6A0572',
    marginBottom: 20,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
    width: '100%',
  },
  deliveryText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#6A0572',
    padding: 18,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  cancelButton: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  successContent: {
    padding: 20,
  },
  successIconContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  successHeader: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubHeader: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  orderDetailsCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  statusCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  statusLine: {
    width: 2,
    height: 30,
    backgroundColor: '#E0E0E0',
    marginLeft: 11,
  },
  activeLine: {
    backgroundColor: '#4CAF50',
  },
  statusTextContainer: {
    marginLeft: 15,
  },
  statusTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  statusTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
});

export default CartScreen;