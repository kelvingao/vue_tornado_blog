import Vue from 'vue'
import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  // defaultContainerElement: '#content',
})

import App from './App.vue'
import VueRouter from 'vue-router'

window.Slug = require('slug')
Slug.defaults.mode = 'rfc3986'

import store from './store'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import login from '@/components/login'
import post from '@/components/post'
import compose from '@/components/compose'
import dashboard from '@/components/dashboard'
import general from '@/components/dashboard/general'
import posts from '@/components/dashboard/posts'
import createPost from '@/components/dashboard/posts/createPost'
import blog from '@/components/blog'

Vue.use(VueRouter);
// Vue.use(BootstrapVue)
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false

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
    { path: '/dashboard', component: dashboard, children: [
      { path: 'general', component: general },
      { path: 'posts', component: posts },
      { path: 'posts/create', component: createPost },
      ]},
    { path: '/compose', component: compose, beforeEnter: ifAuthenticated }
  ]
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
