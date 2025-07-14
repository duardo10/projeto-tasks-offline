import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AddTaskForm = ({
  newTask,
  setNewTask,
  newTaskPriority,
  newTaskDueDate,
  onAddTask,
  onPriorityPress,
  onDatePress,
  getPriorityColor,
  getPriorityIcon,
  formatDate
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={onAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.gradientButton}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <View style={styles.newTaskOptions}>
        <TouchableOpacity
          style={[
            styles.prioritySelector,
            newTaskPriority !== 'medium' && styles.selectorActive
          ]}
          onPress={onPriorityPress}
        >
          <Ionicons
            name={getPriorityIcon(newTaskPriority)}
            size={16}
            color={getPriorityColor(newTaskPriority)}
          />
          <Text style={[styles.priorityText, { color: getPriorityColor(newTaskPriority) }]}>
            {newTaskPriority === 'high' ? 'Alta' : newTaskPriority === 'medium' ? 'Média' : 'Baixa'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dateSelector,
            newTaskDueDate && styles.selectorActive
          ]}
          onPress={onDatePress}
        >
          <Ionicons 
            name={newTaskDueDate ? "calendar" : "calendar-outline"} 
            size={16} 
            color={newTaskDueDate ? "#2ed573" : "#747d8c"} 
          />
          <Text style={[styles.dateText, { color: newTaskDueDate ? "#2ed573" : "#747d8c" }]}>
            {newTaskDueDate ? formatDate(newTaskDueDate) : 'Data obrigatória'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  addButton: {
    marginLeft: 12,
  },
  gradientButton: {
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newTaskOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prioritySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  selectorActive: {
    backgroundColor: '#e8f5e8',
    borderWidth: 1,
    borderColor: '#2ed573',
  },
  priorityText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default AddTaskForm; 