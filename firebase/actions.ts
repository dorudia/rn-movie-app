import axios from "axios";

const firebaseUrl =
  "https://react-native-expenses-co-44802-default-rtdb.europe-west1.firebasedatabase.app/movies.json";

export type Movie = {
  id: string | number;
  title: string;
  poster_path: string;
};

export type MovieEntry = {
  searchTerm: string;
  movie_id: string | number;
  title: string;
  count: number;
  poster_url: string;
  isFavorite: boolean;
};

// ⚡ updateSearchCount
export const updateSearchCount = async (
  query: string,
  movie: Movie
): Promise<void> => {
  try {
    const res = await axios.get<{ [key: string]: MovieEntry }>(firebaseUrl);
    const data = res.data || {};

    const existingEntryKey = Object.keys(data).find(
      (key) => data[key].searchTerm === query
    );

    if (existingEntryKey) {
      const existingMovie = data[existingEntryKey];
      await axios.patch(
        `https://react-native-expenses-co-44802-default-rtdb.europe-west1.firebasedatabase.app/movies/${existingEntryKey}.json`,
        { count: existingMovie.count + 1 }
      );
    } else {
      await axios.post(firebaseUrl, {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        isFavorite: false,
      });
    }
  } catch (err) {
    console.log("Eroare updateSearchCount:", err);
    throw err;
  }
};

// ⚡ updateIsFavorite
export const updateIsFavorite = async (
  movieId: string | number,
  movieTitle: string,
  posterUrl: string
): Promise<boolean> => {
  try {
    const res = await axios.get<{ [key: string]: MovieEntry }>(firebaseUrl);
    const data = res.data || {};

    const movieKey = Object.keys(data).find(
      (key) => String(data[key].movie_id) === String(movieId)
    );

    if (movieKey) {
      const existingMovie = data[movieKey];
      const newFavorite = !existingMovie.isFavorite;

      await axios.patch(
        `https://react-native-expenses-co-44802-default-rtdb.europe-west1.firebasedatabase.app/movies/${movieKey}.json`,
        { isFavorite: newFavorite }
      );

      return newFavorite;
    } else {
      await axios.post(firebaseUrl, {
        movie_id: movieId,
        searchTerm: movieTitle,
        title: movieTitle,
        count: 0,
        poster_url: posterUrl,
        isFavorite: true,
      });

      return true;
    }
  } catch (err) {
    console.log("Eroare updateIsFavorite:", err);
    throw err;
  }
};

// ⚡ getTrendingMovies
export const getTrendingMovies = async () => {
  try {
    const res = await axios.get(firebaseUrl);
    const data = res.data || {};

    const moviesArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    moviesArray.sort((a, b) => b.count - a.count);

    return moviesArray.slice(0, 5);
  } catch (err) {
    console.log("Eroare getTrendingMovies:", err);
    throw err;
  }
};

export const fetchFavorites = async (): Promise<MovieEntry[]> => {
  try {
    const res = await axios.get<{ [key: string]: MovieEntry }>(firebaseUrl);
    const data = res.data || {};

    // convertim în array și filtrăm doar favoritele
    const favorites = Object.values(data).filter((movie) => movie.isFavorite);

    return favorites;
  } catch (err) {
    console.log("Eroare la fetchFavorites:", err);
    return [];
  }
};
