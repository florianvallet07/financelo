import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Chrome, Mail } from "lucide-react-native";
import { colors } from "@/components/theme";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export function AuthPanel() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "financelo://auth/callback" }
    });
    setLoading(false);
    Alert.alert(error ? "Connexion impossible" : "Email envoye", error?.message ?? "Verifie ta boite mail pour continuer.");
  }

  async function signInWithGoogle() {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "financelo://auth/callback" }
    });
    if (error) Alert.alert("Google indisponible", error.message);
  }

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.text}>
        {isSupabaseConfigured ? "Connecte un compte pour synchroniser la progression." : "Ajoute tes cles Supabase pour activer email et Google."}
      </Text>
      <TextInput
        editable={isSupabaseConfigured && !loading}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="email@exemple.com"
        style={styles.input}
      />
      <View style={styles.actions}>
        <Pressable disabled={!isSupabaseConfigured || !email || loading} onPress={signInWithEmail} style={[styles.button, (!isSupabaseConfigured || !email || loading) && styles.disabled]}>
          <Mail color={colors.white} size={18} />
          <Text style={styles.buttonText}>Email</Text>
        </Pressable>
        <Pressable disabled={!isSupabaseConfigured} onPress={signInWithGoogle} style={[styles.google, !isSupabaseConfigured && styles.disabled]}>
          <Chrome color={colors.ink} size={18} />
          <Text style={styles.googleText}>Google</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: 10 },
  title: { color: colors.ink, fontSize: 18, fontWeight: "900" },
  text: { color: colors.muted, fontWeight: "700", lineHeight: 21 },
  input: { minHeight: 50, borderRadius: 16, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 14, color: colors.ink, backgroundColor: colors.white, fontWeight: "700" },
  actions: { flexDirection: "row", gap: 10 },
  button: { flex: 1, minHeight: 50, borderRadius: 16, backgroundColor: colors.green, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  google: { flex: 1, minHeight: 50, borderRadius: 16, backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: colors.line, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  disabled: { opacity: 0.45 },
  buttonText: { color: colors.white, fontWeight: "900" },
  googleText: { color: colors.ink, fontWeight: "900" }
});
