import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  poster_url,
  title,
  vote_average,
  release_date,
}: any) => {
  // alege poster-ul
  const poster =
    poster_url ||
    (poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`) ||
    "https://placehold.co/600x400/1a1a1a/FFFFFF.png";

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[48%] mb-4 border border-[#9d9d9d5f] rounded-lg p-1">
        <Image
          source={{ uri: poster }}
          className="w-full aspect-[2/3] rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold">
              {Math.round(vote_average / 2)}
            </Text>
          </View>
          <Text className="text-xs text-white font-medium">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
