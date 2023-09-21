import axios from 'axios';

// const service = axios.create({
//     // process.env.NODE_ENV === 'development' 来判断是否开发环境
//     // easy-mock服务挂了，暂时不使用了
//     // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
//     baseURL: 'http://120.24.186.190:8080',
//     timeout: 5000
// });

const service = axios.create({
    baseURL: '',
    // baseURL: process.env.VUE_APP_BASE_URL,
    withCredentials: false,
    timeout: 5000
});

service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res && res.hasOwnProperty('code')) {
            return response;
        } else {
            return Promise.reject('请求出错');
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
