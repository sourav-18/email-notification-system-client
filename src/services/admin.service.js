import { GetRequest, PatchRequest, PostRequest, PutRequest } from "./api.service";

const baseUrl = process.env.REACT_APP_BASE_URL + "/admin";

const api = {
    organization: {},
    credential: {},
    notification: {},
};

api.organization.list = async (page, limit, sort, search, status) => {
    let apiUrl = baseUrl + `/organizations?page=${page}&limit=${limit}`;

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

api.organization.statusUpdate = async (id, status) => {
    let apiUrl = baseUrl + `/organizations/${id}/status/${status}`;
    const apiRes = await PatchRequest({ url: apiUrl });
    return apiRes;
}

api.organization.add = async (body) => {
    let apiUrl = baseUrl + "/organizations";
    const apiRes = await PostRequest({ url: apiUrl, body: body });
    return apiRes;
}

api.credential.list = async (page, limit, sort, search, status) => {
    let apiUrl = baseUrl + `/organizations/credentials?page=${page}&limit=${limit}`;

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

api.credential.statusUpdate = async (id, status) => {
    let apiUrl = baseUrl + `/organizations/credentials/${id}/status/${status}`;
    const apiRes = await PatchRequest({ url: apiUrl });
    return apiRes;
}

api.notification.getHistoryList = async (sort, page, limit, search, status) => {
    let apiUrl = baseUrl + `/notifications/histories?page=${page}&limit=${limit}`;
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

api.notification.getQueueList = async (sort, page, limit, search, status) => {
    let apiUrl = baseUrl + `/notifications/queues?page=${page}&limit=${limit}`;
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

export default api;