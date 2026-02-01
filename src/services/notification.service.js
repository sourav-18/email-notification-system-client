import { GetRequest, PatchRequest, PostRequest, PutRequest } from "./api.service";


const baseUrl = process.env.REACT_APP_BASE_URL + "/notifications";

const api = {

}

api.sendNotification = async (body) => {
    let apiUrl = baseUrl + `/send`;
    const apiRes = await PostRequest({ url: apiUrl, body: body });
    return apiRes;
}

api.getHistory = async (sort, page, limit, search, credential, status) => {
    let apiUrl = baseUrl + `/histories?page=${page}&limit=${limit}`;
    if (sort.field) {
        apiUrl = apiUrl + `&sort=${sort.order == 'desc' ? '-' : ''}${sort.field}`;
    }

    if (search && search.length > 1) {
        apiUrl = apiUrl + `&search=${search}`;
    }

    if (credential && credential != 'All') {
        apiUrl = apiUrl + `&credentialId=${credential}`;
    }
    if (status && status != 'All') {
        apiUrl = apiUrl + `&status=${status}`;
    }
    const apiRes = await GetRequest({ url: apiUrl });
    return apiRes;
}

api.getQueueData = async (sort, page, limit, search, credential, status) => {
    let apiUrl = baseUrl + `/queues?page=${page}&limit=${limit}`;
    if (sort.field) {
        apiUrl = apiUrl + `&sort=${sort.order == 'desc' ? '-' : ''}${sort.field}`;
    }

    if (search && search.length > 1) {
        apiUrl = apiUrl + `&search=${search}`;
    }

    if (status && status != 'All') {
        apiUrl = apiUrl + `&status=${status}`;
    }
    
    const apiRes = await GetRequest({ url: apiUrl });
    return apiRes;
}

api.getDetailsById = async (id) => {
    let apiUrl = baseUrl + `/histories/${id}`;
    const apiRes = await GetRequest({ url: apiUrl });
    return apiRes;
}

api.getQueueDetailsById = async (id) => {
    let apiUrl = baseUrl + `/queues/${id}`;
    const apiRes = await GetRequest({ url: apiUrl });
    return apiRes;
}

api.cancel = async (id) => {
    let apiUrl = baseUrl + `/queues/cancel/${id}`;
    const apiRes = await PutRequest({ url: apiUrl });
    return apiRes;
}


export default api;