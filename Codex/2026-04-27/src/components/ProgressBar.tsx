import { View, StyleSheet } from "react-native";
import { colors } from "@/components/theme";

export function ProgressBar({ value, color = colors.green }: { value: number; color?: string }) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 10, borderRadius: 999, backgroundColor: "#E8EEF6", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 999 }
});
