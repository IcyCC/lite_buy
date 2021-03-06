export const SERVER_URL = 'http://127.0.0.1:10085'

export const getUploadImageUrl = () =>{
    return SERVER_URL+'/files/upload'
}


export const getDonwloadImageUrl = (img) =>{
    return  SERVER_URL+'/files/download/'+img
}

export const checkPassword = (password) => {
    return new Promise((resolve, reject) => {
        if(password === "1111") {
            resolve()
        } else {
            reject()
        }
    })
}