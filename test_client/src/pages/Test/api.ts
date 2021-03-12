import request from './request';


export const createTodoApi = (content:String) => {
  return request('todo/register','post',{},{content});
}

export const getListApi = () => {
  // return request({url:'list',method:'get',headers:{},jsonData:null});
  return request('todo/list','get',{},null);
}

export const checkTodoApi = (id:number) => {
  return request('todo/check/'+id,'put',{},null);
}

export const editTodoApi = (id:number,content:String) => {
  return request('todo/edit/'+id,'put',{},{content});
}

export const deleteTodoApi = (id:any) => {
  return request('todo/delete/'+id,'delete',{},null);
}

export const serverTest = () => {
  return request('arrTest','post',{},{
    a:{
      b:'c',
      d:1
    },
    list:[1,22,3]
  })
}