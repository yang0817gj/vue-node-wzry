import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style.scss'
Vue.use(ElementUI);
import http from './http.js'
Vue.prototype.$http = http

Vue.config.productionTip = false
Vue.mixin({
    computed: {
        uploadsUrl() {
            return http.defaults.baseURL + '/upload'
        }
    },
    methods: {
        getAuthToken() {
            return { Authorization: 'Bearer ' + localStorage.token }
        }
    },
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
