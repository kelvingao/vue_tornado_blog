import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import VueRouter from 'vue-router'

import store from './store'

import login from '@/components/login.vue'
import post from '@/components/post.vue'
import blog from '@/components/blog.vue'
import compose from '@/components/compose.vue'

Vue.use(VueRouter);
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/blog' },
    { path: '/blog', component: blog, beforeEnter: ifAuthenticated },
    { path: '/login', component: login },
    { path: '/blog/:slug', component: post },
    { path: '/compose', component: compose }
  ]
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
