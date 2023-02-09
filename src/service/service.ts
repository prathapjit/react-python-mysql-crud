import axios from 'axios';

const url = "http://localhost:5000"

const getData = async (endPoint: any, params: any) => {
    let response: any = await axios.get(url + endPoint);
    await console.log("getResult", response);
    return await response.data
}

const postData = async (endPoint: any, params: any) => {
    let req = {
        method: 'POST',
        url: url + endPoint,
        data: params
    }
    let response = await axios.post(url + endPoint+`?params=${JSON.stringify(params)}`, params);
}

const deleteData = async (endPoint:any,params:any) => {
    let response = await axios.delete(url + endPoint,params)
    return await response
}


export const service = {
    get: getData,
    post: postData,
    delete: deleteData
}

