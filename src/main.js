import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.scss'
import './assets/css/style.scss'

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
