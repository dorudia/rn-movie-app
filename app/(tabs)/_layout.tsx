import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
// import { icons, images } from "@/constants";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TabIcon = ({ icon, text, focused }: any) => {
  if (focused) {
    return (
      <View
        // source={images.highlight}
        className="flex-1 flex-row bg-slate-300 min-h-[50px]  min-w-[85px]  items-center justify-center mt-5 rounded-xl overflow-hidden"
      >
        {/* <Image
          source={icon}
          tintColor="#151312"
          className="size-5"
          resizeMode="contain"
        /> */}
        <Text className="text-secondary text-base font-semibold">{text}</Text>
      </View>
    );
  }
  return (
    <View className="size-full justify-center mt-4 items-center rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-6" />
    </View>
  );
};

const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#09022a" }}>
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
        blurRadius={10}
      />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            position: "absolute",
            borderRadius: 10,
            // marginHorizontal: 12,
            elevation: 0,
            backgroundColor: "#1e1b3ef7",
            height: 50,
            borderTopWidth: 0,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.home} focused={focused} text="Home" />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.search} focused={focused} text="Search" />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.save} focused={focused} text="Saved" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.person} focused={focused} text="Profile" />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default Layout;
