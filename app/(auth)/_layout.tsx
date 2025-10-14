// import { useAuth } from "@clerk/clerk-expo";
// import { Redirect, Stack, useNavigation } from "expo-router";
// import { useLayoutEffect } from "react";

// export default function AuthRoutesLayout() {
//   const { isSignedIn } = useAuth();
//   const navigation = useNavigation();

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });
//   }, []);

//   if (isSignedIn) {
//     return <Redirect href={"/"} />;
//   }

//   return <Stack />;
// }

// import { useAuth, useUser } from "@clerk/clerk-expo";
// import { Redirect, Stack, useNavigation } from "expo-router";
// import { useLayoutEffect } from "react";
// import { ActivityIndicator, Text, View } from "react-native";

// export default function AuthRoutesLayout() {
//   const { isSignedIn, isLoaded } = useAuth();
//   const { user } = useUser();
//   const navigation = useNavigation();

// useLayoutEffect(() => {
//   navigation.setOptions({
//     headerShown: false,
//   });
// }, []);

//   if (!isLoaded || (isSignedIn && !user)) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#030014]">
//         <ActivityIndicator size="large" color="#fff" />
//         <Text className="text-white mt-4">Loading...</Text>
//       </View>
//     );
//   }

//   if (isSignedIn) {
//     return <Redirect href={"/"} />;
//   }

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
//       <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
//     </Stack>
//   );
// }

import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function AuthLayout() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  // Așteptăm să se încarce atât auth-ul cât și user-ul
  if (!authLoaded || !userLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#030014]">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  // Dacă user-ul e deja logat, redirect
  if (isSignedIn && user) {
    return <Redirect href="/(tabs)" />;
  }

  // Altfel afișăm Stack-ul pentru ecranele SignIn/SignUp
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerTitleAlign: "center",
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: "#020113",
        },
        headerTitleStyle: { color: "#fff" },
        headerTintColor: "#fff",
      }}
    />
  );
}
