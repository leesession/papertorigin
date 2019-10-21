import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.scss'
import './assets/css/style.scss'
import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境
    axios.defaults.baseURL = 'http://47.112.29.135:9094';//路径
  }
} else { //dev 开发环境 axios.defaults.baseURL = 'http://192.168.0.152:8102';//路径
  axios.defaults.baseURL = process.env.BASE_API;
}
// axios基本配置
// axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.timeout = 10000;
Vue.prototype.$axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

Vue.use(ElementUI);
Vue.config.productionTip = false;


import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: window.localStorage.getItem('user_lang') == null ? "cn" : window.localStorage.getItem('user_lang'),    // 语言标识
  messages: {
    'cn': require('./utils/lang/cn'),   // 中文语言包
    'en': require('./utils/lang/en')    // 英文语言包
  },
});

/**
 * 全局导航
 * @param {Object} to 目标路由对象
 * @param {Object} from 源路由对象
 * @param {Object} next 继续跳转（next()）OR重定义路由（next('/login')）
 */
// router.beforeEach((to, from, next) => {
// 	let userInfo = JSON.parse(sessionStorage.getItem('USER-INFO'));
// 	//根据登录信息作权限处理
//   if (!userInfo) {
//     if (to.path === '/login') { // 如果是登录页面路径，就直接next()
//       next()
//     } else { // 不然就跳转到登录
//       next('/login')
//     }
//   } else {
//     next()
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
