import Vue from 'vue'
import App from './App.vue'

import store from './store'


/*--------------------------------------------------------------
Buefy & font-awesome
--------------------------------------------------------------*/
import Buefy from 'buefy'
import '@fortawesome/fontawesome-free/css/solid.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  // defaultContainerElement: '#content',
});


/*--------------------------------------------------------------
Slug generator
--------------------------------------------------------------*/
window.Slug = require('slug')
Slug.defaults.mode = 'rfc3986'


/*--------------------------------------------------------------
Vue-Analytics
--------------------------------------------------------------*/
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-1234-5'
})


/*--------------------------------------------------------------
VueQillEditor
--------------------------------------------------------------*/
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)


/*--------------------------------------------------------------
Custom components
--------------------------------------------------------------*/
import login from '@/components/login'
import post from '@/components/post'
import compose from '@/components/compose'
import admin from '@/components/admin'
import general from '@/components/admin/general'
import posts from '@/components/admin/posts'
import createPost from '@/components/admin/posts/createPost'
import blog from '@/components/blog'


/*--------------------------------------------------------------
Custom directives & filters
--------------------------------------------------------------*/
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes: [
    { path: '/', redirect: '/blog' },
    { path: '/blog', component: blog },
    { path: '/posts/:slug', component: post  },
    { path: '/login', component: login },
    { path: '/admin', component: admin, children: [
      { path: 'general', component: general },
      { path: 'posts', component: posts },
      { path: 'posts/create', component: createPost },
      ]},
    { path: '/compose', component: compose, beforeEnter: ifAuthenticated }
  ]
});


/*--------------------------------------------------------------
Custom directives & filters
--------------------------------------------------------------*/
Vue.directive('rainbow', {
  bind(el, binding, vnode) {
    el.style.color = '#' + Math.random().toString().slice(2,8);
  }
});

Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = '1200px';
    } else if (binding.value == 'narrow') {
      el.style.maxWidth = '560px';
    }
    if(binding.arg == 'column') {
      el.style.padding = '20px';
      el.style.background = '#ddd';
    }
  }
});

Vue.filter('to-uppercase', function(value) {
  return value.toUpperCase();
});

Vue.filter('snippet', function(value) {
  return value.slice(0,100) + '...';
});


/*--------------------------------------------------------------
Vue instance
--------------------------------------------------------------*/
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
