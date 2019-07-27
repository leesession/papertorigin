import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: () => import(/* webpackChunkName: "about" */ './views/home/searchList.vue')
    },
    {
      path: '/searchDetails',
      name: 'searchDetails',
      component: () => import(/* webpackChunkName: "about" */ './views/home/searchDetails.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import(/* webpackChunkName: "about" */ './views/service/service.vue')
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import(/* webpackChunkName: "about" */ './views/resourse/resource.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/about/about.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import(/* webpackChunkName: "about" */ './views/contact/contact.vue')
    }
    
  ]
})
