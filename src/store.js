import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginMsg: localStorage.getItem('USER') ? localStorage.getItem('USER') : ''
    },
    mutations: {
        userLogin(state, valueJson) {
            state.loginMsg = valueJson
        },
        userLoginOut(state) {
            state.loginMsg = '';
            localStorage.clear();
        }
    },
    actions: {}
})
