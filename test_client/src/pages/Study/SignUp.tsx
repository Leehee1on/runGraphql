import React,{useState} from 'react'
import {signUpApi} from './api'

const SignUp = (props:any) => {
  const [info,setInfo] = useState({
    id:'',
    password:'',
    name:'',
    age:0,
  })

  const signUp = async () => {
    const response = await signUpApi(info)
    if(response.success) {
      // props.history.push("/signIn");
      alert('회원가입 완료')
    }
  }

  return (
    <div className="sign_up">
      <div>
        <div>아이디</div>
        <input type="text" defaultValue={info.id} onChange={(e)=>setInfo({...info,id:e.target.value})}/>
      </div>
      <div>
        <div>비밀번호</div>
        <input type="password" defaultValue={info.password} onChange={(e)=>setInfo({...info,password:e.target.value})}/>
      </div>
      <div>
        <div>이름</div>
        <input type="text" defaultValue={info.name} onChange={(e)=>setInfo({...info,name:e.target.value})}/>
      </div>
      <div>
        <div>나이</div>
        <input type="number" defaultValue={info.age} onChange={(e)=>setInfo({...info,age:Number(e.target.value)})}/>
      </div>
      <button onClick={signUp}>회원가입</button>
    </div>
  )
}
export default SignUp