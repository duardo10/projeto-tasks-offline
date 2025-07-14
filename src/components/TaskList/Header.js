import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Header = ({ completedTasks, totalTasks }) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80' }}
      style={styles.headerBackground}
      imageStyle={styles.headerImage}
    >
      <View style={styles.headerOverlay}>
        <Text style={styles.title}>Minhas Tarefas</Text>
        <Text style={styles.currentDate}>{getCurrentDate()}</Text>
        <View style={styles.stats}>
          <Text style={styles.statsText}>
            {completedTasks}/{totalTasks} concluídas
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    height: 200,
    justifyContent: 'flex-end',
  },
  headerImage: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  currentDate: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontStyle: 'italic',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Header; 