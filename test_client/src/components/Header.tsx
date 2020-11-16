import React from 'react'
import { gql } from "apollo-boost"
import { useQuery,useMutation } from "@apollo/react-hooks"

const CREATE_TODO = gql`
  mutation createTodo($title:String!) {
    createTodo(title: $title) {
      title
    }
  }
`

export default function Header({length}:any) {
  const [isTodo,setIsTodo] = React.useState(false)
  const [isTitle,setIsTitle]  = React.useState('')
  const [createTodo,{data}] = useMutation(CREATE_TODO, {variables: {id: length+1,title:isTitle}})

    return (
        <div style={styles.container}>
          {isTodo ? 
            <>
              <input value={isTitle} onChange={(e)=> setIsTitle(e.target.value) } />
              <button 
                onClick={()=>{
                  setIsTodo(false)
                createTodo({variables:{id: length+1 ,title:isTitle}})
                }}>
                확인
              </button>
                  
            </>
            :
            <div onClick={() => setIsTodo(true)}>New ToDo +</div>
          }
            {/* <div>Completed ToDo / {data.toDos.length}</div> */}
        </div>
    )
}

const styles: any = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fafafa',
        height: 50,
        padding: '10px 30px'
    }
}
