import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
// import { updateSearchCount } from "@/services/appwrite";
import { updateSearchCount } from "@/firebase/actions";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  console.log(searchQuery);

  const {
    data: movies,
    loading,
    refetch,
    reset,
    error,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const myTimeout = setTimeout(async function RefetchMovies() {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(myTimeout);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-[#030014]">
      <Image
        source={images.bg}
        className="absolute flex-1 w-full z-0"
        resizeMode="cover"
        blurRadius={10}
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ gap: 10, justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 54 }}
        className="flex-1 px-5"
        ListHeaderComponent={
          <>
            {/* <View className="w-full flex-row justify-center mt-6">
              <Image source={icons.logo} className="w-12 h-10" />
            </View> */}
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#5656ff"
                className="my-3"
              />
            )}
            {error && <Text className="text-red-500">Error</Text>}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white text-lg mb-2">
                Search results for{" "}
                <Text className="font-bold">"{searchQuery}"</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <>
            {searchQuery.trim() === "" && (
              <Text className="text-white text-lg mb-2">
                Please enter a search term
              </Text>
            )}
            {searchQuery.trim() !== "" && movies?.length === 0 && (
              <>
                <Text className="text-white text-lg mb-2">
                  Sorry, no movies found
                </Text>
                <Text className="text-white text-lg mb-2">
                  Try something else
                </Text>
              </>
            )}
          </>
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
