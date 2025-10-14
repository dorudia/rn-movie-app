import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-40 relative pl-8">
        <View>
          <Image
            source={{ uri: poster_url }}
            className="w-36 aspect-[2/3] rounded-lg"
            resizeMode="cover"
          />

          <View className="absolute -bottom-2 -left-9 px-2 py-1 rounded-full">
            <MaskedView
              maskElement={
                <View className="flex-row items-center justify-center] rounded-md">
                  <Text className="font-bold text-white text-6xl ">
                    {index}
                  </Text>
                </View>
              }
            >
              <Image
                source={images.rankingGradient}
                className="size-14"
                resizeMode="cover"
              />
            </MaskedView>
          </View>
        </View>

        {/* <Text className="text-sm font-bold mt-2 text-white" numberOfLines={2}>
          {title}
        </Text> */}
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
