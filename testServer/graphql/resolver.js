// import { getMovies, getMovie, getSuggestions } from "./db"
import { getToDos,getToDo } from "./db"

const resolver = {
  // Query: {
  //   movies: (_, { limit, rating }) => getMovies(limit, rating),
  //   movie: (_, { id }) => getMovie(id),
  //   suggestions: (_, { id }) => getSuggestions(id),
  // },
  Query: {
    toDos: (_,{}) => getToDos(),
    toDo: (_, { id }) => getToDo(id),
  },
}
export default resolver
