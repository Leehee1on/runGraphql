import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const LIKE_MOVIE = gql`
  mutation toggleMovie($id: Int!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`
const UNLIKE_JUNGGUN = gql`
  mutation toggle($id: Int!) {
    toggleJunggunMovie(id: $id,junggun: $junggun) @client
  }
`
const Container = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`

export default ({ id, bg, isLiked,junggun }) => {
  const [toggleMovie] = useMutation(LIKE_MOVIE, { variables: { id: parseInt(id), isLiked } })
  const [toggle] = useMutation(UNLIKE_JUNGGUN, { variables: { id: parseInt(id), junggun } })
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={toggleMovie}>{isLiked ? "Unlike" : "Like"}</button>
      <button onClick={toggle}>{junggun ? "1" : "2"}</button>
    </Container>
  )
}
