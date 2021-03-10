import React from 'react'
import { gql } from "apollo-boost"
import { useQuery,useMutation } from "@apollo/react-hooks"
import request from './request'
import './user.css';

const ALL_USER = gql`
query {
  allUser {
    _id
    name
    gender
    age
  }
}
`
const GET_USER = gql`
  query getUser($id: ID!) {
      getUser(_id:$id) {
        name
        age
        gender
      }
    }
`
const CREATE_USER = gql`
  mutation createUser($input:UserInput) {
    createUser(input: $input) {
      name
      gender
      age
    }
  }
`
const DELETE_USER = gql`
  mutation deleteUser($id:ID!) {
    deleteUser(_id: $id) {
      name
      gender
      age
    }
  }
`

const registerApi = async (data:any) => {
  return request('register', 'post', {}, data);
}
const listApi = async () => {
  return request('list', 'get', {}, null);
}
const detailApi = async (data:any) => {
  return request('getUsr', 'post', {}, data);
}
const deleteApi = async (data:any) => {
  return request('deleteUsr/'+data, 'delete', {}, null);
}

      // # test @client
      // # gql apollo.tsx 에서 쓸 캐시데이터

interface Props {
  id:any,
  setVisible:Function,
  setUserId:Function
};

const UserComponent = ({id,setVisible,setUserId}:Props) => {
  // const {loading,data} = useQuery(GET_USER,{variables:{id}})
  const [editMode,setEditMode] = React.useState(false);
  const [detail,setDetail] = React.useState({
    _id:'',
    name:'',
    age:'',
    gender:''
  });

  const getDetail = async (id:string) => {
    const response = await detailApi(id);
    if(response.success) {
      setDetail(response.data)
    }
  }
  React.useEffect(() => {
    getDetail(id);
  }, []);
  
  return (
    <div className="detail_wrapper">
      <div className="detail_row">
        <div>상세정보</div>
        <div onClick={()=>{
          setVisible(false);
          setUserId("");
          }}>X</div>
      </div>
      <br/>
        <div>{detail?._id}</div>
        <div>{detail?.name}</div>
        <div>{detail?.age}</div>
        <div>{detail?.gender}</div>
      {editMode ? <>
        {/* <div>{data?.getUser._id}</div>
        <div>{data?.getUser.name}</div>
        <div>{data?.getUser.age}</div>
        <div>{data?.getUser.gender}</div> */}
      </> : <>
        {/* <div>{data?.getUser._id}</div>
        <div>{data?.getUser.name}</div>
        <div>{data?.getUser.age}</div>
        <div>{data?.getUser.gender}</div> */}
      </>}
    </div>
  )
}

const CreateUser = () => {
  const [createUser,{data}] = useMutation(CREATE_USER);
  const [userData,setUserData] = React.useState({
    name:'',
    age:0,
    gender:'',
    id:0
  })
  
  const onSubmit = async () => {
    if(userData.name !== "" &&userData.gender !== "" ) {
      await createUser({variables:{input:userData}})
      setUserData({
        name:'',
        age:0,
        gender:'',
        id:0
      })
      return alert('등록됨')
    }
  }
  const onClickRegister = async () => {
    const response = await registerApi(userData)
  }

  return (
    <div className="detail_wrapper">
      <div className="detail_row">
        <div>정보입력</div>
      </div>
      <br/>
      <div>
        id : 
        <input type="number" value={userData.id} onChange={(e)=>setUserData({...userData, id:Number(e.target.value)})}/>
      </div>
      <div>
        name : 
        <input  value={userData.name} onChange={(e)=>setUserData({...userData, name:e.target.value})}/>
      </div>
      <div>
        age :
        <input type="number" value={userData.age} onChange={(e)=>setUserData({...userData, age:Number(e.target.value)})}/>
        </div>
      <div>
        gender :
        <input  value={userData.gender} onChange={(e)=>setUserData({...userData, gender:e.target.value})}/>
      </div>
      <div onClick={onClickRegister}>등록</div>
    </div>
  )
}

export default function User() {
  const { loading,data } = useQuery(ALL_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [userId,setUserId] = React.useState('');
  const [visible,setVisible] = React.useState(false);
  const [list,setList] = React.useState([]);
  
  const onClickDetail = (id:any) => {
    setUserId(id);
    setVisible(true);
  }
  const onClickDelete = async(id:any) => {
    const response = await deleteApi(id);
  }
  const getList = async () => {
    const response = await listApi();
    setList(response.data)
  }
  const getDetail = async (id:string) => {
    const response = await detailApi(id);
    if(response.success) {
      setVisible(true)
      setUserId(id)
    }
  }
  React.useEffect(()=>{
    getList();
  },[])
 

  return (
    <div>
      <div style={{display:'flex'}}>
      <CreateUser />
      <div className="user">
        <div style={{width:'50%'}}>
          {data?.allUser.map((user:any)=> 
            <div key={user._id} className="user_wrapper">
              <div className="user_age">{user.age}</div>
              <div className="user_name">{user.name}</div>
              <div className="user_gender">{user.gender}</div>
              <div className="user_detail" onClick={()=>onClickDetail(user._id)}>상세</div>
              <div className="user_delete" onClick={()=>console.log(user._id)}>삭제</div>
            </div>
          )}
        </div>
        {userId !== "" && visible && <UserComponent id={userId}  setVisible={setVisible} setUserId={setUserId}/>}
      </div>
    
      </div>
        {list.length > 0 && 
        list.map((userList:any,index:number)=>
          <div key={index}>{userList._id}
            <br/> {userList.name}
            <div className="user_detail" onClick={()=>getDetail(userList._id)}>상세</div>
            <div className="user_delete" onClick={()=>onClickDelete(userList._id)}>삭제</div>
          </div>
          )}
    </div>
  )
}
