import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const flatListRef = useRef(null);

  // Enhanced medical knowledge base
  const medicalKnowledge = {
  'headache': {
    diagnosis: 'Possible tension headache or migraine',
    severity: 'Medium',
    solutions: [
      'Rest in a quiet, dark room',
      'Stay hydrated',
      'Practice stress management',
      'Apply cold or warm compress'
    ],
    medicines: [
      'Ibuprofen (400-600mg)',
      'Acetaminophen (500-1000mg)',
      'Aspirin (if age appropriate)'
    ],
    warning_signs: [
      'Sudden severe headache',
      'Headache with fever',
      'Neurological symptoms'
    ]
  },
  'fever': {
    diagnosis: 'Possible viral or bacterial infection',
    severity: 'Medium',
    solutions: [
      'Rest and get adequate sleep',
      'Stay hydrated',
      'Use a light blanket if chills occur',
      'Monitor temperature regularly'
    ],
    medicines: [
      'Acetaminophen (500-1000mg)',
      'Ibuprofen (400-600mg)'
    ],
    warning_signs: [
      'Temperature above 103°F (39.4°C)',
      'Severe throat pain',
      'Difficulty breathing'
    ]
  },
  'cough': {
    diagnosis: 'Possible upper respiratory infection',
    severity: 'Low',
    solutions: [
      'Stay hydrated',
      'Use a humidifier',
      'Rest voice',
      'Honey for soothing (if age appropriate)'
    ],
    medicines: [
      'Dextromethorphan for dry cough',
      'Guaifenesin for wet cough',
      'Honey and lemon tea'
    ],
    warning_signs: [
      'Coughing up blood',
      'Difficulty breathing',
      'Chest pain'
    ]
  },
  'nausea': {
    diagnosis: 'Possible gastrointestinal issue or motion sickness',
    severity: 'Low',
    solutions: [
      'Avoid strong odors',
      'Eat small, bland meals',
      'Stay hydrated with clear fluids',
      'Rest in a cool, quiet place'
    ],
    medicines: [
      'Dimenhydrinate (for motion sickness)',
      'Emetrol (for nausea relief)',
      'Ginger supplements or tea'
    ],
    warning_signs: [
      'Persistent vomiting',
      'Severe abdominal pain',
      'Blood in vomit'
    ]
  },
  'fatigue': {
    diagnosis: 'Possible anemia, sleep disorder, or chronic fatigue syndrome',
    severity: 'Medium',
    solutions: [
      'Get adequate sleep (7-9 hours)',
      'Maintain a balanced diet',
      'Exercise regularly',
      'Reduce stress'
    ],
    medicines: [
      'Iron supplements (if anemia is suspected)',
      'Vitamin B12 supplements',
      'Consult a doctor for persistent fatigue'
    ],
    warning_signs: [
      'Unexplained weight loss',
      'Severe weakness',
      'Fainting spells'
    ]
  },
  'sore throat': {
    diagnosis: 'Possible viral or bacterial infection (e.g., strep throat)',
    severity: 'Medium',
    solutions: [
      'Gargle with warm salt water',
      'Stay hydrated',
      'Use a humidifier',
      'Rest voice'
    ],
    medicines: [
      'Acetaminophen (500-1000mg)',
      'Ibuprofen (400-600mg)',
      'Throat lozenges'
    ],
    warning_signs: [
      'Difficulty swallowing',
      'High fever',
      'Swollen lymph nodes'
    ]
  },
  'body ache': {
    diagnosis: 'Possible viral infection or muscle strain',
    severity: 'Low',
    solutions: [
      'Rest and avoid strenuous activity',
      'Apply warm compress',
      'Stay hydrated',
      'Gentle stretching'
    ],
    medicines: [
      'Ibuprofen (400-600mg)',
      'Acetaminophen (500-1000mg)',
      'Topical pain relief creams'
    ],
    warning_signs: [
      'Severe pain',
      'Swelling or redness',
      'Fever'
    ]
  },
  'dizziness': {
    diagnosis: 'Possible dehydration, low blood pressure, or inner ear issue',
    severity: 'Medium',
    solutions: [
      'Sit or lie down immediately',
      'Stay hydrated',
      'Avoid sudden movements',
      'Eat small, frequent meals'
    ],
    medicines: [
      'Meclizine (for vertigo)',
      'Consult a doctor for persistent dizziness'
    ],
    warning_signs: [
      'Fainting',
      'Chest pain',
      'Severe headache'
    ]
  }
};

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Nausea',
    'Fatigue', 'Sore Throat', 'Body Ache', 'Dizziness'
  ];

  const analyzeSymptoms = (symptoms) => {
    const symptomText = symptoms.toLowerCase();
    let response = {
      type: 'bot',
      text: 'I apologize, but I cannot make a definitive diagnosis based on the provided symptoms. Please consult a healthcare professional for accurate medical advice.',
      severity: 'Unknown'
    };

    Object.entries(medicalKnowledge).forEach(([condition, info]) => {
      if (symptomText.includes(condition)) {
        response = {
          type: 'bot',
          text: `Based on your symptoms, here's my analysis:

🏥 Possible Diagnosis: ${info.diagnosis}

⚕️ Recommended Solutions:
${info.solutions.map(s => `• ${s}`).join('\n')}

💊 Recommended Medicines:
${info.medicines.map(m => `• ${m}`).join('\n')}

⚠️ Warning Signs (Seek immediate care if you experience):
${info.warning_signs.map(w => `• ${w}`).join('\n')}

🔔 Important: This is not a substitute for professional medical advice. If symptoms persist or worsen, please consult a healthcare provider.`,
          severity: info.severity
        };
      }
    });

    return response;
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage = {
        type: 'user',
        text: inputText.trim()
      };
      
      const botResponse = analyzeSymptoms(inputText);

      setMessages(prevMessages => [...prevMessages, userMessage, botResponse]);
      setInputText('');
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd();
      }, 100);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.type === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      {item.type === 'bot' && (
        <View style={styles.botHeader}>
          <Image 
            source={require('/Users/extra/Desktop/VitalAid/VitalAid/assets/trilok.jpg')}
            style={styles.botAvatar}
          />
          <Text style={styles.botName}>VitalAid Assistant</Text>
          {item.severity && (
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) }]}>
              <Text style={styles.severityText}>{item.severity}</Text>
            </View>
          )}
        </View>
      )}
      <Text style={[
        styles.messageText,
        item.type === 'user' ? styles.userMessageText : styles.botMessageText
      ]}>{item.text}</Text>
    </View>
  );

  const getSeverityColor = (severity) => {
    const colors = {
      Low: '#4CAF50',
      Medium: '#FFA000',
      High: '#F44336',
      Unknown: '#757575'
    };
    return colors[severity] || colors.Unknown;
  };

  const SymptomSelectionModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSymptomModal}
      onRequestClose={() => setShowSymptomModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Your Symptoms</Text>
          <ScrollView style={styles.symptomsList}>
            {commonSymptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom}
                style={[
                  styles.symptomItem,
                  selectedSymptoms.includes(symptom) && styles.selectedSymptom
                ]}
                onPress={() => {
                  setSelectedSymptoms(prev =>
                    prev.includes(symptom)
                      ? prev.filter(s => s !== symptom)
                      : [...prev, symptom]
                  );
                }}>
                <Text style={[
                  styles.symptomText,
                  selectedSymptoms.includes(symptom) && styles.selectedSymptomText
                ]}>{symptom}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              if (selectedSymptoms.length > 0) {
                setInputText(selectedSymptoms.join(', '));
                setShowSymptomModal(false);
                setSelectedSymptoms([]);
              }
            }}>
            <Text style={styles.confirmButtonText}>Confirm Selection</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowSymptomModal(false)}>
            <MaterialCommunityIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medical Assistant</Text>
        <Text style={styles.headerSubText}>24/7 AI-Powered Health Support</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(_, index) => index.toString()}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TouchableOpacity
          style={styles.symptomButton}
          onPress={() => setShowSymptomModal(true)}>
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#6A0572" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Describe your symptoms..."
          multiline
          maxLength={500}
        />
        
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}>
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <SymptomSelectionModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 16,
    backgroundColor: '#6A0572',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  headerSubText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  userMessage: {
    backgroundColor: '#6A0572',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  botMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  botHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  botAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  botName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  symptomButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
    fontFamily: 'Poppins-Regular',
  },
  sendButton: {
    backgroundColor: '#6A0572',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    minHeight: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  symptomsList: {
    maxHeight: 300,
  },
  symptomItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedSymptom: {
    backgroundColor: '#6A0572',
  },
  symptomText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  selectedSymptomText: {
    color: 'white',
  },
  confirmButton: {
    backgroundColor: '#6A0572',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  severityText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});

export default MenuScreen;