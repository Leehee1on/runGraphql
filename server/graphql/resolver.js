// import { getMovies, getById, addMovie, deleteMovie } from "./db"
// 쿼리에 접근하려면 schema.graphql의 값을 맞춰줘야 한다
// name , name 이런식으로 그래야 불러올 수 있음
// const resolver = {
//   Query: {
//     movies: () => getMovies(),
//     movie: (_, { id }) => getById(id),
//   },
//   Mutation: {
//     addMovie: (_, { name, score }) => addMovie(name, score),
//     deleteMovie: (_, { id }) => deleteMovie(id),
//   },
// }
// 아직 강의까진 객체를 리턴할 수는 없고 , 원하는 정보들을 갖고올수 있다
// person { age } 이런식으로

// 실습
import { getMovies, getMovie, getSuggestions } from "./db"

const resolver = {
  Query: {
    movies: (_, { limit, rating }) => getMovies(limit, rating),
    movie: (_, { id }) => getMovie(id),
    suggestions: (_, { id }) => getSuggestions(id),
  },
}
export default resolver
