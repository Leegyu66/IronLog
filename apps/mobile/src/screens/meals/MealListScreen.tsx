import { StyleSheet, Text, View } from 'react-native';

export default function MealListScreen() {
  return (
    <View style={styles.container}>
      <Text>식단 기록</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
