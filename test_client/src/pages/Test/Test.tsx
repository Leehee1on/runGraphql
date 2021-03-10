import React,{useState,useEffect} from 'react'
import {checkTodoApi,createTodoApi,getListApi,deleteTodoApi,editTodoApi} from './api'

export default function Test() {
  const [list,setList] = useState<any>([]);
  const [value,setValue] =useState('');
  const [editValue,setEditValue] = useState('')

  const getList = async () => {
    const response = await getListApi();
    if(response.success) {
      setList(response.data.list);
    }
  }

  const createTodo = async() => {
    if(value === '') return;
    const response = await createTodoApi(value);
    if(response.success) {
      getList();
    }
  }

  const checkTodo = async (id:number) => {
    const response = await checkTodoApi(id);
    if(response.success) {
      getList();
    }
  }

  const editTodo = async (id:number,content:String) => {
    const response = await editTodoApi(id,content);
    if(response.success) {
      getList();
      setEditValue('');
    }
  }
  const deleteTodo = async (id:any) => {
    const response = await deleteTodoApi(id);
    if(response.success) {
      getList();
    }
  }

  const onClickEditMode = (id:number,index:number) => {
    let currentObj:any = list[index];
    if(!currentObj.check) {
      setEditValue(currentObj.content)
      currentObj.edit = !currentObj.edit;
      let filterArr:any = list.filter((item:any) => item.id !== id);
      filterArr.push(currentObj)
      const sortArr = [].concat(filterArr).sort((a, b) => {
        return a['id'] - b['id'];
      });
      setList(sortArr)
      if(currentObj.edit === true) {
      } else {
        editTodo(id,editValue);
      }
    }
  }

  useEffect(()=>{
    getList();
  },[])

  return (
    <div>
      <div style={{display:'flex'}}>
        <input type="text" defaultValue={value} onChange={(e)=>setValue(e.target.value)}/>
        <button onClick={createTodo}>확인</button>
      </div>

      {list?.map((item:any,index:number)=> (
        <div style={{display:'flex',alignItems:'center'}} key={item.id}>
          <div>{item.id}&nbsp;</div>
          {item.edit ? 
          <input style={{width:200}} defaultValue={editValue} onChange={(e)=>setEditValue(e.target.value)}/>
        : 
        <div style={{textDecoration:item.check? 'line-through':'none',width:200}}>{item.content}</div>
        }
          <div style={{padding:'10px'}} onClick={()=>onClickEditMode(item.id,index)}>{item.edit? "⭕️":"✏️"} </div>
          <div style={{padding:'10px'}} onClick={()=>checkTodo(item.id)}>✅</div>
          <div style={{padding:'10px'}} onClick={()=>deleteTodo(item._id)}>❌</div>
        </div>
      ))}
    </div>
  )
}
