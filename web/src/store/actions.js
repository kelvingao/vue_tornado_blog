import api from '@/api'

export default {

  AUTH_REQUEST:({ commit }, auth) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      api.postAuthorization(auth)
        .then(resp => {
          const token = resp.data.token
          localStorage.setItem('Authorization', token) // store the token in localstorage
          commit('AUTH_SUCCESS', token)
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('Authorization') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
  },

  AUTH_LOGOUT: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_LOGOUT')
      localStorage.removeItem('Authorization') // clear your user's token from localstorage
      // delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },

  GET_POSTS ({ commit }, limit) {
    return new Promise((resolve, reject) => {
      api.getPosts(limit).then(resp => {
        commit('GET_POSTS', resp);
        resolve()
      })
      .catch(err => {
          reject(err)
      })
    })
  },

  GET_POST ({ commit }, slug) {
    return new Promise((resolve, reject) => {
      api.getPost(slug).then(resp => {
        commit('GET_POST', resp)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },

  DELETE_POST({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.deletePost(id).then(resp => {
        commit('DELETE_POST')
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  },

}