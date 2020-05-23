import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

//  拦截重复请求
// 在网速较慢的情况下，容易出现用户多次点击而重复请求使得页面抖动的问题，用户体验不好，因此进行拦截重复请求的处理
// 创建请求队列 ---->
// -----拦截处理------
// 标识即将发送的请求---->
// 判断即将发送的请求与队列中的请求是否相同---->
// 若相同则执行当前请求的取消方法,并从请求队列中删除---->
// 创建即将请求的取消方法，放入队列中

const getRequestIdentify = (config, isReuest = false) => {
    let url = config.url;
    if (isReuest) {
        url = config.baseURL + config.url.substring(1, config.url.length);
    }
    return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data));
};
const pending = {};
const CancelToken = axios.CancelToken;
const removePending = (key, isRequest = false) => {
    if (pending[key] && isRequest) {
        pending[key]('取消重复请求');
    }
    delete pending[key];
};

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 拦截重复请求(即当前正在进行的相同请求)

    const requestData = getRequestIdentify(config, true); // 标识请求
    removePending(requestData, true);// 取消重复请求
    config.cancelToken = new CancelToken((c) => { // 创建当前请求的取消方法
        pending[requestData] = c;
    });

    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.dir(error);
    if (error.response.data.message) {
        Vue.prototype.$message.error(error.response.data.message)
    }

    if (error.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(error);
});
export default http