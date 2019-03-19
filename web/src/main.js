import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import VueRouter from 'vue-router'

import login from '@/components/login.vue'
import post from '@/components/post.vue'
import blog from '@/components/blog.vue'

Vue.use(VueRouter);
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/blog' },
    { path: '/blog', component: blog },
    { path: '/login', component: login },
    { path: '/post/:id', component: post }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
