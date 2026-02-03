import { PostRequest } from "./api.service";


const baseUrl=process.env.REACT_APP_BASE_URL+"/auth";

export const organizationLogin = async (body) => {
    let apiUrl=baseUrl+"/organizations/login";
    const apiRes=await PostRequest({url:apiUrl,body:body});
    return apiRes;
}

export const organizationSignup = async (body) => {
    let apiUrl=baseUrl+"/organizations/signup";
    const apiRes=await PostRequest({url:apiUrl,body:body});
    return apiRes;
}

export const adminLogin = async (body) => {
    let apiUrl=baseUrl+"/admins/login";
    const apiRes=await PostRequest({url:apiUrl,body:body});
    return apiRes;
}