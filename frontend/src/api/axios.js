import axios from 'axios';

const isLocal = window.location.hostname === 'localhost' 
    || window.location.hostname === '127.0.0.1';

const api = axios.create({
    baseURL: isLocal
        ? 'http://localhost:4000'
        : 'https://e-commerce-qb3u.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
