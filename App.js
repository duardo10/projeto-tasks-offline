import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TaskList from './src/components/TaskList';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
