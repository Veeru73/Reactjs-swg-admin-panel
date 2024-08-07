import axios from 'axios';
const moment = require('moment-timezone');
const currentTimeZone = moment.tz.guess();

const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "version": "1.0.0",
        "device_type": "browser",
        "Timezone": currentTimeZone,
        "language": "en"
    }
});
http.interceptors.request.use((config) => {
    config.headers.authorization = localStorage.getItem('Authorization');
    config.headers.id = localStorage.getItem('id') || "";
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default http;