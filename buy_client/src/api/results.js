import axios from '@/utils/request'

//获取列表信息（GET）
export const queryResults = (params) => {
  return axios.post(SERVER_URL+'/results', { _method: 'GET', _args: params })
}

//删除单条信息
export const deleteResult = (id) => {
  return axios.delete(SERVER_URL+`/results/${id}`)
}

//更细单条信息
export const updateResult = (id, params) => {
  return axios.put(SERVER_URL+`/results/${id}`, params)
}

//获取单条信息
export const getResult = (id) => {
  return axios.get(SERVER_URL+`/results/${id}`)
}

//新增一条数据（POST）
export const createResult = (params) => {
  return axios.post(SERVER_URL+'/results', params)
}
