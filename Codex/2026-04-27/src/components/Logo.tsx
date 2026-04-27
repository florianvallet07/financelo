import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/components/theme";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.row}>
      <View style={[styles.mascot, compact && styles.compactMascot]}>
        <Text style={[styles.face, compact && styles.compactFace]}>Fi</Text>
      </View>
      {!compact && (
        <View>
          <Text style={styles.name}>Financelo</Text>
          <Text style={styles.tagline}>La finance, une lecon par jour</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  mascot: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#DDFBEA"
  },
  compactMascot: { width: 38, height: 38, borderRadius: 14, borderWidth: 3 },
  face: { color: colors.white, fontWeight: "900", fontSize: 22 },
  compactFace: { fontSize: 15 },
  name: { fontSize: 28, fontWeight: "900", color: colors.ink, letterSpacing: 0 },
  tagline: { color: colors.muted, fontWeight: "700", marginTop: 2 }
});
