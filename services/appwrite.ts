// import { Client, Databases, ID, Query } from "react-native-appwrite";

// const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
// const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// const database = new Databases(client);

// export const updateSearchCount = async (query: string, movie: Movie) => {
//   console.log("updateSearchCount apelat");

//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.equal("searchTerm", query),
//     ]);

//     console.log("result:", result);

//     // check if movie already exists in database

//     if (result.documents.length > 0) {
//       // if exists, update count
//       const existingMovie = result.documents[0];
//       await database.updateDocument(
//         DATABASE_ID,
//         COLLECTION_ID,
//         existingMovie.$id,
//         {
//           count: existingMovie.count + 1,
//         }
//       );
//     } else {
//       // if not, create new document
//       await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//         searchTerm: query,
//         movie_id: movie.id,
//         title: movie.title,
//         count: 1,
//         poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// export const getTrendingMovies = async () => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.limit(5),
//       Query.orderDesc("count"),
//     ]);
//     return result.documents;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
