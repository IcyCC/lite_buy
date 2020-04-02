export const SERVER_URL = 'http://127.0.0.1:10085'

export const getUploadImageUrl = () =>{
    return SERVER_URL+'/files/upload'
}


export const getDonwloadImageUrl = (img) =>{
    return  SERVER_URL+'/files/download/'+img
}