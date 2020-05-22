import axios from 'axios'
import Vue from 'vue'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})
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
    
    return Promise.reject(error);
});
export default http