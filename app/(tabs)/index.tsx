import MovieCard from "@/components/MovieCard";
// import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import { images } from "@/constants/images";
import { getTrendingMovies } from "@/firebase/actions";
import useFetch from "@/services/useFetch";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { fetchMovies } from "../../services/api";

export default function Index() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Așteptăm să se încarce starea autentificării
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in"); // navigăm doar după ce Clerk e gata
    }
  }, [isLoaded, isSignedIn]);

  const {
    data: trandingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies); // @ts-ignore

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  if (!isLoaded || !isSignedIn) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View className="flex-1 flex-col bg-[#030014] ">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
        blurRadius={10}
      />
      <ScrollView
        className="flex-1 px-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 52 }}
      >
        {/* <Image source={icons.logo} className="w-12 h-10 mt-6 mb-5 mx-auto" /> */}
        {moviesLoading && (
          <View className="flex-1 flex-row items-center justify-center">
            {/* <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            /> */}
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>
            Error:{" "}
            {moviesError?.message ||
              trendingError?.message ||
              "Something went wrong"}
          </Text>
        ) : (
          <View className="flex-1 ">
            {/* <Pressable onPress={() => router.push("/search")}>
              <SearchBar placeholder="Search" />
            </Pressable> */}

            <View className="mt-6">
              <Text className="text-white text-xl font-bold">
                Trending Movies
              </Text>
              <FlatList
                data={trandingMovies}
                renderItem={({ item, index }) => {
                  // console.log(item);
                  // @ts-ignore
                  return <TrendingCard movie={item} index={index + 1} />;
                }}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-5"
                ItemSeparatorComponent={() => <View className="w-6" />}
              />
            </View>

            <>
              <Text className="text-white text-xl font-bold mt-4">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard className="text-white" {...item} />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                className="mt-5"
                columnWrapperStyle={{
                  justifyContent: "space-between",
                }}
                scrollEnabled={false}
                numColumns={2}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
