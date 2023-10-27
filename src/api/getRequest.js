import axios from 'axios'

export const getRequest = (url) => {
    // const BASE_URL = process.env.BASE_URL;
    return axios.get(url)
}