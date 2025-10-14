import { Image, TextInput, View } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View
      className="flex-row items-center bg-[#181f5f] rounded-full px-5 max-w-[95%] mx-auto my-4"
      style={{
        shadowColor: "#ffffff", // culoarea umbrei
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8, // pentru Android
      }}
    >
      <Image
        source={icons.search}
        className="w-5 h-5 mt-[2px]"
        resizeMode="contain"
        tintColor="#cfbdfc"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-[#f2f2f2] text-md flex-row items-center py-3 text-xl justify-center"
        placeholderTextColor="#f2f2f2"
      />
    </View>
  );
};

export default SearchBar;
