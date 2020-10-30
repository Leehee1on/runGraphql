// export let movies = [
//   {
//     id: 1,
//     name: "dummy",
//     score: 17,
//   },
//   {
//     id: 2,
//     name: "dummy1",
//     score: 18,
//   },
//   {
//     id: 3,
//     name: "dummy2",
//     score: 118,
//   },
//   {
//     id: 4,
//     name: "dummy3",
//     score: 182,
//   },
//   {
//     id: 5,
//     name: "dummy4",
//     score: 183,
//   },
//   {
//     id: 0,
//     name: "dummy5",
//     score: 185,
//   },
// ]

// export const getMovies = () => movies

// export const getById = (id) => {
//   const filteredMovies = people.filter((person) => person.id === id)
//   return filteredMovies[0]
// }

// export const deleteMovie = (id) => {
//   const cleanedMovies = movies.filter((movie) => movie.id !== id)
//   if (movies.length > cleanedMovies.length) {
//     movies = cleanedMovies
//     return true
//   } else {
//     return false
//   }
// }

// export const addMovie = (name, score) => {
//   const newMovie = {
//     id: `${movies.length + 1}`,
//     name,
//     score,
//   }
//   movies.push(newMovie)
//   return newMovie
// }

// import fetch from "node-fetch"
// import axios from "axios"
// const API_URL = "https://yts.mx/api/v2/list_movies.json?"
// const BASIC_URL = "https://yts.mx/api/v2/"

// export const getMovies = (limit, rating) => {
//   // return fetch(`${API_URL}`)
//   //   .then((res) => res.json())
//   //   .then((json) => json.data.movies)
//   let REQUEST_URL = API_URL
//   if (limit > 0) {
//     REQUEST_URL += `limit=${limit}`
//   }
//   if (rating > 0) {
//     REQUEST_URL += `minimum_rating=${rating}`
//   }
//   return fetch(`${REQUEST_URL}`)
//     .then((res) => res.json())
//     .then((json) => json.data.movies)
// }

import axios from "axios"
const BASIC_URL = "https://yts.mx/api/v2/"
const LIST_MOVIES_URL = `${BASIC_URL}list_movies.json`
const MOVIE_DETAILS_URL = `${BASIC_URL}movie_details.json`
const MOVIE_SUGGESTIONS_URL = `${BASIC_URL}movie_suggestions.json`

export const getMovies = async (limit, rating) => {
  const {
    data: {
      data: { movies },
    },
  } = await axios(LIST_MOVIES_URL, {
    params: {
      limit,
      minimum_rating: rating,
    },
  })
  return movies
}
export const getMovie = async (id) => {
  const {
    data: {
      data: { movie },
    },
  } = await axios(MOVIE_DETAILS_URL, {
    params: {
      movie_id: id,
    },
  })
  return movie
}
export const getSuggestions = async (id) => {
  const {
    data: {
      data: { movies },
    },
  } = await axios(MOVIE_SUGGESTIONS_URL, {
    params: {
      movie_id: id,
    },
  })
  return movies
}
