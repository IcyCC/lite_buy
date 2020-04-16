import axios from '@/utils/request'
import {SERVER_URL} from './index'

//获取列表信息（GET）
export const queryEmployments = (params) => {
  return axios.post(SERVER_URL+'/employments', { _method: 'GET', _args: params })
}

//删除单条信息
export const deleteEmployment = (id) => {
  return axios.delete(SERVER_URL+`/employments/${id}`)
}

//更细单条信息
export const updateEmployment = (id, params) => {
  return axios.put(SERVER_URL+`/employments/${id}`, params)
}

//获取单条信息
export const getEmployment = (id) => {
  return axios.get(SERVER_URL+`/employments/${id}`)
}

//新增一条数据（POST）
export const createEmployment = (params) => {
  return axios.post(SERVER_URL+'/employments', params)
}
