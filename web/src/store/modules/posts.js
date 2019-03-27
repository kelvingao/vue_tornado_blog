import api from "@/api";
import _ from "lodash";

const GET_POSTS = 'GET_POSTS'

// initial state
const state = {
  recent: [],
  loaded: false
};

// getters
const getters = {
  recentPosts: state => limit => {
    if (
      !limit ||
      !_.isNumber(limit) ||
      _.isNull(limit) ||
      typeof limit == "undefined"
    ) {
      return state.recent;
    }
    let recent = state.recent;
    return recent.slice(0, limit);
  },

  recentPostsLoaded: state => state.loaded,

  articleDetial: state => state.loaded,
};

// actions
const actions = {
  [GET_POSTS] ({ commit }, { limit }) {
    api.getPosts(limit)
      .then(resp => {
        commit(GET_POSTS, resp);
      })
      .catch(err => {
          console.error(err)
      })
  }
};

// mutations
const mutations = {
  [GET_POSTS] (state, posts) {
    state.recent = posts;
    state.loaded = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};