import React, { useState } from 'react';
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

const DateModal = ({ isVisible, onClose, onSelectDate, formatDate }) => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  
  const getMonthName = (monthOffset) => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };
  
  const getDatesForMonth = (monthOffset) => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() + monthOffset);
    
    if (monthOffset === 0) {
      // Current month: start from today
      startDate.setDate(startDate.getDate());
    } else {
      // Future months: start from day 1
      startDate.setDate(1);
    }
    
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // Last day of the month
    
    const dates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };
  
  const months = Array.from({ length: 12 }, (_, i) => i); // 12 months ahead
  
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecionar Data</Text>
        
        {/* Month Selector */}
        <View style={styles.monthSelector}>
          <TouchableOpacity
            style={styles.monthArrow}
            onPress={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}
            disabled={selectedMonth === 0}
          >
            <Ionicons 
              name="chevron-back" 
              size={20} 
              color={selectedMonth === 0 ? '#ccc' : '#2c3e50'} 
            />
          </TouchableOpacity>
          
          <Text style={styles.monthText}>{getMonthName(selectedMonth)}</Text>
          
          <TouchableOpacity
            style={styles.monthArrow}
            onPress={() => setSelectedMonth(Math.min(11, selectedMonth + 1))}
            disabled={selectedMonth === 11}
          >
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={selectedMonth === 11 ? '#ccc' : '#2c3e50'} 
            />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.datesContainer}>
          {getDatesForMonth(selectedMonth).map((date) => (
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
};

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
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  monthArrow: {
    padding: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textTransform: 'capitalize',
  },
  datesContainer: {
    maxHeight: 300,
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