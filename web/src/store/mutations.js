export default {

  AUTH_REQUEST: (state) => {
    state.status = 'loading'
  },

  AUTH_SUCCESS: (state, token) => {
    state.status = 'success'
    state.token = token
  },

  AUTH_ERROR: (state) => {
    state.status = 'error'
  },

  AUTH_LOGOUT: (state) => {
    state.status = 'logout'
    state.token = ''
  },

  GET_POSTS: (state, posts) => {
    state.posts = posts
  },

  GET_POST: (state, post) => {
    state.post = post
  },

  DELETE_POST: (state) => {
    state.post = ''
  }
}