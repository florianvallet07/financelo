import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Flame, Star, Trophy } from "lucide-react-native";
import { LessonCard } from "@/components/LessonCard";
import { Logo } from "@/components/Logo";
import { ProgressBar } from "@/components/ProgressBar";
import { StatPill } from "@/components/StatPill";
import { colors } from "@/components/theme";
import { modules } from "@/data/courses";
import { useProgress } from "@/store/progress";

export default function HomeScreen() {
  const { progress } = useProgress();
  const completed = progress.completedLessons.length;
  const globalProgress = completed / modules.length;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Logo compact />
          <View>
            <Text style={styles.hello}>Salut, investisseur</Text>
            <Text style={styles.level}>Niveau {progress.level}</Text>
          </View>
        </View>

        <View style={styles.daily}>
          <Text style={styles.dailyTitle}>Objectif du jour</Text>
          <Text style={styles.dailyText}>Termine une lecon courte pour proteger ton streak et gagner des XP.</Text>
          <ProgressBar value={globalProgress} />
          <View style={styles.stats}>
            <StatPill icon={Flame} value={`${progress.streak}`} label="streak" />
            <StatPill icon={Star} value={`${progress.xp}`} label="XP" />
            <StatPill icon={Trophy} value={`${progress.badges.length}`} label="badges" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Parcours Financelo</Text>
        {modules.map((module, index) => {
          const lesson = module.lessons[0];
          const done = progress.completedLessons.includes(lesson.id);
          const previousDone = index === 0 || progress.completedLessons.includes(modules[index - 1].lessons[0].id);
          return (
            <LessonCard
              key={module.id}
              module={module}
              done={done}
              locked={!previousDone}
              progress={done ? 1 : previousDone ? 0.25 : 0}
              onPress={() => router.push(`/lesson/${lesson.id}`)}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.soft },
  content: { padding: 20, paddingBottom: 110 },
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 18 },
  hello: { color: colors.ink, fontSize: 22, fontWeight: "900" },
  level: { color: colors.muted, fontWeight: "700" },
  daily: { backgroundColor: colors.ink, borderRadius: 28, padding: 20, marginBottom: 22, gap: 12 },
  dailyTitle: { color: colors.white, fontSize: 24, fontWeight: "900" },
  dailyText: { color: "#D1D5DB", fontWeight: "600", lineHeight: 21 },
  stats: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  sectionTitle: { color: colors.ink, fontSize: 22, fontWeight: "900", marginBottom: 12 }
});
