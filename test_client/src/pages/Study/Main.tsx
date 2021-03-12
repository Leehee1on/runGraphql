import React,{useState,useEffect} from 'react'
import {getPerListApi, getTotalApi} from './api'

import Pagination from '../../components/Pagination'

export default function Main() {
  const [list,setList] = useState<any>([]);
  const [listValue,setListValue] = useState({
    listLength:10,
    index:1,
    content:'',
  })
  const [total,setTotal] = useState<any>({})

  const getList = async () => {
    const response = await getPerListApi(listValue);
    if(response.success) {
      setList(response.data)
    }
  }
  const getTotal = async () => {
    const response = await getTotalApi(listValue);
    if(response.success) {
      // setList(response.data)
      setTotal(response.data)
    }
  }

  useEffect(()=>{
      getList();
      getTotal();
  },[])

  return (
    <div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <table>
        <tbody>
          <tr>
            <td>#</td>
            <td>작성시간</td>
            <td>제목</td>
            <td>글쓴이</td>
            <td />
          </tr>
          {list.length > 0 && list.map((item:any)=> (
            <tr key={item.content_no} style={{display:'flex'}}>
              <td>{item.content_no}</td>
              <td>{item.registered}</td>
              <td>{item.title}</td>
              <td>{item.name}</td>
              <td>상세</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Pagination totalCount={total} getList={getList}/>
    </div>
  )
}
