import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const PriorityModal = ({ 
  isVisible, 
  onClose, 
  onSelectPriority, 
  getPriorityColor, 
  getPriorityIcon 
}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onClose}
    style={styles.modal}
  >
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Selecionar Prioridade</Text>
      {['high', 'medium', 'low'].map((priority) => (
        <TouchableOpacity
          key={priority}
          style={styles.priorityOption}
          onPress={() => onSelectPriority(priority)}
        >
          <Ionicons
            name={getPriorityIcon(priority)}
            size={20}
            color={getPriorityColor(priority)}
          />
          <Text style={styles.priorityOptionText}>
            {priority === 'high' ? 'Alta' : priority === 'medium' ? 'Média' : 'Baixa'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </Modal>
);

const DateModal = ({ isVisible, onClose, onSelectDate, formatDate }) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onClose}
    style={styles.modal}
  >
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Selecionar Data</Text>
      <ScrollView>
        {Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          return date.toISOString().split('T')[0];
        }).map((date) => (
          <TouchableOpacity
            key={date}
            style={styles.dateOption}
            onPress={() => onSelectDate(date)}
          >
            <Text style={styles.dateOptionText}>{formatDate(date)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  priorityOptionText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#2c3e50',
  },
  dateOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  dateOptionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
});

export { PriorityModal, DateModal }; 