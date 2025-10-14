// import { useOAuth, useSignIn } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { Link, useRouter } from "expo-router";
// import * as WebBrowser from "expo-web-browser";
// import { useCallback, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignInScreen() {
//   const router = useRouter();
//   const { signIn, setActive, isLoaded } = useSignIn();

//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Google Sign-In setup (ultima versiune)
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleGoogleSignIn = useCallback(async () => {
//     try {
//       const redirectUrl = Linking.createURL("/(tabs)", { scheme: "myapp" }); // ⚠️ înlocuiește 'myapp' cu schema din app.json

//       const result = await startOAuthFlow({ redirectUrl });

//       if (result.createdSessionId) {
//         if (setActive) {
//           await setActive({ session: result.createdSessionId });
//         }
//         router.replace("/(tabs)");
//       }
//     } catch (err) {
//       console.error("Google Sign-In error:", err);
//       Alert.alert("Eroare", "A apărut o problemă la autentificarea cu Google.");
//     }
//   }, [startOAuthFlow]);

//   // ✅ Email/password Sign-In
//   const onSignInPress = useCallback(async () => {
//     if (!isLoaded) return;

//     try {
//       setLoading(true);
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       if (signInAttempt.status === "complete") {
//         await setActive({ session: signInAttempt.createdSessionId });
//         router.replace("/(tabs)");
//       } else {
//         console.error(JSON.stringify(signInAttempt, null, 2));
//         Alert.alert("Eroare", "Autentificare incompletă.");
//       }
//     } catch (err: any) {
//       Alert.alert(
//         "Eroare",
//         err.errors ? err.errors[0].message : "Autentificare eșuată"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [isLoaded, emailAddress, password]);

//   if (!isLoaded) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#030014]">
//         <ActivityIndicator size="large" color="#fff" />
//         <Text className="text-white mt-4">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 justify-center items-center bg-[#030014] px-6">
//       <Text className="text-white text-3xl font-bold mb-6">Sign in</Text>

//       <TextInput
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         placeholderTextColor="#aaa"
//         onChangeText={setEmailAddress}
//         className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
//       />

//       <TextInput
//         value={password}
//         placeholder="Enter password"
//         placeholderTextColor="#aaa"
//         secureTextEntry
//         onChangeText={setPassword}
//         className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
//       />

//       <TouchableOpacity
//         onPress={onSignInPress}
//         disabled={loading}
//         className="bg-blue-600 w-full py-3 rounded-lg mb-4"
//       >
//         <Text className="text-white font-bold text-center">
//           {loading ? "Loading..." : "Continue"}
//         </Text>
//       </TouchableOpacity>

//       <View className="flex-row mb-6">
//         <Text className="text-gray-300">Don't have an account? </Text>
//         <Link href="/sign-up" asChild>
//           <TouchableOpacity>
//             <Text className="text-blue-400 font-semibold">Sign up</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>

//       {/* 🔹 Google Sign-In Button */}
//       <TouchableOpacity
//         onPress={handleGoogleSignIn}
//         className="bg-white w-full py-3 rounded-xl flex-row justify-center items-center"
//       >
//         <Image
//           source={{
//             uri: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png",
//           }}
//           style={{ width: 20, height: 20, marginRight: 8 }}
//         />
//         <Text className="text-black font-semibold">Sign in with Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// import { useOAuth, useSignIn, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { Link, useRouter } from "expo-router";
// import * as WebBrowser from "expo-web-browser";
// import { useCallback, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignInScreen() {
//   const router = useRouter();
//   const { signIn, setActive, isLoaded } = useSignIn();
//   const { isSignedIn, user } = useUser();

//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Google Sign-In (ultima versiune)
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleGoogleSignIn = useCallback(async () => {
//     try {
//       const redirectUrl = Linking.createURL("/(tabs)", { scheme: "myapp" }); // schimbă 'myapp' cu schema din app.json
//       const result = await startOAuthFlow({ redirectUrl });

//       if (result.createdSessionId && setActive) {
//         await setActive({ session: result.createdSessionId });
//         router.replace("/(tabs)");
//       }
//     } catch (err) {
//       console.error("Google Sign-In error:", err);
//       Alert.alert("Eroare", "A apărut o problemă la autentificarea cu Google.");
//     }
//   }, [startOAuthFlow]);

//   // ✅ Email/password Sign-In
//   const onSignInPress = useCallback(async () => {
//     if (!isLoaded) return;

//     try {
//       setLoading(true);
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       if (signInAttempt.status === "complete") {
//         await setActive({ session: signInAttempt.createdSessionId });
//         router.replace("/(tabs)");
//       } else {
//         console.error(JSON.stringify(signInAttempt, null, 2));
//         Alert.alert("Eroare", "Autentificare incompletă.");
//       }
//     } catch (err: any) {
//       Alert.alert(
//         "Eroare",
//         err.errors ? err.errors[0].message : "Autentificare eșuată"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [isLoaded, emailAddress, password]);

//   // 🔹 Loading until Clerk is ready or redirecting if already signed in
//   if (!isLoaded || (isSignedIn && user)) {
//     // if (isSignedIn) router.replace("/(tabs)");
//     return (
//       <View className="flex-1 justify-center items-center bg-[#030014]">
//         <ActivityIndicator size="large" color="#fff" />
//         <Text className="text-white mt-4">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 justify-center items-center bg-[#030014] px-6">
//       <Text className="text-white text-3xl font-bold mb-6">Sign in</Text>

//       <TextInput
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         placeholderTextColor="#aaa"
//         onChangeText={setEmailAddress}
//         className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
//       />

//       <TextInput
//         value={password}
//         placeholder="Enter password"
//         placeholderTextColor="#aaa"
//         secureTextEntry
//         onChangeText={setPassword}
//         className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
//       />

//       <TouchableOpacity
//         onPress={onSignInPress}
//         disabled={loading}
//         className="bg-blue-600 w-full py-3 rounded-lg mb-4"
//       >
//         <Text className="text-white font-bold text-center">
//           {loading ? "Loading..." : "Continue"}
//         </Text>
//       </TouchableOpacity>

//       <View className="flex-row mb-6">
//         <Text className="text-gray-300">Don't have an account? </Text>
//         <Link href="/sign-up" asChild>
//           <TouchableOpacity>
//             <Text className="text-blue-400 font-semibold">Sign up</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>

//       {/* 🔹 Google Sign-In Button */}
//       <TouchableOpacity
//         onPress={handleGoogleSignIn}
//         className="bg-white w-full py-3 rounded-xl flex-row justify-center items-center"
//       >
//         <Image
//           source={{
//             uri: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png",
//           }}
//           style={{ width: 20, height: 20, marginRight: 8 }}
//         />
//         <Text className="text-black font-semibold">Sign in with Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// import { useOAuth, useSignIn, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { Link, useRouter } from "expo-router";
// import * as WebBrowser from "expo-web-browser";
// import { useCallback, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignInScreen() {
//   const router = useRouter();
//   const { signIn, setActive, isLoaded } = useSignIn();
//   const { isSignedIn, user } = useUser();

//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Google Sign-In setup
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleGoogleSignIn = useCallback(async () => {
//     try {
//       const redirectUrl = Linking.createURL("/(tabs)", { scheme: "myapp" }); // schimbă 'myapp' cu schema ta

//       const result = await startOAuthFlow({ redirectUrl });

//       if (result.createdSessionId && setActive) {
//         await setActive({ session: result.createdSessionId });
//       }
//       router.replace("/(tabs)");
//     } catch (err) {
//       console.error("Google Sign-In error:", err);
//       Alert.alert("Eroare", "A apărut o problemă la autentificarea cu Google.");
//     }
//   }, [startOAuthFlow]);

//   // Email/password Sign-In
//   const onSignInPress = useCallback(async () => {
//     if (!isLoaded) return;

//     try {
//       setLoading(true);
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       if (signInAttempt.status === "complete") {
//         await setActive({ session: signInAttempt.createdSessionId });
//         router.replace("/(tabs)");
//       } else {
//         console.error(JSON.stringify(signInAttempt, null, 2));
//         Alert.alert("Eroare", "Autentificare incompletă.");
//       }
//     } catch (err: any) {
//       Alert.alert(
//         "Eroare",
//         err.errors ? err.errors[0].message : "Autentificare eșuată"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [isLoaded, emailAddress, password]);

//   // 🔹 Așteptăm ca Clerk să încarce complet sesiunea și user-ul
//   if (!isLoaded || (isSignedIn && !user)) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#030014]">
//         <ActivityIndicator size="large" color="#fff" />
//         <Text className="text-white mt-4">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 justify-center items-center bg-[#030014] px-6">
//       <Text className="text-white text-3xl font-bold mb-6">Sign in</Text>

//       <TextInput
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         placeholderTextColor="#aaa"
//         onChangeText={setEmailAddress}
//         className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
//       />

//       <TextInput
//         value={password}
//         placeholder="Enter password"
//         placeholderTextColor="#aaa"
//         secureTextEntry
//         onChangeText={setPassword}
//         className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
//       />

//       <TouchableOpacity
//         onPress={onSignInPress}
//         disabled={loading}
//         className="bg-blue-600 w-full py-3 rounded-lg mb-4"
//       >
//         <Text className="text-white font-bold text-center">
//           {loading ? "Loading..." : "Continue"}
//         </Text>
//       </TouchableOpacity>

//       <View className="flex-row mb-6">
//         <Text className="text-gray-300">Don't have an account? </Text>
//         <Link href="/sign-up" asChild>
//           <TouchableOpacity>
//             <Text className="text-blue-400 font-semibold">Sign up</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>

//       {/* Google Sign-In Button */}
//       <TouchableOpacity
//         onPress={handleGoogleSignIn}
//         className="bg-white w-full py-3 rounded-xl flex-row justify-center items-center"
//       >
//         <Image
//           source={{
//             uri: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png",
//           }}
//           style={{ width: 20, height: 20, marginRight: 8 }}
//         />
//         <Text className="text-black font-semibold">Sign in with Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setLoading(true);
      const redirectUrl = Linking.createURL("/(tabs)", { scheme: "myapp" });
      const result = await startOAuthFlow({ redirectUrl });

      if (result.createdSessionId && setActive) {
        await setActive({ session: result.createdSessionId });

        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("Google Sign-In error:", err);
      Alert.alert("Eroare", "A apărut o problemă la autentificarea cu Google.");
    } finally {
      setLoading(false);
    }
  }, [startOAuthFlow]);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const attempt = await signIn.create({ identifier: email, password });

      if (attempt.status === "complete" && setActive) {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        Alert.alert("Eroare", "Autentificare incompletă.");
      }
    } catch (err: any) {
      Alert.alert(
        "Eroare",
        err.errors ? err.errors[0].message : "Autentificare eșuată"
      );
    } finally {
      setLoading(false);
    }
  }, [isLoaded, email, password]);

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#030014]">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#030014]">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-[#030014] px-6">
      <Text className="text-white text-3xl font-bold mb-6">Sign in</Text>

      <TextInput
        autoCapitalize="none"
        value={email}
        placeholder="Enter email"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry
        placeholderTextColor="#aaa"
        onChangeText={setPassword}
        className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
      />

      <TouchableOpacity
        onPress={onSignInPress}
        disabled={loading}
        className="bg-blue-600 w-full py-3 rounded-lg mb-4"
      >
        <Text className="text-white font-bold text-center">
          {loading ? "Loading..." : "Continue"}
        </Text>
      </TouchableOpacity>

      <View className="flex-row mb-6">
        <Text className="text-gray-300">Don't have an account? </Text>
        <Link href="/sign-up" asChild>
          <TouchableOpacity>
            <Text className="text-blue-400 font-semibold">Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity
        onPress={handleGoogleSignIn}
        className="bg-white w-full py-3 rounded-xl flex-row justify-center items-center"
      >
        <Image
          source={require("../../assets/images/google.png")}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />

        <Text className="text-black font-semibold">Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
