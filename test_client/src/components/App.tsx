import React from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import { gql } from "apollo-boost"
import { useQuery,useMutation } from "@apollo/react-hooks"
import Header from './Header';
import ToDo from './ToDo'
import './App.css';

// gql 
const GET_TODOS = gql`
  {
    toDos {
      id
      title
      completed
      userId
      test @client
      # gql apollo.tsx 에서 쓸 캐시데이터
    }
  }
`
// gql 
const GET_TODO = gql`
  {
    toDo(id:1) {
      id
      title
      completed
      userId
      test @client
      # gql apollo.tsx 에서 쓸 캐시데이터
    }
  }
`


const App:React.FC = () => {
  // React.FC => React.Functional Component 의 약자 - 써도되고 안써도된다
  const { loading,data} = useQuery(GET_TODOS)
  console.log(data)
  
  return (
    <div className="App">
      <Header length={data?.toDos?.length}/>
      <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}>
      {data?.toDos?.map((todo:any,index:number) => 
        <ToDo item={todo} id={todo.id} key={todo.id} test={todo.test}/>
      )}  
    </div>
    </div>
  );
}

export default App;
