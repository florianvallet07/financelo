import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckCircle2, LockKeyhole, Play } from "lucide-react-native";
import { CourseModule } from "@/types/learning";
import { colors, shadow } from "@/components/theme";
import { ProgressBar } from "@/components/ProgressBar";

export function LessonCard({
  module,
  done,
  locked,
  progress,
  onPress
}: {
  module: CourseModule;
  done: boolean;
  locked: boolean;
  progress: number;
  onPress: () => void;
}) {
  const lesson = module.lessons[0];
  return (
    <Pressable disabled={locked} onPress={onPress} style={({ pressed }) => [styles.card, shadow, pressed && styles.pressed, locked && styles.locked]}>
      <View style={[styles.badge, { backgroundColor: module.color }]}>
        {done ? <CheckCircle2 color={colors.white} size={24} /> : locked ? <LockKeyhole color={colors.white} size={22} /> : <Play color={colors.white} size={22} fill={colors.white} />}
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{module.title}</Text>
        <Text style={styles.summary}>{lesson.summary}</Text>
        <ProgressBar value={progress} color={module.color} />
        <Text style={styles.meta}>{lesson.minutes} min · {lesson.xp} XP</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 14
  },
  pressed: { transform: [{ scale: 0.99 }] },
  locked: { opacity: 0.55 },
  badge: { width: 54, height: 54, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  body: { flex: 1, gap: 8 },
  title: { color: colors.ink, fontSize: 18, fontWeight: "900", letterSpacing: 0 },
  summary: { color: colors.muted, lineHeight: 20, fontWeight: "600" },
  meta: { color: colors.ink, fontWeight: "800", fontSize: 12 }
});
