import React,{useState,useEffect} from 'react'
import {getPerListApi, getTotalApi} from './api'
import {Link} from 'react-router-dom'

import Pagination from '../../components/Pagination'
import './study.css'

export default function Main(props:any) {
  const [list,setList] = useState<any>([]);
  const [listValue,setListValue] = useState({
    listLength:3,
    index:1,
    content:'',
  })
  const [total,setTotal] = useState<any>({})

  const getList = async (index:number) => {
    const response = await getPerListApi({...listValue,index:index});
    if(response.success) {
      setList(response.data)
    }
  }
  const getTotal = async () => {
    const response = await getTotalApi(listValue);
    if(response.success) {
      setTotal(response.data)
    }
  }

  useEffect(()=>{
      getList(1);
      getTotal();
  },[])

  return (
    <div>
      <div className="main">
        <Link to="/create" style={{paddingTop:20}}>글쓰기</Link>
        <table className="main_table">
          <tbody>
            <tr>
              <td>#</td>
              <td>제목</td>
              <td>글쓴이</td>
              <td>작성시간</td>
              <td />
            </tr>
            {list.length > 0 && list.map((item:any)=> (
              <tr key={item.content_no} >
                <td>{item.content_no}</td>
                <td>{item.title} ({item.comment_count})</td>
                <td>{item.name}</td>
                <td>{item.registered}</td>
                <td>
                  <Link to={"/detail/"+item.content_no}>상세</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalCount={total} getList={getList}/>
    </div>
  )
}
