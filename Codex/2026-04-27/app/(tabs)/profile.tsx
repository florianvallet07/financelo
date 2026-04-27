import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RotateCcw } from "lucide-react-native";
import { AuthPanel } from "@/components/AuthPanel";
import { Logo } from "@/components/Logo";
import { colors, shadow } from "@/components/theme";
import { useProgress } from "@/store/progress";

export default function ProfileScreen() {
  const { progress, resetProgress } = useProgress();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Logo />
        <View style={[styles.card, shadow]}>
          <Text style={styles.title}>Profil</Text>
          <Text style={styles.line}>Niveau: {progress.level}</Text>
          <Text style={styles.line}>XP: {progress.xp}</Text>
          <Text style={styles.line}>Streak: {progress.streak} jour(s)</Text>
        </View>
        <View style={[styles.card, shadow]}>
          <AuthPanel />
        </View>
        <Pressable onPress={resetProgress} style={({ pressed }) => [styles.reset, pressed && styles.pressed]}>
          <RotateCcw color={colors.danger} size={20} />
          <Text style={styles.resetText}>Reinitialiser la progression locale</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.soft },
  content: { padding: 20, gap: 16 },
  card: { backgroundColor: colors.white, borderRadius: 24, padding: 18, borderWidth: 1, borderColor: colors.line, gap: 8 },
  title: { color: colors.ink, fontSize: 28, fontWeight: "900" },
  line: { color: colors.muted, fontWeight: "700", lineHeight: 21 },
  reset: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: "#FECACA", backgroundColor: "#FEF2F2" },
  pressed: { transform: [{ scale: 0.99 }] },
  resetText: { color: colors.danger, fontWeight: "900" }
});
