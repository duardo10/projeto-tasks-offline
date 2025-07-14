import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ 
  task, 
  onToggle, 
  onDelete, 
  onPriorityPress, 
  onDatePress,
  getPriorityColor,
  getPriorityIcon,
  formatDate,
  isOverdue,
  getDaysUntilDue
}) => {
  return (
    <View style={[
      styles.taskItem,
      isOverdue(task.dueDate) && styles.overdueTask,
      getDaysUntilDue(task.dueDate) <= 1 && getDaysUntilDue(task.dueDate) >= 0 && !isOverdue(task.dueDate) && styles.urgentTask
    ]}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => onToggle(task.id)}
      >
        <View style={styles.checkboxContainer}>
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={task.completed ? '#2ed573' : '#747d8c'}
          />
        </View>
        
        <View style={styles.taskInfo}>
          <Text style={[
            styles.taskTitle,
            task.completed && styles.completedTask
          ]}>
            {task.title}
          </Text>
          
          <View style={styles.taskMeta}>
            <TouchableOpacity
              style={styles.priorityContainer}
              onPress={() => onPriorityPress(task)}
            >
              <Ionicons
                name={getPriorityIcon(task.priority)}
                size={16}
                color={getPriorityColor(task.priority)}
              />
              <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
              </Text>
            </TouchableOpacity>

            {task.dueDate && (
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => onDatePress(task)}
              >
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={isOverdue(task.dueDate) ? '#ff4757' : '#747d8c'}
                />
                <Text style={[
                  styles.dateText,
                  { color: isOverdue(task.dueDate) ? '#ff4757' : '#747d8c' }
                ]}>
                  {formatDate(task.dueDate)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#ff4757" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 6,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overdueTask: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff4757',
    backgroundColor: '#fff5f5',
  },
  urgentTask: {
    borderLeftWidth: 4,
    borderLeftColor: '#ffa502',
    backgroundColor: '#fffbf0',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 8,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  priorityText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  dateText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
  },
});

export default TaskItem; 