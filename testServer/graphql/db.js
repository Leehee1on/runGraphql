import axios from "axios"
const BASIC_URL = "https://jsonplaceholder.typicode.com/"
const TODOS = `${BASIC_URL}todos`
// const LIST_MOVIES_URL = `${BASIC_URL}list_movies.json`
// const MOVIE_DETAILS_URL = `${BASIC_URL}movie_details.json`
// const MOVIE_SUGGESTIONS_URL = `${BASIC_URL}movie_suggestions.json`

export const getToDos = async () => {
  const {data} = await axios(TODOS);
  return data
}
export const getToDo = async (id) => {
  const {data} = await axios(TODOS+'/'+id);
  return data
}
// export const getMovies = async (limit, rating) => {
//   const {
//     data: {
//       data: { movies },
//     },
//   } = await axios(LIST_MOVIES_URL, {
//     params: {
//       limit,
//       minimum_rating: rating,
//     },
//   })
//   return movies
// }
// export const getMovie = async (id) => {
//   const {
//     data: {
//       data: { movie },
//     },
//   } = await axios(MOVIE_DETAILS_URL, {
//     params: {
//       movie_id: id,
//     },
//   })
//   return movie
// }
// export const getSuggestions = async (id) => {
//   const {
//     data: {
//       data: { movies },
//     },
//   } = await axios(MOVIE_SUGGESTIONS_URL, {
//     params: {
//       movie_id: id,
//     },
//   })
//   return movies
// }
