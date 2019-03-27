
import api from '@/api'

const AUTH_REQUEST = 'AUTH_REQUEST'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_ERROR = 'AUTH_ERROR'
const AUTH_LOGOUT = 'AUTH_LOGOUT'

// initial state
const state =  {
  token: localStorage.getItem('Authorization') || '',
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token
}

// actions
const actions = {
  // request JWT token
  [AUTH_REQUEST]:({ commit }, auth) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      api.postAuthorization(auth)
        .then(resp => {
          const token = resp.data.token
          localStorage.setItem('Authorization', token) // store the token in localstorage
          commit(AUTH_SUCCESS, token)
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('Authorization') // if the request fails, remove any possible user token if possible
          reject(err)
        })
    })
  },
  // logout, remove localStorage token
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('Authorization') // clear your user's token from localstorage
      // remove the axios default header
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

// mutations
// showing loading, success, error to reflect the api call status and the token when loaded
const mutations = {
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
}

export default {
  state,
  getters,
  actions,
  mutations
}