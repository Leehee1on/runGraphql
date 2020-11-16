import resolver from "./graphql/resolver"
import { GraphQLServer } from "graphql-yoga"
// 여기에 세팅
// 서버를 시작하는곳
const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers: resolver,
})

server.start(() => console.log("Graphql Server Running on http://localhost:4000"))