import { icons } from "@/constants/icons";
import { MovieEntry, updateIsFavorite } from "@/firebase/actions";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const firebaseUrl =
  "https://react-native-expenses-co-44802-default-rtdb.europe-west1.firebasedatabase.app/movies.json";

const MovieDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data: movie, loading }: any = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  // 🔹 fetch isFavorite la mount
  useEffect(() => {
    if (!movie) return;

    const fetchFavorite = async () => {
      try {
        const res = await axios.get<{ [key: string]: MovieEntry }>(firebaseUrl);
        const data = res.data || {};

        // forțăm tipul la MovieEntry
        const movieEntry = Object.values(data).find(
          (item: MovieEntry) => String(item.movie_id) === String(movie.id)
        );

        if (movieEntry) setIsFavorite(movieEntry.isFavorite);
      } catch (err) {
        console.log("Eroare fetch isFavorite:", err);
      }
    };

    fetchFavorite();
  }, [movie]);

  const toggleFavorite = async () => {
    if (!movie) return;

    const newValue = await updateIsFavorite(
      movie.id,
      movie.title,
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );
    setIsFavorite(newValue);
  };

  useLayoutEffect(() => {
    if (movie) {
      navigation.setOptions({
        title: movie.title,
        headerBackTitle: "Back", // textul butonului back
        headerStyle: { backgroundColor: "#0a063d" },
        headerTintColor: "#e7e7e7",
        headerRight: () => (
          <TouchableOpacity onPress={toggleFavorite} className="mx-2">
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              size={28}
              color="#fc4343"
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [movie, isFavorite]);

  // useLayoutEffect(() => {
  //   if (movie) {
  //     navigation.setOptions({
  //       title: movie.title,
  //       headerBackTitleVisible: false,
  //       headerBackTitle: "",
  //       headerBackTitleStyle: { display: "none" },
  //       headerStyle: {
  //         flex: 1,
  //         backgroundColor: "#0a063d",
  //       },
  //       headerTintColor: "#e7e7e7",
  //       headerTitleStyle: { fontWeight: "bold" },
  //       headerRight: () => (
  //         <TouchableOpacity
  //           className="flex-row items-center mx-2"
  //           onPress={toggleFavorite}
  //         >
  //           <Ionicons
  //             name={isFavorite ? "star" : "star-outline"}
  //             size={28}
  //             color="#fc4343"
  //           />
  //         </TouchableOpacity>
  //       ),
  //     });
  //   }
  // }, [movie, isFavorite]);

  interface MovieInfoProps {
    label: string;
    value?: string | number | null;
  }

  const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="justify-center mt-3">
      <View className="bg-[#ffffff29] py-1 px-8 rounded-md items-center max-w-fit">
        <Text className="text-[#d2d2d2] text-sm ">{label}</Text>
      </View>
      <Text className="text-[#cfcfcf] text-lg font-bold mt-2 flex-row">
        {value || "N/A"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#030014]">
      <View className="flex-1 bg-[#030014] px-4 py-3">
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Image
              className="w-full aspect-[2/3]"
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
            />
          </View>
          <View className="flex-col items-start justify-center mt-4 px-5">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <View className="flex-row items-center gap-x-4 mt-2">
              <Text className="text-white">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-white">{movie?.runtime}m</Text>
            </View>
            <View className="flex-row items-center px-2 py-1 rounded-md gap-x-1 mt-2 bg-[#1c2044]">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white font-bold">
                {Math.round(movie?.vote_average ?? 0)} / 10
              </Text>
              <Text className="text-white">({movie?.vote_count}) votes</Text>
            </View>
            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={
                movie?.genres?.map((g: any) => g.name).join(" - ") || "N/A"
              }
            />
            <View className="flex-row items-center gap-x-4 mt-2">
              <MovieInfo
                label="Budget"
                value={`$${(movie?.budget / 1_000_000).toFixed(2)} million`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${(movie?.revenue / 1000000).toFixed(2)} million`}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetails;

// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import { useLocalSearchParams, useNavigation } from "expo-router";
// import { useEffect, useLayoutEffect, useState } from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// // 🔹 Exemplu fetch
// const firebaseUrl = "https://your-firebase-url";

// interface MovieEntry {
//   movie_id: string;
//   isFavorite: boolean;
// }

// export default function MovieDetails() {
//   const { id } = useLocalSearchParams();
//   const navigation = useNavigation();
//   const [movie, setMovie] = useState<any>(null);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Fetch movie details
//   useEffect(() => {
//     const fetchMovie = async () => {
//       const res = await axios.get(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_KEY`
//       );
//       setMovie(res.data);
//     };
//     fetchMovie();
//   }, [id]);

//   // Fetch favorite from Firebase
//   useEffect(() => {
//     if (!movie) return;
//     const fetchFavorite = async () => {
//       const res = await axios.get<{ [key: string]: MovieEntry }>(firebaseUrl);
//       const data = res.data || {};
//       const movieEntry = Object.values(data).find(
//         (item) => String(item.movie_id) === String(movie.id)
//       );
//       if (movieEntry) setIsFavorite(movieEntry.isFavorite);
//     };
//     fetchFavorite();
//   }, [movie]);

//   const toggleFavorite = async () => {
//     // logic actualizare favorite în Firebase
//     setIsFavorite(!isFavorite);
//   };

//   useLayoutEffect(() => {
//     if (movie) {
//       navigation.setOptions({
//         title: movie.title,
//         headerBackTitle: "Back",
//         headerRight: () => (
//           <TouchableOpacity onPress={toggleFavorite} className="mx-2">
//             <Ionicons
//               name={isFavorite ? "star" : "star-outline"}
//               size={28}
//               color="#fc4343"
//             />
//           </TouchableOpacity>
//         ),
//       });
//     }
//   }, [movie, isFavorite]);

//   if (!movie) return <Text>Loading...</Text>;

//   return (
//     <ScrollView className="flex-1 bg-[#030014] px-4 py-3">
//       <Image
//         className="w-full aspect-[2/3]"
//         source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
//       />
//       <Text className="text-white font-bold text-xl mt-4">{movie.title}</Text>
//       <Text className="text-white mt-1">{movie.release_date}</Text>
//       <Text className="text-white mt-1">{movie.runtime}m</Text>
//       <View className="flex-row items-center mt-2 gap-x-2">
//         <Ionicons name="star" size={16} color="#fc4343" />
//         <Text className="text-white">{movie.vote_average} / 10</Text>
//       </View>
//     </ScrollView>
//   );
// }
