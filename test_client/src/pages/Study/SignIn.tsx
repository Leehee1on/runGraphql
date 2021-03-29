import React,{useState,useEffect} from 'react'
import {signInApi} from './api'
import * as Cookies from 'js-cookie'

export default function SignIn(props:any) {
  const [info,setInfo] = useState({
    id:'',
    password:'',
  })

  const signIn = async () => {
    const response = await signInApi(info)
    if(response.success) {
      Cookies.set('x_auth',response.token)
      props.history.push("/main");
    }
  }
  return (
    <div className="sign_in">
      <div>
        <div>아이디</div>
        <input type="text" defaultValue={info.id} onChange={(e)=>setInfo({...info,id:e.target.value})}/>
      </div>
      <div>
        <div>비밀번호</div>
        <input type="password" defaultValue={info.password} onChange={(e)=>setInfo({...info,password:e.target.value})}/>
      </div>
      <button onClick={signIn}>로그인하기</button>
    </div>
  )
}
