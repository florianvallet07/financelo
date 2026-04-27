import { Tabs } from "expo-router";
import { BarChart3, Home, UserRound } from "lucide-react-native";
import { colors } from "@/components/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: "#98A2B3",
        tabBarStyle: { height: 72, paddingBottom: 12, paddingTop: 10, borderTopColor: colors.line },
        tabBarLabelStyle: { fontWeight: "800" }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Accueil", tabBarIcon: ({ color }) => <Home color={color} size={22} /> }} />
      <Tabs.Screen name="dashboard" options={{ title: "Stats", tabBarIcon: ({ color }) => <BarChart3 color={color} size={22} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profil", tabBarIcon: ({ color }) => <UserRound color={color} size={22} /> }} />
    </Tabs>
  );
}
