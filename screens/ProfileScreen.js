import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const user = {
  name: 'Shubham Shaswat',
  profilePic: require('../assets/shubham.jpeg'),
  age: "21",
  bloodGroup: "O+",
  phone: "+91 80763-44502",
  email: "Shubham@example.com",
  emergencyContact: "+91 80763-44502",
  weight: "75 kg",
  height: "175 cm",
  allergies: ["Peanuts", "Penicillin"],
  insurance: {
    provider: "HealthCare Plus",
    policyNumber: "HC123456789",
    expiryDate: "2025-12-31"
  }
};

const mockMedicalHistory = [
  { id: '1', diagnosis: 'Cold', date: '2025-02-07', severity: 'Low', doctor: 'Dr. Smith', prescription: ['Paracetamol', 'Vitamin C'] },
  { id: '2', diagnosis: 'Headache', date: '2025-02-05', severity: 'Medium', doctor: 'Dr. Johnson', prescription: ['Ibuprofen'] },
  { id: '3', diagnosis: 'Fever', date: '2025-01-30', severity: 'Medium', doctor: 'Dr. Smith', prescription: ['Acetaminophen', 'Rest'] }
];

const orderHistory = [
  {
    id: '1',
    date: '2025-02-05',
    items: ['Paracetamol x2', 'Vitamin C x1'],
    total: 21.47,
    status: 'Delivered'
  },
  {
    id: '2',
    date: '2025-01-28',
    items: ['Cough Syrup x1', 'Bandages x2'],
    total: 15.98,
    status: 'Delivered'
  },
  {
    id: '3',
    date: '2025-01-15',
    items: ['Antibiotic x1', 'Pain Relief Gel x1'],
    total: 32.50,
    status: 'Delivered'
  }
];

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

