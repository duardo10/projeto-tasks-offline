import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

// Componentes
import Header from './TaskList/Header';
import TaskItem from './TaskList/TaskItem';
import AddTaskForm from './TaskList/AddTaskForm';
import { PriorityModal, DateModal } from './TaskList/Modals';

// Utilitários
import {
  getPriorityColor,
  getPriorityIcon,
  formatDate,
  isOverdue,
  getDaysUntilDue,
  sortTasks,
} from './TaskList/utils';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { 
      id: '1', 
      title: 'Estudar React Native', 
      completed: false, 
      priority: 'high',
      dueDate: '2024-01-15'
    },
    { 
      id: '2', 
      title: 'Fazer exercícios', 
      completed: true, 
      priority: 'medium',
      dueDate: '2024-01-10'
    },
    { 
      id: '3', 
      title: 'Ler documentação', 
      completed: false, 
      priority: 'low',
      dueDate: '2024-01-20'
    },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditingNewTask, setIsEditingNewTask] = useState(false);

  const addTask = () => {
    if (newTask.trim().length === 0) {
      Alert.alert('Erro', 'Digite o título da tarefa');
      return;
    }
    
    if (!newTaskDueDate) {
      Alert.alert('Data Obrigatória', 'Selecione uma data de finalização para a tarefa');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setNewTaskPriority('medium');
    setNewTaskDueDate('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Deletar Tarefa',
      'Tem certeza que deseja deletar esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => setTasks(tasks.filter(task => task.id !== id)),
        },
      ]
    );
  };

  const updateTaskPriority = (id, priority) => {
    if (isEditingNewTask) {
      setNewTaskPriority(priority);
      setIsEditingNewTask(false);
    } else {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, priority } : task
      ));
      setEditingTask(null);
    }
    setShowPriorityModal(false);
  };

  const updateTaskDueDate = (id, dueDate) => {
    if (isEditingNewTask) {
      setNewTaskDueDate(dueDate);
      setIsEditingNewTask(false);
    } else {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, dueDate } : task
      ));
      setEditingTask(null);
    }
    setShowDateModal(false);
  };

  const handlePriorityPress = (task) => {
    setEditingTask(task);
    setIsEditingNewTask(false);
    setShowPriorityModal(true);
  };

  const handleDatePress = (task) => {
    setEditingTask(task);
    setIsEditingNewTask(false);
    setShowDateModal(true);
  };

  const handleNewTaskPriorityPress = () => {
    setIsEditingNewTask(true);
    setShowPriorityModal(true);
  };

  const handleNewTaskDatePress = () => {
    setIsEditingNewTask(true);
    setShowDateModal(true);
  };

  const closeModals = () => {
    setShowPriorityModal(false);
    setShowDateModal(false);
    setEditingTask(null);
    setIsEditingNewTask(false);
  };

  const renderTask = ({ item }) => (
    <TaskItem
      task={item}
      onToggle={toggleTask}
      onDelete={deleteTask}
      onPriorityPress={handlePriorityPress}
      onDatePress={handleDatePress}
      getPriorityColor={getPriorityColor}
      getPriorityIcon={getPriorityIcon}
      formatDate={formatDate}
      isOverdue={isOverdue}
      getDaysUntilDue={getDaysUntilDue}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Header
          completedTasks={tasks.filter(task => task.completed).length}
          totalTasks={tasks.length}
        />

        <FlatList
          data={sortTasks(tasks)}
          renderItem={renderTask}
          keyExtractor={item => item.id}
          style={styles.taskList}
          contentContainerStyle={styles.taskListContent}
          showsVerticalScrollIndicator={false}
        />

        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          newTaskPriority={newTaskPriority}
          newTaskDueDate={newTaskDueDate}
          onAddTask={addTask}
          onPriorityPress={handleNewTaskPriorityPress}
          onDatePress={handleNewTaskDatePress}
          getPriorityColor={getPriorityColor}
          getPriorityIcon={getPriorityIcon}
          formatDate={formatDate}
        />

        <PriorityModal
          isVisible={showPriorityModal}
          onClose={closeModals}
          onSelectPriority={updateTaskPriority}
          getPriorityColor={getPriorityColor}
          getPriorityIcon={getPriorityIcon}
        />

        <DateModal
          isVisible={showDateModal}
          onClose={closeModals}
          onSelectDate={updateTaskDueDate}
          formatDate={formatDate}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default TaskList; 