import { ScrollView, StyleSheet, View } from 'react-native';
import { AppText, ListRow, Screen } from '../../components/ui';
import { useRoutineStore } from '../../store/RoutineStore';
import { spacing } from '../../theme';

export default function ExerciseListScreen() {
  const { exercises } = useRoutineStore();
  const categories = [...new Set(exercises.map((exercise) => exercise.category))];

  return (
    <Screen edges={[]}>
      <ScrollView contentContainerStyle={styles.content}>
        {categories.map((category) => (
          <View key={category} style={styles.group}>
            <AppText variant="heading">{category}</AppText>
            {exercises
              .filter((exercise) => exercise.category === category)
              .map((exercise) => (
                <ListRow key={exercise.id} title={exercise.name} />
              ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  group: {
    gap: spacing.md,
  },
});
