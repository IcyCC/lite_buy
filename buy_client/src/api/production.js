import axios from '@/utils/request'
import {SERVER_URL} from './index'

//获取列表信息（GET）
export const queryProductions = (params) => {
  return axios.post(SERVER_URL+'/productions', { _method: 'GET', _args: params })
}

//删除单条信息
export const deleteProduction = (id) => {
  return axios.delete(SERVER_URL+`/productions/${id}`)
}

//更细单条信息
export const updateProduction = (id, params) => {
  return axios.put(SERVER_URL+`/productions/${id}`, params)
}

//获取单条信息
export const getProduction = (id) => {
  return axios.get(SERVER_URL+`/productions/${id}`)
}

//新增一条数据（POST）
export const createProduction = (params) => {
  return axios.post(SERVER_URL+'/productions', params)
}
