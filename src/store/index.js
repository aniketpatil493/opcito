import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const loginData = JSON.parse(localStorage.getItem('loginData'));
export default new Vuex.Store({
  state: {
    username: loginData && loginData.username ? loginData.username : "" ,
    isLoggedIn: loginData && loginData.isLoggedIn && parseInt(loginData.isLoggedIn) ? 1 : 0
  },
  mutations: {
    updateUsername(state, payload) {
      state.username = payload;
    },
    updateIsLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    clearLoginData(state, payload) {
      if(payload) {
        state.username = "";
        state.isLoggedIn = 0;  
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
