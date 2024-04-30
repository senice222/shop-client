import axios from "axios";

const instance = axios.create({
    baseURL: 'http://happyshop23.co/internal',
    headers: { Authorization: window.localStorage.getItem('token') },
})

export default instance
