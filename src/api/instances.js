import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:4000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export { instance as Axios }