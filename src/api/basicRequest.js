import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

export const getRequest = (url) => {
    return axios.get(baseURL + url)
}

export const deleteRequest = (url) => {
    return axios.delete(baseURL + url)
}

export const updateRequest = (url, data) => {
        return axios.put(baseURL + url, data)
}

export const createRequest = (url, data) => {
    return axios.post(baseURL + url, data)
}

export const createWithFileRequest = (url, data) => {
    return axios.post(baseURL + url, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}