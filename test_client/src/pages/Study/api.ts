import request from '../Test/request';

export const signUpApi = (content:any) => {
  return request('user/signUp','post',{},{content});
}
export const signInApi = (info:any) => {
  return request('user/signIn','post',{},info);
}

export const tokenStateApi = (token:any) => {
  return request('user/refresh','post',{Authorization:token},{});
}

export const getListApi = () => {
  return request('content/list','get',{},{})
}

export const getPerListApi = (listValue:any) => {
  return request('content/perList','post',{},listValue)
}

export const getTotalApi = (listValue:any) => {
  return request('content/totalPage','post',{},listValue)
}