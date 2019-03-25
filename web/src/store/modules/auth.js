const state = { 
    token: localStorage.getItem('Authorization') || '',
    status: '',
    hasLoadedOnce: false
}

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}


const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit(AUTH_REQUEST)
        axios({url: 'auth', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('Authorization', token) // store the token in localstorage
            axios.defaults.headers.common['Authorization'] = token
            commit(AUTH_SUCCESS, token)
            // you have your token, now log in your user :)
            dispatch(USER_REQUEST)
            resolve(resp)
            })
        .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('Authorization') // if the request fails, remove any possible user token if possible
            reject(err)
        })
        })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
          commit(AUTH_LOGOUT)
          localStorage.removeItem('Authorization') // clear your user's token from localstorage
          resolve()
        })
    }
}

// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded

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