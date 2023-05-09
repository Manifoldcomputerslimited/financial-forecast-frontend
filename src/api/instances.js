import React from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
let refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null
let zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null
let zohoTokenExpiry = localStorage.getItem('zohoTokenExpiry') ? JSON.parse(localStorage.getItem('zohoTokenExpiry')) : null

let deleteToken = async () => {
    localStorage.removeItem('accessToken')
    accessToken = null
};

let deleteZohoToken = async () => {
    localStorage.removeItem('zohoAccessToken')
    localStorage.removeItem('zohoTokenExpiry')
    zohoAccessToken = null
    zohoTokenExpiry = null
};

let setToken = async (accessToken) => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
}

let setZohoToken = async (data) => {
    localStorage.setItem('zohoAccessToken', JSON.stringify(data.zohoAccessToken))
    localStorage.setItem('zohoTokenExpiry', JSON.stringify(data.zohoTokenExpiry))
    zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null
    zohoTokenExpiry = localStorage.getItem('zohoTokenExpiry') ? JSON.parse(localStorage.getItem('zohoTokenExpiry')) : null
}


const instance = axios.create({
    baseURL: `${process.env.REACT_APP_MANIFOLD_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});


// Automatically refresh token if it is about to expire
instance.interceptors.request.use(async req => {

    accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
    refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null
    let zohoTokenExpiry = localStorage.getItem('zohoTokenExpiry') ? JSON.parse(localStorage.getItem('zohoTokenExpiry')) : null

    // check if it exists

    // returns true if user does not have acess token and zoho token
    if (accessToken && zohoTokenExpiry) {

        // check if token hasn't expired
        const user = accessToken ? jwt_decode(accessToken) : null

        if (!user) {
            await deleteZohoToken();
        }
        let isUserExpired = (user.exp - dayjs().unix()) < 1 ? true : false; 
        let isZohoTokenExpired = dayjs(zohoTokenExpiry).unix() - dayjs().unix() < 1 ? true : false;

        console.log('user expired', isUserExpired);
        console.log('time to expire', dayjs(zohoTokenExpiry).unix() - dayjs().unix());
        console.log('zoho expired', isZohoTokenExpired);

        if ((!isUserExpired && isUserExpired !== null) && (!isZohoTokenExpired && isZohoTokenExpired !== null)) {
            req.headers['Authorization'] = `Bearer ${accessToken}`
            return req;
        }

        if (isUserExpired) {
            await deleteToken();

            const response = await axios.post(`${process.env.REACT_APP_MANIFOLD_API_URL}/token/refresh`, {
                refreshToken: refreshToken
            });

            await setToken(response.data.data.accessToken);

            req.headers.Authorization = `Bearer ${response.data.data.accessToken}`
        }

        if (isZohoTokenExpired) {
            await deleteZohoToken();

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }

            const response = await axios.get(`${process.env.REACT_APP_MANIFOLD_API_URL}/zoho/token/refresh`, options);


            await setZohoToken(response.data.data);
        }
        req.headers['Authorization'] = `Bearer ${accessToken}`
        return req;
    }

    if (!accessToken && !zohoTokenExpiry) {
        return req;
    }

    if (!zohoTokenExpiry) {
        return req;
    }
    req.headers['Authorization'] = `Bearer ${accessToken}`
    return req
})




export { instance as Axios };

