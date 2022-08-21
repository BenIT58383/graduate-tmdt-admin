import axios from "axios";

const url = `http://localhost:8081/stores`


export async function getStore() {
    const response = await DG_axios.get()
    return response?.data || []
}

// export const createUser = async (value) => {
//     const response = await DG_axios.post(url, value);
//     return response.data || []
// }


export const deleteStore = async (id) => {
    const response = await DG_axios.delete(`${url}/${id}`);
    return response.data || []
}

// export const getDetaiUser = async (id) => {
//     const response = await DG_axios.get(`${url}/${id}`);
//     return response.data || []
// }

// export const updateUser = async (id, value) => {
//     const response = await DG_axios.put(`${url}/${id}`, value);
//     return response.data || []
// };

export const DG_axios = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('Token')
    },
});