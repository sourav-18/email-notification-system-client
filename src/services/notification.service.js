import { GetRequest, PatchRequest, PostRequest, PutRequest } from "./api.service";


const baseUrl = process.env.REACT_APP_BASE_URL + "/notifications";

const api = {

}

api.sendImmediateNotification = async (body) => {
    let apiUrl = baseUrl + `/send-immediate`;
    const apiRes = await PostRequest({ url: apiUrl,body:body });
    return apiRes;
}

api.getHistory = async (sort, page, limit, search, credential) => {
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
    const apiRes = await GetRequest({ url: apiUrl });
    return apiRes;
}

api.getQueueData = async (sort, page, limit, search, credential) => {
    let apiUrl = baseUrl + `/queues?page=${page}&limit=${limit}`;
    if (sort.field) {
        apiUrl = apiUrl + `&sort=${sort.order == 'desc' ? '-' : ''}${sort.field}`;
    }

    if (search && search.length > 1) {
        apiUrl = apiUrl + `&search=${search}`;
    }

    if (credential && credential != 'All') {
        apiUrl = apiUrl + `&credentialId=${credential}`;
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


export default api;