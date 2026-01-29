import { GetRequest, PatchRequest, PostRequest, PutRequest } from "./api.service";


const baseUrl=process.env.REACT_APP_BASE_URL+"/organizations";

const api={

}

api.addCredential = async (body) => {
    let apiUrl=baseUrl+"/credentials";
    const apiRes=await PostRequest({url:apiUrl,body:body});
    return apiRes;
}

api.getCredential = async () => {
    let apiUrl=baseUrl+"/credentials";
    const apiRes=await GetRequest({url:apiUrl});
    return apiRes;
}

api.getCredentialForFilter = async () => {
    let apiUrl=baseUrl+"/credentials-for-filter";
    const apiRes=await GetRequest({url:apiUrl});
    return apiRes;
}

api.credentialStatusUpdate = async (id,status) => {
    let apiUrl=baseUrl+`/credentials/${id}/status/${status}`;
    const apiRes=await PatchRequest({url:apiUrl});
    return apiRes;
}

api.editCredential = async (id,body) => {
    let apiUrl=baseUrl+`/credentials/${id}`;
    const apiRes=await PutRequest({url:apiUrl,body:body});
    return apiRes;
}

export default api;

