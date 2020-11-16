import ApolloClient from "apollo-boost"

const client:any = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers: {
    // 쿼리에 정의한 타입
    ToDo: {
      test: () => false,
      subTitle: () => '',
      // 캐시 내부에 쓸 데이터 (전역으로 쓸 수 있다 정도)
    },
    Mutation: {
      // 내부에서 쓸 함수
      toggleCheckToDo: (_, { id, test }, { cache }) => {
        cache.writeData({
          id: `ToDo:${id}`,
          data: {
            test: !test,
          },
        })
      },
      createToDo: (_,{subTitle},{cache}) => {
        cache.writeData({
          data: {
            title: subTitle,
          }
        })
      }
      
    },
  },
})

export default client