const DiagnosisDetailModal = ({ visible, diagnosis, onClose }) => (
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
        <Text style={styles.modalTitle}>Diagnosis Details</Text>
        <ScrollView style={styles.modalScroll}>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Condition</Text>
            <Text style={styles.modalDetailText}>{diagnosis?.diagnosis}</Text>
          </View>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Date</Text>
            <Text style={styles.modalDetailText}>{new Date(diagnosis?.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Severity</Text>
            <View style={styles.severityContainer}>
              <StatusIndicator severity={diagnosis?.severity} />
              <Text style={styles.modalDetailText}>{diagnosis?.severity}</Text>
            </View>
          </View>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Doctor</Text>
            <Text style={styles.modalDetailText}>{diagnosis?.doctor}</Text>
          </View>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Prescription</Text>
            {diagnosis?.prescription.map((med, index) => (
              <Text key={index} style={styles.prescriptionItem}>• {med}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const OrderHistoryModal = ({ visible, order, onClose }) => (
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
        <Text style={styles.modalTitle}>Order Details</Text>
        <ScrollView style={styles.modalScroll}>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Order ID</Text>
            <Text style={styles.modalDetailText}>#{order?.id}</Text>
          </View>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Date</Text>
            <Text style={styles.modalDetailText}>{new Date(order?.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Items</Text>
            {order?.items.map((item, index) => (
              <Text key={index} style={styles.orderItem}>• {item}</Text>
            ))}
          </View>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Total Amount</Text>
            <Text style={styles.modalDetailText}>₹{order?.total.toFixed(2)}</Text>
          </View>
          <View style={styles.modalDetailItem}>
            <Text style={styles.modalDetailLabel}>Status</Text>
            <Text style={[styles.modalDetailText, { color: '#4CAF50' }]}>{order?.status}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.reorderButton}>
          <MaterialCommunityIcons name="refresh" size={24} color="white" />
          <Text style={styles.reorderText}>Reorder Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const ProfileScreen = ({ navigation }) => {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const InfoItem = ({ icon, label, value }) => (
    <View style={styles.infoItem}>
      <MaterialCommunityIcons name={icon} size={24} color="#5F3254" />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoText}>{value}</Text>
      </View>
    </View>
  );

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={user.profilePic} style={styles.profileImage} />
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.bloodGroupTag}>
            <Text style={styles.bloodGroupText}>{user.bloodGroup}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <InfoItem icon="account" label="Age" value={`${user.age} years`} />
          <InfoItem icon="phone" label="Phone" value={user.phone} />
          <InfoItem icon="email" label="Email" value={user.email} />
          <InfoItem icon="phone-alert" label="Emergency Contact" value={user.emergencyContact} />
          <InfoItem icon="human-male-height" label="Height" value={user.height} />
          <InfoItem icon="weight" label="Weight" value={user.weight} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <View style={styles.allergyContainer}>
            <Text style={styles.allergyTitle}>Allergies:</Text>
            <View style={styles.allergyList}>
              {user.allergies.map((allergy, index) => (
                <View key={index} style={styles.allergyTag}>
                  <Text style={styles.allergyText}>{allergy}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.insuranceContainer}>
            <Text style={styles.insuranceTitle}>Insurance Details</Text>
            <InfoItem icon="shield-check" label="Provider" value={user.insurance.provider} />
            <InfoItem icon="card-text" label="Policy Number" value={user.insurance.policyNumber} />
            <InfoItem icon="calendar" label="Expiry Date" value={user.insurance.expiryDate} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Medical History</Text>
          {mockMedicalHistory.map(diagnosis => (
            <TouchableOpacity
              key={diagnosis.id}
              style={styles.diagnosisItem}
              onPress={() => setSelectedDiagnosis(diagnosis)}>
              <View style={styles.diagnosisHeader}>
                <StatusIndicator severity={diagnosis.severity} />
                <Text style={styles.diagnosisName}>{diagnosis.diagnosis}</Text>
              </View>
              <Text style={styles.diagnosisDate}>
                {new Date(diagnosis.date).toLocaleDateString()}
              </Text>
              <Text style={styles.doctorName}>Treated by: {diagnosis.doctor}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order History</Text>
          {orderHistory.map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderItem}
              onPress={() => setSelectedOrder(order)}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderDate}>
                  {new Date(order.date).toLocaleDateString()}
                </Text>
                <Text style={styles.orderStatus}>{order.status}</Text>
              </View>
              <Text style={styles.orderItems}>
                {order.items.join(', ')}
              </Text>
              <Text style={styles.orderTotal}>₹{order.total.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.exportButton}>
          <MaterialCommunityIcons name="file-export" size={24} color="white" />
          <Text style={styles.exportText}>Export Medical Records</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <DiagnosisDetailModal
          visible={!!selectedDiagnosis}
          diagnosis={selectedDiagnosis}
          onClose={() => setSelectedDiagnosis(null)}
        />

        <OrderHistoryModal
          visible={!!selectedOrder}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      </ScrollView>
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
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6A0572',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginTop: 10,
  },
  bloodGroupTag: {
    backgroundColor: '#5F3254',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  bloodGroupText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
  },
  allergyContainer: {
    marginVertical: 8,
  },
  allergyTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginBottom: 8,
  },
  allergyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergyTag: {
    backgroundColor: '#FFE0B2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  allergyText: {
    color: '#E65100',
    fontFamily: 'Poppins-Medium',
  },
  insuranceContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  insuranceTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  orderStatus: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#4CAF50',
  },
  orderItems: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#5F3254',
  },
  orderItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reorderButton: {
    flexDirection: 'row',
    backgroundColor: '#5F3254',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  reorderText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  diagnosisItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  diagnosisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  diagnosisName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  diagnosisDate: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 4,
    marginLeft: 22,
  },
  doctorName: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 4,
    marginLeft: 22,
  },
  exportButton: {
    flexDirection: 'row',
    backgroundColor: '#5F3254',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  exportText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#DC3545',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
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
    minHeight: '60%',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  modalScroll: {
    marginTop: 20,
  },
  modalDetailItem: {
    marginBottom: 16,
  },
  modalDetailLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  modalDetailText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prescriptionItem: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
    marginLeft: 8,
  }
});

export default ProfileScreen;