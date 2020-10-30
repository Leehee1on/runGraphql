import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import styled from "styled-components"
import Movie from "../components/Movie"
import axios from 'axios'
// 여기다 graphql query문 작성

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`
const Subtitle = styled.h3`
  font-size: 35px;
`
const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`
const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`
const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      title
      isLiked @client
      junggun @client
    }
  }
`

export default () => {
  const { loading, data } = useQuery(GET_MOVIES)
  console.log(loading, data)
  // if (loading) {
  //   return "loading..."
  // }
  // if (data && data.movies) {
  //   return data.movies.map((m) => (
  //     <>
  //       <h1>{m.id}</h1>
  //       <img src={m.medium_cover_image} />
  //     </>
  //   ))
  // }

  const serverState = async () => {
    await axios.get('http://192.168.0.52:49171/api/v1/state/serverState')
    .then((res)=> console.log(res))
    .catch(error=> console.log(error))
  }
  return (
    <Container>
      <Header>
        <Title>Apollo 2020</Title>
        <Subtitle>test</Subtitle>
      </Header>
      {loading && <Loading>Loading</Loading>}
      <Movies>
        {data?.movies?.map((m) => (
          <Movie key={m.id} id={m.id} bg={m.medium_cover_image} isLiked={m.isLiked} junggun={m.junggun} />
        ))}
      </Movies>
    </Container>
  )
}
