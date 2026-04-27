import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProgressProvider } from "@/store/progress";

export default function RootLayout() {
  return (
    <ProgressProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="lesson/[id]" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ProgressProvider>
  );
}
