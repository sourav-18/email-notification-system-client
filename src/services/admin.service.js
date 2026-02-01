import { GetRequest, PutRequest } from "./api.service";

const baseUrl = process.env.REACT_APP_BASE_URL + "/admin";

const api = {
    organization: {},
};

api.organization.list = async (page,limit,search) => {
    let apiUrl = baseUrl + `/organizations?page=${page}&limit=${limit}`;

    if (search && search.length > 1) {
        apiUrl = apiUrl + `&search=${search}`;
    }

    const apiRes = await GetRequest({ url: apiUrl });
    return apiRes;
}

api.organization.statusUpdate = async (id, status) => {
    let apiUrl = baseUrl + `/organizations/${id}/status/${status}`;
    const apiRes = await PutRequest({ url: apiUrl });
    return apiRes;
}

export default api;