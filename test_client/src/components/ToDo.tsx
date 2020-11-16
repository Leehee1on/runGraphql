import React from 'react';
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

interface todoProps {
  item:any
  id:number
  test:boolean
}

const CHECK_TODO = gql`
  mutation toggleTest($id:Int!) {
   toggleCheckToDo(id: $id, test:$test) @client
  }
`
const ToDo:React.FC<todoProps> = ({item,id,test}) => {
  const [toggleTest] = useMutation(CHECK_TODO, {variables: {id:id, test}})
  return (
    <div  style={{
      padding:10,
      width: '50vw',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    }}>
      <div style={{
        color: test? 'red':'black'
      }}>{item.id}. {item.title}</div> 
      <div style={{
        display:'flex',
        flexDirection:'row',
      }}>

      <button onClick={(e) => toggleTest()}>체크</button>
      <button>삭제</button>
      </div>
    </div>
  );
}

export default ToDo;
