import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },
    mutations: {
        saveToken(state, token) {
            state.Authorization = token;
            localStorage.setItem('Authorization', token);
        }
    },
    actions: {

    },
    getters:{

    }
})