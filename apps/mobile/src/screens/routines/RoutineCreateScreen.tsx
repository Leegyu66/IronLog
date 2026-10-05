import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppText, Button, ListRow, Screen, TextField } from '../../components/ui';
import { useRoutineStore } from '../../store/RoutineStore';
import { spacing } from '../../theme';

export default function RoutineCreateScreen() {
  const router = useRouter();
  const { exercises, addRoutine } = useRoutineStore();
  const [name, setName] = useState('');
  const [exerciseIds, setExerciseIds] = useState<string[]>([]);

  const toggleExercise = (id: string) =>
    setExerciseIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

  const canSave = name.trim().length > 0 && exerciseIds.length > 0;

  const save = () => {
    addRoutine({ name: name.trim(), exerciseIds });
    router.back();
  };

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TextField label="루틴 이름" placeholder="예: 하체 루틴" value={name} onChangeText={setName} />
        <View style={styles.section}>
          <AppText variant="heading">종목 선택</AppText>
          <AppText variant="caption" color="secondary">
            누른 순서대로 루틴에 담깁니다.
          </AppText>
        </View>
        <View style={styles.list}>
          {exercises.map((exercise) => (
            <ListRow
              key={exercise.id}
              title={exercise.name}
              subtitle={exercise.category}
              trailing={exerciseIds.includes(exercise.id) ? 'checked' : 'unchecked'}
              onPress={() => toggleExercise(exercise.id)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="저장" disabled={!canSave} onPress={save} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  list: {
    gap: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
});
