import { LucideIcon } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/components/theme";

export function StatPill({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <View style={styles.pill}>
      <Icon size={18} color={colors.blue} strokeWidth={2.5} />
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    minWidth: 104,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  value: { color: colors.ink, fontSize: 16, fontWeight: "900" },
  label: { color: colors.muted, fontSize: 11, fontWeight: "700" }
});
