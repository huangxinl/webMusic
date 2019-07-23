import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import '../src/common/stylus/index.styl'


Vue.config.productionTip = false
 
Vue.use(VueLazyLoad, {  // 懒加载插件 使用方法
  loading: require('./static/load.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
