import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers: {
    Movie: {
      isLiked: () => false,
      junggun: () => true,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
          },
        })
      },
      toggleJunggunMovie: (_, { id, junggun }, { cache }) => {
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            junggun: !junggun,
          },
        })
      },
    },
  },
})

export default client
