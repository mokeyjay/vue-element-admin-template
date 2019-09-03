import router from './router/index'
import store from './store'
import App from './App.vue'
import Api from './api'

// Element组件库配置
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 500 };

// URL配置
if(process.env.NODE_ENV === 'production'){
  Vue.prototype.$baseUrl = 'https://www.xxxx.com/'
} else {
  Vue.prototype.$baseUrl = 'http://127.0.0.1:8010/'
  Vue.config.devtools = true // 允许浏览器扩展 Vue DevTools 调试
}
// 兼容部分老后端框架及非独立域名的情况
Vue.prototype.$phpUrl = Vue.prototype.$baseUrl + 'api/public/' // 指向后端的公开目录
Vue.prototype.$apiUrl = Vue.prototype.$phpUrl + 'index.php/market/' // api接口前缀

/**
 * 工具
 */
// 接口调用
Vue.prototype.$http = axios.create({
  baseURL: Vue.prototype.$apiUrl,
  timeout: 10000,
  headers: {
    token: store.state.token
  }
})
Vue.prototype.$api = Api

Vue.prototype.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
