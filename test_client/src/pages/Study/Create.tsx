import React,{useState} from 'react'
import {createContentApi} from './api'

const Create = (props:any) => {
  const [info,setInfo] = useState({
    title:'',
    content:'',
  });

  const createContent = async () => {
    const response = await createContentApi(info);

    if(response.success) {
      alert('글쓰기 완료');
      props.history.goBack();
    }
  }

  return (
    <div className="create">
      <div>
        <div>제목</div>
        <input type="text" defaultValue={info.title} onChange={(e)=> setInfo({...info,title:e.target.value})}/>
      </div>
      <div>
        <div>내용</div>
        <input type="text" defaultValue={info.content} onChange={(e)=> setInfo({...info,content:e.target.value})}/>
      </div>
      <button onClick={createContent}>글쓰기</button>

    </div>
  )
}

export default Create;