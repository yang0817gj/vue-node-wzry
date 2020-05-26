import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Card from './components/Card'
import ListCard from './components/ListCard'
Vue.component('el-card', Card)
Vue.component('list-card', ListCard)
// import style
import 'swiper/css/swiper.css'
// import './assets/iconfont/iconfont'
import './assets/iconfont/iconfont.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
import './assets/scss/style.scss'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
