import React, { useState, useEffect } from 'react';
import { detailApi, editApi,deleteApi,getCommentListApi,getCommentTotalApi,createCommentApi } from './api';
import {Link} from 'react-router-dom'

import Pagination from '../../components/Pagination'

const Detail = (props: any) => {
  const { content_no } = props.match?.params;
  const [detail, setDetail] = useState({
    title: '',
    content: '',
    name: '',
    edit:false,
    comment_count:0
  });
  const [edit,setEdit] = useState(false);
  const [list, setList] = useState([]);
  const [listValue,setListValue] = useState({
    listLength:3,
    index:1,
    content:'',
  })
  const [comment,setComment] = useState('')
  const [total,setTotal] = useState<any>({})


  const getDetail = async () => {
    const response = await detailApi(content_no);
    if (response.success) {
      setDetail({...response.data,edit:response.edit});
    }
  };
  const editContent = async () => {
    setEdit(!edit);
    if(edit) {
      const response = await editApi(detail,content_no);
      if(response.success) {
        alert('수정완료')
      } 
    }
  }

  const deleteContent = async () => {
      const response = await deleteApi(content_no);
      if(response.success) {
        alert('삭제완료')
        props.history.goBack();
    }
  }
  const getCommentList = async (index:number) => {
    const response = await getCommentListApi({...listValue,index:index,content_no:content_no})
    if(response.success) {
      setList(response.data)
    }
  }
  const getTotalList = async (index:number) => {
    const response = await getCommentTotalApi({...listValue,index:index,content_no:content_no})
    if(response.success) {
      setTotal(response.data)
    }
  }
  const createComment = async () => {
    const response = await createCommentApi(content_no,comment);
    if(response.success) {
      getCommentList(1)
      getTotalList(1)
      getDetail()
    }
  }

  useEffect(() => {
    getDetail();
    getCommentList(1)
    getTotalList(1)
  }, []);

  return (
    <div style={{padding: '5% 20%'}}>
      {detail.edit && 
      <>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 10 }} onClick={editContent}>
        수정
      </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 10 }} onClick={deleteContent}>
        삭제
      </div>
      </>
      }
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
        <div>제목 : 
        {edit? 
        <input type="text" defaultValue={detail.title} onChange={(e)=> setDetail({...detail,title:e.target.value})} />
        :
        detail.title}</div>
        <div>글쓴이 : {detail.name}</div>
      </div>
      <div>
        <div>내용</div>
        {edit? 
        <input type="text" defaultValue={detail.content} onChange={(e)=> setDetail({...detail,content:e.target.value})} />
        :
        detail.content}
      </div>

      <div style={{padding:'20px 0'}}>댓글 - ({detail.comment_count})</div>
      {list.length !== 0 && 
      
      <table className="comment_table">
        <tbody>
          <tr>
            <td>#</td>
            <td>댓글</td>
            <td>글쓴이</td>
            <td>작성시간</td>
          </tr>
          {list.length > 0 && list.map((item: any) => (
            <tr key={item.comment_no} >
              <td>{item.comment_no}</td>
              <td>{item.comment}</td>
              <td>{item.name}</td>
              <td>{item.registered}</td>
            </tr>
          ))}
        </tbody>
      </table>
      }
      {list.length !== 0 && <Pagination totalCount={total} getList={getCommentList}/>}

      <div style={{padding:10}}/>
      <input type="text" defaultValue={comment} onChange={(e)=> setComment(e.target.value)}/>
      <button onClick={createComment}>등록</button>
    </div>
  );
};

export default Detail;