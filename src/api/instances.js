import React from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
let refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null
let zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null

let deleteToken = async () => {
    localStorage.removeItem('accessToken')
    accessToken = null
};

let deleteZohoToken = async () => {
    localStorage.removeItem('zohoAccessToken')
    zohoAccessToken = null
};

let setToken = async (accessToken) => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
}

let setZohoToken = async (zohoAccessToken) => {
    localStorage.setItem('zohoAccessToken', JSON.stringify(zohoAccessToken))
    zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null
}



// export const getToken = () => localStorage.getItem("accessToken")
//     ? JSON.parse(localStorage.getItem("accessToken"))
//     : null;

// export const getAuthorizationHeader = () => `Bearer ${getToken()}`;


const instance = axios.create({
    baseURL: 'http://127.0.0.1:4000/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
});

// const zohoAxios = axios.create({
//     baseURL: 'https://accounts.zoho.com/oauth/v2/'
// });

// Automatically refresh token if it is about to expire
instance.interceptors.request.use(async req => {
    console.log('here')

    accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
    refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null
    zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null

    // returns true if user does not have acess token and zoho token
    if (accessToken && zohoAccessToken) {
        return req;
    }

    if (!accessToken && !zohoAccessToken) {
        return req;
    }

    const user = accessToken ? jwt_decode(accessToken, { header: true }) : null
    console.log('user instance', user)
    if (!user) {
        await deleteZohoToken();
    }
    const zohoUser = zohoAccessToken ? jwt_decode(zohoAccessToken, { header: true }) : null
    console.log('zoho', zohoUser)
    const isUserExpired = accessToken ? (dayjs.unix(user.exp).diff(dayjs()) < 1) : null;
    const isZohoTokenExpired = zohoAccessToken ? (dayjs.unix(zohoUser.exp).diff(dayjs()) < 1) : null;
    console.log('ddoings')
    console.log(isZohoTokenExpired)
    if ((!isUserExpired && isUserExpired !== null) && (!isZohoTokenExpired && isZohoTokenExpired !== null)) {
        console.log('haba')
        return req;
    }
    console.log('user expire', isUserExpired)
    console.log('acces bool', !accessToken)
    if (isUserExpired) {
        console.log('ddoings')
        await deleteToken();

        const response = await axios.post(`http://127.0.0.1:4000/api/v1/token/refresh`, {
            refreshToken: refreshToken
        });

        await setToken(response.data.data.accessToken);

        req.headers.Authorization = `Bearer ${response.data.data.accessToken}`
    }

    if (isZohoTokenExpired) {
        console.log('doings')
        await deleteZohoToken();

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        console.log('silver')

        const response = await axios.get(`http://127.0.0.1:4000/api/v1/zoho/token/refresh`, options);

        console.log(response);

        await setZohoToken(response.data.data.zohoAccessToken);
    }

    console.log('got out')

    return req







})




export { instance as Axios };

