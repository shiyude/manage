import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store.js';
require('./css/base.css')
require('./css/common.css')
Vue.use(ElementUI);
window.Message=Vue.prototype.$message;
window.loadingInstance =Vue.prototype.$loading;
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
