import { menuRouter } from "@/router/router";

export default {
  namespaced: true,
  state:{
    loading: false,
    // 左侧导航菜单
    menu:{
      collapse: false, // 收起、展开
      index: '', // 当前激活菜单的 index
    },
    breadcrumb:[
      {
        title:'首页',
        url:'/'
      },
    ],
    tabs:{
      value: '/', // 当前被选中的tab名称（即路由path）
      list: [ // 当前tab列表
        {
          title: '首页',
          url: '/',
          path: '/', // 不含query部分
          indexPath: '',
          breadcrumb: [], // 面包屑，结构同上面的 state.breadcrumb
        }
      ],
      keepAlive: ['/'], // 允许缓存的页面组件名称（即路由path）列表
    },
  },
  mutations:{
    // 记录导航菜单被选中项
    setMenuIndex(state, indexPath){
      state.menu.index = indexPath
    },
    // 添加/激活现有标签
    addTab(state, to){
      // 标签页已存在则打开
      let isExist = false
      state.tabs.list.map(tab => {
        if(tab.path == to.path){
          isExist = true
          tab.url = to.fullPath
          state.tabs.value = to.fullPath
          state.breadcrumb = [state.breadcrumb.shift(), ...tab.breadcrumb]
          return false
        }
      })
      if(isExist) return;

      // 计算面包屑
      let breadcrumb = []
      to.matched.map(m => {
        breadcrumb.push({
          title: m.meta.title,
          url: m.path,
        })
      })

      let currentMatched = to.matched[to.matched.length-1]
      state.tabs.list.push({
        title: currentMatched.meta.title,
        url: to.fullPath,
        path: to.path,
        indexPath: state.menu.index,
        breadcrumb,
      })
      state.tabs.value = to.fullPath
      state.tabs.keepAlive.push(to.path)
      state.breadcrumb = [state.breadcrumb.shift(), ...breadcrumb]
    },
    // 激活现有标签
    clickTab(state, url){
      state.tabs.list.map(tab => {
        if(tab.url == url){
          Vue.prototype.vm.$router.replace(tab.url)
          state.tabs.value = tab.url
          state.breadcrumb = [state.breadcrumb.shift(), ...tab.breadcrumb]
          state.menu.index = tab.indexPath
          return false
        }
      })
    },
    // 收起/展开导航菜单
    menuCollapseToggle(state){
      state.menu.collapse = !state.menu.collapse
    },
    // 显示/隐藏加载状态
    toggleLoading(state){
      state.loading = !state.loading
    }
  },
  actions:{
    // 关闭标签
    closeTab({ state, commit }, url){
      state.tabs.list.map((tab, i)=>{
        if(tab.url == url){
          Vue.delete(state.tabs.list, i)
          Vue.delete(state.tabs.keepAlive, i)
          // 如果关闭的是当前标签页，则激活左侧标签
          if(state.tabs.value == url){
            commit('clickTab', state.tabs.list[i-1].url)
          }
        }
      })
    },
  },
  getters:{
    menuCollapse: state=>state.menu.collapse,
    menuIndex: state=>state.menu.index,
    breadcrumb:state=>state.breadcrumb,
  }
}