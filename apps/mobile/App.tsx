import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import WorkoutListScreen from './src/screens/workouts/WorkoutListScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <WorkoutListScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
