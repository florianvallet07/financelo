import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Logo } from "@/components/Logo";
import { colors, shadow } from "@/components/theme";
import { Level } from "@/types/learning";
import { useProgress } from "@/store/progress";

const levels: { id: Level; title: string; text: string }[] = [
  { id: "debutant", title: "Debutant", text: "Je veux reprendre les bases sans jargon." },
  { id: "intermediaire", title: "Intermediaire", text: "Je budgete deja et je veux investir mieux." },
  { id: "avance", title: "Avance", text: "Je veux consolider fiscalite, ETF et strategie." }
];

export default function Onboarding() {
  const { setLevel } = useProgress();

  function chooseLevel(level: Level) {
    setLevel(level);
    router.replace("/(tabs)");
  }

  return (
    <LinearGradient colors={["#F4FBF8", "#EAF2FF"]} style={styles.screen}>
      <SafeAreaView style={styles.safe}>
        <Logo />
        <View style={styles.hero}>
          <Text style={styles.kicker}>MVP apprentissage finance</Text>
          <Text style={styles.title}>Deviens meilleur avec ton argent, 5 minutes par jour.</Text>
          <Text style={styles.subtitle}>Choisis ton niveau et Financelo adapte ton chemin de progression.</Text>
        </View>
        <View style={styles.levels}>
          {levels.map((level) => (
            <Pressable key={level.id} onPress={() => chooseLevel(level.id)} style={({ pressed }) => [styles.levelCard, shadow, pressed && styles.pressed]}>
              <Text style={styles.levelTitle}>{level.title}</Text>
              <Text style={styles.levelText}>{level.text}</Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: { flex: 1, padding: 22, justifyContent: "space-between" },
  hero: { marginTop: 40, gap: 12 },
  kicker: { color: colors.green, fontWeight: "900", textTransform: "uppercase", fontSize: 12 },
  title: { color: colors.ink, fontSize: 38, lineHeight: 43, fontWeight: "900", letterSpacing: 0 },
  subtitle: { color: colors.muted, fontSize: 17, lineHeight: 25, fontWeight: "600" },
  levels: { gap: 12, marginBottom: 12 },
  levelCard: { backgroundColor: colors.white, borderRadius: 24, padding: 18, borderWidth: 1, borderColor: colors.line },
  pressed: { transform: [{ scale: 0.99 }] },
  levelTitle: { color: colors.ink, fontSize: 20, fontWeight: "900" },
  levelText: { color: colors.muted, marginTop: 5, fontWeight: "600", lineHeight: 20 }
});
