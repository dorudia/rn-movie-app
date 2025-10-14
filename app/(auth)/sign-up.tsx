// import { useSignUp } from "@clerk/clerk-expo";
// import { Link, useRouter } from "expo-router";
// import * as React from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";

// export default function SignUpScreen() {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [pendingVerification, setPendingVerification] = React.useState(false);
//   const [code, setCode] = React.useState("");

//   // Handle submission of sign-up form
//   const onSignUpPress = async () => {
//     if (!isLoaded) return;

//     // Start sign-up process using email and password provided
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       // Send user an email with verification code
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

//       // Set 'pendingVerification' to true to display second form
//       // and capture OTP code
//       setPendingVerification(true);
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   // Handle submission of verification form
//   const onVerifyPress = async () => {
//     if (!isLoaded) return;

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === "complete") {
//         await setActive({ session: signUpAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2));
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   if (pendingVerification) {
//     return (
//       <>
//         <Text>Verify your email</Text>
//         <TextInput
//           value={code}
//           placeholder="Enter your verification code"
//           onChangeText={(code) => setCode(code)}
//         />
//         <TouchableOpacity onPress={onVerifyPress}>
//           <Text>Verify</Text>
//         </TouchableOpacity>
//       </>
//     );
//   }

//   return (
//     <View>
//       <>
//         <Text>Sign up</Text>
//         <TextInput
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Enter email"
//           onChangeText={(email) => setEmailAddress(email)}
//         />
//         <TextInput
//           value={password}
//           placeholder="Enter password"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//         <TouchableOpacity onPress={onSignUpPress}>
//           <Text>Continue</Text>
//         </TouchableOpacity>
//         <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
//           <Text>Already have an account?</Text>
//           <Link href="/sign-in">
//             <Text>Sign in</Text>
//           </Link>
//         </View>
//       </>
//     </View>
//   );
// }

import { useOAuth, useSignUp } from "@clerk/clerk-expo";
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

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = useCallback(async () => {
    try {
      const redirectUrl = Linking.createURL("/(tabs)", { scheme: "myapp" });
      const result = await startOAuthFlow({ redirectUrl });

      if (result.createdSessionId && setActive) {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("Google Sign-Up error:", err);
      Alert.alert("Eroare", "A apărut o problemă la autentificarea cu Google.");
    }
  }, [startOAuthFlow]);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert(
        "Eroare",
        err.errors ? err.errors[0].message : "Sign up failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete" && setActive) {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Eroare", "Verification failed");
    }
  };

  if (!isLoaded || loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#030014]">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center bg-[#030014] px-6">
        <Text className="text-white text-2xl font-bold mb-4">
          Verify your email
        </Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#aaa"
          onChangeText={setCode}
          className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
        />
        <TouchableOpacity
          onPress={onVerifyPress}
          className="bg-blue-600 w-full py-3 rounded-lg mb-4"
        >
          <Text className="text-white font-bold text-center">Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-[#030014] px-6">
      <Text className="text-white text-3xl font-bold mb-6">Sign up</Text>

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#aaa"
        onChangeText={setEmailAddress}
        className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
      />

      <TextInput
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
        className="bg-[#1c1b29] text-white w-full px-4 py-3 rounded-lg mb-4"
      />

      <TouchableOpacity
        onPress={onSignUpPress}
        className="bg-blue-600 w-full py-3 rounded-lg mb-4"
      >
        <Text className="text-white font-bold text-center">
          {loading ? "Loading..." : "Continue"}
        </Text>
      </TouchableOpacity>

      <View className="flex-row mb-6">
        <Text className="text-gray-300">Already have an account? </Text>
        <Link href="/sign-in" asChild>
          <TouchableOpacity>
            <Text className="text-blue-400 font-semibold">Sign in</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* 🔹 Google Sign-Up Button */}
      <TouchableOpacity
        onPress={handleGoogleSignUp}
        className="bg-white w-full py-3 rounded-xl flex-row justify-center items-center"
      >
        <Image
          source={require("../../assets/images/google.png")}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />

        <Text className="text-black font-semibold">Sign up with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
