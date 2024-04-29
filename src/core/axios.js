import axios from "axios";

const instance = axios.create({
    baseURL: 'http://5.42.107.119/internal',
    headers: { Authorization: window.localStorage.getItem('token') },
})

export default instance
