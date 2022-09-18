import axios from "axios";

const url = `http://localhost:8081/users`
const url_login = `http://localhost:8081/login`

export async function getUser(page, size, search, status, startDate, endDate) {

    const response = await DG_axios.get(url, {
        params: {
            page: page ? page : null,
            size: size ? size : null,
            search: search ? search : null,
            status: status ? status : null,
            startDate: startDate ? startDate : null,
            endDate: endDate ? endDate : null
        }
    }
    )
    return response?.data || []
}

export const createUser = async (value) => {
    const response = await DG_axios.post(url, value);
    return response.data || []
}


export const deleteUser = async (id) => {
    const response = await DG_axios.delete(`${url}/${id}`);
    return response.data || []
}

export const getDetaiUser = async (id) => {
    const response = await DG_axios.get(`${url}/${id}`);
    return response.data || []
}

export const updateUser = async (id, value) => {
    const response = await DG_axios.put(`${url}/${id}`, value);
    return response.data || []
};

export const login = async (value) => {
    const response = await DG_axios.post(url_login, value);
    return response.data || []
};

export const DG_axios = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('Token').replace(/"/g, '')
    },
});