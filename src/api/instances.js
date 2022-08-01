import axios from 'axios';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
const instance = axios.create({
    baseURL: 'http://127.0.0.1:4000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const zohoAxios = axios.create({
    baseURL: 'https://accounts.zoho.com/oauth/v2/'
});


export { instance as Axios, zohoAxios as ZohoAxios };

