import axios from "axios";
const url = 'https://happyshop23.co/internal'
const instance = axios.create({
    baseURL: url,
    headers: { Authorization: window.localStorage.getItem('token') },
})

export default instance
