import axios from '@/utils/request'
import {SERVER_URL} from './index'

//获取列表信息（GET）
export const queryKinds = (params) => {
  return axios.post(SERVER_URL+'/kinds', { _method: 'GET', _args: params })
}

//删除单条信息
export const deleteKind = (id) => {
  return axios.delete(SERVER_URL+`/kinds/${id}`)
}

//更细单条信息
export const updateKind = (id, params) => {
  return axios.put(SERVER_URL+`/kinds/${id}`, params)
}

//获取单条信息
export const getKind = (id) => {
  return axios.get(SERVER_URL+`/kinds/${id}`)
}

//新增一条数据（POST）
export const createKind = (params) => {
  return axios.post(SERVER_URL+'/kinds', params)
}
