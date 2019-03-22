import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const AUTH_REQUEST = 'AUTH_REQUEST'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_ERROR = 'AUTH_ERROR'
const AUTH_LOGOUT = 'AUTH_LOGOUT'

export default new Vuex.Store({

  state: {
    token: localStorage.getItem('user-token') || '',
    status: ''
  },

  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
      state.status = 'logout'
      state.token = ''
    },

  },

  actions: {
    [AUTH_REQUEST]:({ commit }, auth) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST)
        axios.post('http://localhost:5000/login?email=' + auth.email + '&password=' + auth.password)
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('user-token', token) // store the token in localstorage
            commit(AUTH_SUCCESS, token)
            resolve(resp)
          })
          .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
      })
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        // remove the axios default header
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
  }
  },

  getters:{
    isAuthenticated: state => !!state.token,
  }
})