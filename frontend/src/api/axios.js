import axios from 'axios';

const api = axios.create({
    baseURL: window.location.hostname === 'localhost' 
        ? 'http://localhost:4000' 
        : 'https://e-commerce-qb3u.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
