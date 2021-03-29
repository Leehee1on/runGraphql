import Cookies from 'js-cookie';
import request from '../Test/request';


export const signUpApi = (info:any) => {
  return request('user/signUp','post',{},info);
}
export const signInApi = (info:any) => {
  return request('user/signIn','post',{},info);
}

export const tokenStateApi = (token:any) => {
  return request('user/refresh','post',{Authorization:token},{});
}

// 
export const getListApi = () => {
  return request('content/list','get',{},{})
}

export const getPerListApi = (listValue:any) => {
  return request('content/perList','post',{},listValue)
}

export const getTotalApi = (listValue:any) => {
  return request('content/totalPage','post',{},listValue)
}

export const createContentApi = (info:any) => {
  const token = Cookies.get('x_auth')
  return request('content/register','post',{Authorization:token},info)
}

export const detailApi = (content_no:String) => {
  const token = Cookies.get('x_auth')
  return request('content/detail/'+ content_no,'get',{},{})
}

export const editApi = (info:any,content_no:String) => {
  const token = Cookies.get('x_auth')
  return request('content/edit/'+ content_no,'put',{Authorization:token},info)
}

export const deleteApi = (content_no:String) => {
  const token = Cookies.get('x_auth')
  return request('content/delete/'+ content_no,'put',{Authorization:token},{})
}

export const createCommentApi = (content_no:String,comment:String) => {
  const token = Cookies.get('x_auth')
  return request('comment/register','post',{Authorization:token},{content_no:content_no,comment:comment})
}

export const getCommentListApi = (listValue:any) => {
  return request('comment/perList','post',{},listValue)
}
export const getCommentTotalApi = (listValue:any) => {
  return request('comment/totalPage','post',{},listValue)
}
