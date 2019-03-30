import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // adminToken: '',
    // localToken: '',
    // user: {},
    // total: 0,
    // articles: [],
    // drafts: [],
    // articleDetail: {},
    // tags: [],
    // stickArticles:[],
    // tagArticles: [],
    // searchArticles: [],
    // limit: 10,
    // app: {},
    token: localStorage.getItem('Authorization') || '',
    posts: [],
    post: {},
  },
  getters,
  mutations,
  actions
})