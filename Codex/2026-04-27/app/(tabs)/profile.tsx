import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Mail, RotateCcw, ShieldCheck } from "lucide-react-native";
import { AuthPanel } from "@/components/AuthPanel";
import { Logo } from "@/components/Logo";
import { colors, shadow } from "@/components/theme";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useProgress } from "@/store/progress";

export default function ProfileScreen() {
  const { progress, resetProgress } = useProgress();

  async function resetOnboarding() {
    await AsyncStorage.multiRemove(["onboardingCompleted", "userGoal", "userLevel", "userXP"]);
    resetProgress();
    router.replace("/onboarding");
  }

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

        <View style={[styles.card, shadow]}>
          <View style={styles.row}>
            <ShieldCheck color={isSupabaseConfigured ? colors.green : colors.gold} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Backend Supabase</Text>
              <Text style={styles.line}>{isSupabaseConfigured ? "Configure et pret pour Auth + DB." : "Mode local actif. Ajoute tes cles Supabase dans app.json."}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Mail color={colors.blue} />
            <Text style={styles.line}>Auth email / Google prevue via Supabase Auth.</Text>
          </View>
        </View>

        <Pressable onPress={resetProgress} style={({ pressed }) => [styles.reset, pressed && styles.pressed]}>
          <RotateCcw color={colors.danger} size={20} />
          <Text style={styles.resetText}>Reinitialiser la progression locale</Text>
        </Pressable>

        <Pressable onPress={resetOnboarding} style={({ pressed }) => [styles.resetOnboarding, pressed && styles.pressed]}>
          <RotateCcw color={colors.ink} size={20} />
          <Text style={styles.resetOnboardingText}>Reinitialiser onboarding</Text>
        </Pressable>
      </View>
    </SafeAreaView>
