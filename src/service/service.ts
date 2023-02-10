import axios from 'axios';

const url = "http://localhost:5000"

const getData = async (endPoint: any, params: any) => {
    let response: any = await axios.get(url + endPoint);
    await console.log("getResult", response);
    return await response
}

// const generateParams = (obj:any) =>{
//     let final:any
//     Object.keys(obj).forEach((ele:any) =>{

//     })
// }

const postData = async (endPoint: any, params: any) => {
    let generateParams = `?name=${params.name}&age=${params.age}&gender=${params.gender}&city=${params.city}`
    console.log("POST", params)
    let response = await axios.post(url + endPoint + generateParams);
}
const updateData = async (endPoint: any, params: any) => {
    console.log("update",endPoint,params)
    let response = await axios.post(url + endPoint, params)
    return await response
}
const deleteData = async (endPoint: any, params: any) => {
    let response = await axios.delete(url + endPoint, params)
    return await response
}


export const service = {
    get: getData,
    post: postData,
    update: updateData,
    delete: deleteData
}

