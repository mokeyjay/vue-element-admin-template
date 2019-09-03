import layout from './modules/layout'

export default new Vuex.Store({
  state:{
    token: localStorage.getItem('token') || '',
    user:{
      id: 0,
      username: 'admin',
      nickname: '管理员',
      auth: [1], // 权限列表
    },
  },
  mutations:{
    saveToken(state, token){
      state.token = token
      Vue.prototype.$http.defaults.headers.token = token
      localStorage.setItem('token', token)
    },
    saveUser(state, user){
      state.user = Object.assign(state.user, user)
    }
  },
  modules:{
    layout,
  },
})
