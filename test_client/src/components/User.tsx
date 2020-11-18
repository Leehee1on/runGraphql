import React from 'react'
import { gql } from "apollo-boost"
import { useQuery,useMutation } from "@apollo/react-hooks"

const GET_USER = gql`
{
  allUser {
    name
    gender
    age
  }
}
`

export default function User() {
  const { loading,data } = useQuery(GET_USER)
  console.log('data')
  console.log(data)

  return (
    <div>
      
    </div>
  )
}
