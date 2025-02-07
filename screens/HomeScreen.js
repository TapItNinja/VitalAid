import { useNavigation } from '@react-navigation/native';
import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const user = {
  name: 'Shubham',
  profilePic: require('/Users/extra/Desktop/VitalAid/VitalAid/assets/shubham.jpeg'),
  diagnosis: 'You are having a cold!',
  advice: 'Stay hydrated and get plenty of rest.',
  recentDiagnoses: [
    { id: '1', condition: 'Cold', time: 'Today, 12:30', status: 'Normal', severity: 'Low' },
    { id: '2', condition: 'Headache', time: 'Today, 20:21', status: 'Normal', severity: 'Medium' },
  ],
};

const StatusIndicator = ({ severity }) => {
  const colors = {
    Low: '#4CAF50',
    Medium: '#FFA000',
    High: '#F44336'
  };
  return (
    <View style={[styles.statusIndicator, { backgroundColor: colors[severity] }]} />
  );
};

const OrderModal = memo(({ visible, onClose, cart, totalAmount, onPlaceOrder, isLoading, error }) => (
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
        <Text style={styles.modalTitle}>Order Summary</Text>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <ScrollView style={styles.modalScroll}>
          {cart.map(item => (
            <View key={item.id} style={styles.modalItem}>
              <Text style={styles.modalItemName}>{item.name}</Text>
              <Text style={styles.modalItemPrice}>
                ₹{item.price} x {item.quantity}
              </Text>
            </View>
          ))}
          <View style={styles.modalDivider} />
          <View style={styles.modalTotal}>
            <Text style={styles.modalTotalText}>Grand Total:</Text>
            <Text style={styles.modalTotalAmount}>₹{totalAmount.toFixed(2)}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.placeOrderButton, isLoading && styles.placeOrderButtonDisabled]}
          onPress={onPlaceOrder}
          disabled={isLoading}>
          <Text style={styles.placeOrderText}>
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
));

const SymptomCheckerModal = ({ visible, onClose, navigation }) => {
  const handleChatPress = () => {
    onClose();
    navigation.navigate('Menu');
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
          <Text style={styles.modalTitle}>AI Diagnosis</Text>
          <TouchableOpacity style={styles.modalButton}>
            <MaterialCommunityIcons name="folder-image" size={24} color="white" style={styles.buttonIcon} />
            <Text style={styles.modalButtonText}>Upload Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={handleChatPress}>
            <MaterialCommunityIcons name="robot" size={24} color="white" style={styles.buttonIcon} />
            <Text style={styles.modalButtonText}>Chat with AI Bot</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [cart] = useState([]);
  const [totalAmount] = useState(0);
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const [hasNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.profileContainer}>
              <Image source={user.profilePic} style={styles.profileImage} />
              <View style={styles.userInfoContainer}>
                <Text style={styles.greetingText}>Hello 👋</Text>
                <Text style={styles.userName}>{user.name}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationContainer}>
              <MaterialCommunityIcons name="bell" size={24} color="#333" />
              {hasNotifications && <View style={styles.notificationBadge} />}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <ImageBackground 
            source={require('/Users/extra/Desktop/VitalAid/VitalAid/assets/Frame_574-removebg-preview.png')} 
            style={styles.diagnosisBox}>
            <Text style={styles.diagnosisText}>{user.diagnosis}</Text>
            <Text style={styles.adviceText}>{user.advice}</Text>
            <TouchableOpacity 
              style={styles.medicineButton}
              onPress={() => setOrderModalVisible(true)}>
              <MaterialCommunityIcons name="pill" size={20} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Buy Medicine</Text>
            </TouchableOpacity>
          </ImageBackground>

          <TouchableOpacity 
            style={styles.symptomCheckerButton}
            onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="stethoscope" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Symptom Checker</Text>
          </TouchableOpacity>

          <View style={styles.recentDiagnosisContainer}>
            <Text style={styles.recentDiagnosisHeading}>Recent Diagnosis</Text>
            <View style={styles.divider} />
            <FlatList
              data={user.recentDiagnoses}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.diagnosisItem}>
                  <View style={styles.diagnosisHeader}>
                    <StatusIndicator severity={item.severity} />
                    <Text style={styles.conditionText}>{item.condition}</Text>
                  </View>
                  <Text style={styles.timeText}>{item.time}</Text>
                  <Text style={styles.statusText}>Condition: {item.status}</Text>
                </View>
              )}
              contentContainerStyle={styles.recentDiagnosisList}
            />
          </View>
        </View>

        <SymptomCheckerModal 
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          navigation={navigation}
        />

        <OrderModal
          visible={orderModalVisible}
          onClose={() => setOrderModalVisible(false)}
          cart={cart}
          totalAmount={totalAmount}
          onPlaceOrder={() => {}}
          isLoading={isLoading}
          error={error}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    flexDirection: 'column',
  },
  greetingText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  userName: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  notificationContainer: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4444',
    borderWidth: 2,
    borderColor: '#F8F8F8',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#6A0572',
  },
  diagnosisBox: {
    backgroundColor: '#6A0572',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  diagnosisText: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 10,
  },
  adviceText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  medicineButton: {
    backgroundColor: '#5F3254',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  symptomCheckerButton: {
    backgroundColor: '#5F3254',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 5,
  },
  recentDiagnosisContainer: {
    flex: 1,
    marginBottom: 20,
  },
  recentDiagnosisHeading: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  recentDiagnosisList: {
    paddingBottom: 30,
  },
  diagnosisItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  diagnosisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  conditionText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
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
    alignItems: 'center',
    minHeight: 350,
  },
  closeButton: {
    position: 'absolute',
    right: 25,
    top: 25,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 30,
    marginTop: 20,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#5F3254',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
    elevation: 3,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
  },
  modalScroll: {
    maxHeight: 350,
    width: '100%',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  modalItemPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  modalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  modalTotalText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  modalTotalAmount: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#5F3254',
  },
  placeOrderButton: {
    backgroundColor: '#5F3254',
    padding: 18,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    elevation: 3,
  },
  placeOrderButtonDisabled: {
    opacity: 0.5,
  },
  placeOrderText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});

export default HomeScreen;