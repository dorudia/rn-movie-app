import { fetchFavorites, MovieEntry } from "@/firebase/actions";
import { Link, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState<MovieEntry[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const getFavorites = async () => {
        const data = await fetchFavorites();
        setFavorites([...data].reverse());
      };
      getFavorites();
    }, [])
  );

  return (
    <View className="flex-1 bg-[#030014] px-4 py-3">
      <Text className="text-white text-xl py-2 font-bold mb-4">
        Favorite Movies
      </Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.movie_id)}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <Link href={`/movies/${item.movie_id}`} asChild>
            <TouchableOpacity className="w-[31%] aspect-[2/3] mb-10 border border-[#9d9d9d5f] rounded-md">
              <Image
                source={{ uri: item.poster_url }}
                className="w-[100%] aspect-[2/3]  rounded-md"
              />
              <Text
                className="text-white font-bold mt-2 text-center"
                numberOfLines={1}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default FavoriteScreen;
