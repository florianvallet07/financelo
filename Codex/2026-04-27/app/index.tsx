import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@/components/theme";
import { useProgress } from "@/store/progress";

export default function Index() {
  const { progress, isReady } = useProgress();

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.soft }}>
        <ActivityIndicator color={colors.green} />
      </View>
    );
  }

  return <Redirect href={progress.hasOnboarded ? "/(tabs)" : "/onboarding"} />;
}
