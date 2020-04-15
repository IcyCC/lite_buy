import axios from '@/utils/request'
import {SERVER_URL} from './index'

//获取列表信息（GET）
export const queryExperts = (params) => {
  return axios.post(SERVER_URL+'/experts', { _method: 'GET', _args: params })
}

//删除单条信息
export const deleteExpert = (id) => {
  return axios.delete(SERVER_URL+`/experts/${id}`)
}

//更细单条信息
export const updateExpert = (id, params) => {
  return axios.put(SERVER_URL+`/experts/${id}`, params)
}

//获取单条信息
export const getExpert = (id) => {
  return axios.get(SERVER_URL+`/experts/${id}`)
}

//新增一条数据（POST）
export const createExpert = (params) => {
  return axios.post(SERVER_URL+'/experts', params)
}
