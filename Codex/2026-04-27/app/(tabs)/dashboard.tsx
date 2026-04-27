import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Award, BookOpenCheck, Flame, Star } from "lucide-react-native";
import { ProgressBar } from "@/components/ProgressBar";
import { StatPill } from "@/components/StatPill";
import { colors, shadow } from "@/components/theme";
import { modules } from "@/data/courses";
import { useProgress } from "@/store/progress";

export default function DashboardScreen() {
  const { progress } = useProgress();
  const completed = progress.completedLessons.length;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Ta progression globale et tes recompenses.</Text>

        <View style={[styles.panel, shadow]}>
          <Text style={styles.panelTitle}>{completed}/{modules.length} modules termines</Text>
          <ProgressBar value={completed / modules.length} color={colors.blue} />
          <View style={styles.grid}>
            <StatPill icon={Star} value={`${progress.xp}`} label="XP total" />
            <StatPill icon={Flame} value={`${progress.streak}`} label="jours" />
            <StatPill icon={BookOpenCheck} value={`${completed}`} label="lecons" />
            <StatPill icon={Award} value={`${progress.badges.length}`} label="badges" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.soft },
  content: { padding: 20, paddingBottom: 110 },
  title: { color: colors.ink, fontSize: 34, fontWeight: "900", letterSpacing: 0 },
  subtitle: { color: colors.muted, fontSize: 16, fontWeight: "600", marginTop: 6, marginBottom: 18 },
  panel: { backgroundColor: colors.white, borderRadius: 26, padding: 18, borderWidth: 1, borderColor: colors.line, gap: 14 },
  panelTitle: { color: colors.ink, fontSize: 20, fontWeight: "900" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 }
});
