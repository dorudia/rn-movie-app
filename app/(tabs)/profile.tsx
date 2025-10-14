// import { SignOutButton } from "@/components/SignOutButton";
// import { useUser } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";
// import { useEffect } from "react";
// import { Text, View } from "react-native";

// const ProfileScreen = () => {
//   const router: any = useRouter();
//   const { user } = useUser();

//   useEffect(() => {
//     console.log("User:", user);
//   }, [user]);

//   // if (!user) {
//   //   // evităm hook-urile și UI-ul până când user-ul e încărcat
//   //   return null;
//   // }

//   return (
//     <View className="flex-1 justify-center items-center bg-[#030014] px-4">
//       <Text className="text-white text-2xl font-bold mb-4">Profile Page</Text>
//       <Text className="text-white text-xl mb-4">
//         Email: {user?.emailAddresses[0].emailAddress}
//       </Text>
//       {/* <TouchableOpacity
//         className="bg-red-500 px-6 py-3 rounded-md"
//         onPress={() => console.log("logout")}
//       >
//         <Text className="text-white font-bold">Logout</Text>
//       </TouchableOpacity> */}
//       <SignOutButton />
//     </View>
//   );
// };

// export default ProfileScreen;

import { SignOutButton } from "@/components/SignOutButton";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const ProfileScreen = () => {
  const router = useRouter();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded) {
      console.log("User:", user);
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#030014]">
        <Text className="text-white text-lg">Loading user...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-[#030014] px-4">
      <Text className="text-white text-3xl font-bold mb-4">Your Profile</Text>
      <Text className="text-white text-xl mb-4">
        Nume: {user?.fullName ?? "Fără nume"}
      </Text>
      <Text className="text-white text-xl mb-4 w-full text-center">
        Email: {user?.emailAddresses[0]?.emailAddress}
      </Text>

      {/* {user?.imageUrl && (
        <Text className="text-white text-sm mb-4">
          Imagine: {user.imageUrl}
        </Text>
      )} */}
      <SignOutButton />
    </View>
  );
};

export default ProfileScreen;
