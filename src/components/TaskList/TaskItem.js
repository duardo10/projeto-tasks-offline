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
  getDaysUntilDue,
  getOverdueStatus,
  getOverdueText
}) => {
  const overdueStatus = getOverdueStatus(task.dueDate);
  
  return (
    <View style={[
      styles.taskItem,
      task.completed && styles.completedTaskItem,
      !task.completed && overdueStatus === 'overdue' && styles.overdueTask,
      !task.completed && overdueStatus === 'due-today' && styles.dueTodayTask,
      !task.completed && overdueStatus === 'due-soon' && styles.dueSoonTask,
      !task.completed && overdueStatus === 'due-later' && styles.dueLaterTask
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
                color={task.completed ? '#2ed573' : getPriorityColor(task.priority)}
              />
              <Text style={[styles.priorityText, { color: task.completed ? '#2ed573' : getPriorityColor(task.priority) }]}>
                {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
              </Text>
            </TouchableOpacity>

            {task.dueDate && (
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => onDatePress(task)}
              >
                {task.completed ? (
                  <View style={styles.completedStatusContainer}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#2ed573"
                    />
                    <Text style={styles.completedStatusText}>
                      Concluída
                    </Text>
                  </View>
                ) : (
                  <>
                    <Ionicons
                      name={overdueStatus === 'overdue' ? 'warning' : 'calendar-outline'}
                      size={16}
                      color={
                        overdueStatus === 'overdue' ? '#ff4757' :
                        overdueStatus === 'due-today' ? '#ff4757' :
                        overdueStatus === 'due-soon' ? '#ffa502' : '#3498db'
                      }
                    />
                    <View style={styles.dateTextContainer}>
                      <Text style={[
                        styles.dateText,
                        { 
                          color: overdueStatus === 'overdue' ? '#ff4757' :
                                 overdueStatus === 'due-today' ? '#ff4757' :
                                 overdueStatus === 'due-soon' ? '#ffa502' : '#3498db'
                        }
                      ]}>
                        {formatDate(task.dueDate)}
                      </Text>
                      <Text style={[
                        styles.overdueText,
                        { 
                          color: overdueStatus === 'overdue' ? '#ff4757' :
                                 overdueStatus === 'due-today' ? '#ff4757' :
                                 overdueStatus === 'due-soon' ? '#ffa502' : '#3498db'
                        }
                      ]}>
                        {getOverdueText(task.dueDate)}
                      </Text>
                    </View>
                  </>
                )}
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
  completedTaskItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ed573',
    backgroundColor: '#fff',
  },
  overdueTask: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff4757',
    backgroundColor: '#fff',
  },
  dueTodayTask: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff4757',
    backgroundColor: '#fff',
  },

  dueSoonTask: {
    borderLeftWidth: 4,
    borderLeftColor: '#ffa502',
    backgroundColor: '#fff',
  },
  dueLaterTask: {
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    backgroundColor: '#fff',
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
  dateTextContainer: {
    marginLeft: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
  },
  overdueText: {
    fontSize: 10,
    fontWeight: '400',
    marginTop: 1,
  },
  completedStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fff4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2ed573',
  },
  completedStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2ed573',
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
  },
});

export default TaskItem; 