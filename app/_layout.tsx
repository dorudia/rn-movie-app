import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { LogBox, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
LogBox.ignoreLogs(["SafeAreaView has been deprecated"]);

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="movies/[id]"
            options={{
              // headerShown: true implicit
              headerTintColor: "#e7e7e7",
              headerStyle: { backgroundColor: "#0a063d" },
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          {/* <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} /> */}
        </Stack>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
