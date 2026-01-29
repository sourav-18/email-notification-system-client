import axios from "axios";
const appid = process.env.REACT_APP_SERVER_APP_ID;

export const GetRequest = ({ url, headerData = {} }) => {
    const headers = {
        "Content-Type": "application/json",
        "app-id": appid,
        ...headerData
    }

    const token = localStorage.getItem("token");
    const secretKey = localStorage.getItem("secret-key");
    if (token) {
        headers['Authorization'] = token;
    }
    if (secretKey) {
        headers['secret-key'] = secretKey;
    }

    return axios.get(url, {
        headers: headers
    }).then((data) => data.data).catch((error) => {
        return {
            status: 'error',
            statusCode: 500,
            message: error.response?.data?.message || 'Api Request Failed',
            data: null
        }
    })
}

export const PostRequest = ({ url, headerData = {}, body = {} }) => {
    const headers = {
        "Content-Type": "application/json",
        "app-id": appid,
        ...headerData
    }

    const token = localStorage.getItem("token");
    const secretKey = localStorage.getItem("secret-key");
    if (token) {
        headers['Authorization'] = token;
    }
    if (secretKey) {
        headers['secret-key'] = secretKey;
    }

    return axios.post(url, body, {
        headers: headers
    }).then((data) => data.data).catch((error) => {
        return {
            status: 'error',
            statusCode: 500,
            message: error.response?.data?.message || 'Api Request Failed',
            data: null
        }
    })
}

export const PatchRequest = ({ url, headerData = {}, body = {} }) => {
    const headers = {
        "Content-Type": "application/json",
        "app-id": appid,
        ...headerData
    }

    const token = localStorage.getItem("token");
    const secretKey = localStorage.getItem("secret-key");
    if (token) {
        headers['Authorization'] = token;
    }
    if (secretKey) {
        headers['secret-key'] = secretKey;
    }

    return axios.patch(url, body, {
        headers: headers
    }).then((data) => data.data).catch((error) => {
        return {
            status: 'error',
            statusCode: 500,
            message: error.response?.data?.message || 'Api Request Failed',
            data: null
        }
    })
}

export const PutRequest = ({ url, headerData = {}, body = {} }) => {
    const headers = {
        "Content-Type": "application/json",
        "app-id": appid,
        ...headerData
    }

    const token = localStorage.getItem("token");
    const secretKey = localStorage.getItem("secret-key");
    if (token) {
        headers['Authorization'] = token;
    }
    if (secretKey) {
        headers['secret-key'] = secretKey;
    }

    return axios.put(url, body, {
        headers: headers
    }).then((data) => data.data).catch((error) => {
        return {
            status: 'error',
            statusCode: 500,
            message: error.response?.data?.message || 'Api Request Failed',
            data: null
        }
    })
}