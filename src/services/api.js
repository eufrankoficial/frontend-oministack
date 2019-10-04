import axios from 'axios';

const api = axios.create({
    baseURL: 'http://be150636.ngrok.io'
});

export default api;
