<template>
  <el-container v-loading="loading">
    <el-aside width="auto">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>

      <Tabs></Tabs>

      <el-main>
        <keep-alive :include="$store.state.layout.tabs.keepAlive">
          <router-view v-loading="$store.state.layout.loading"></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Menu from './component/Menu'
  import Header from './component/Header'
  import Tabs from './component/Tabs'
  import { menuRouter } from "@/router/router";

  export default {
    components: { Menu, Header, Tabs },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // if(vm.$store.state.token == '') return '/login'

        // 如果直接访问子菜单，则需要添加标签页
        if(to.fullPath != '/'){
          // 计算导航菜单indexPath（最多只算2级）
          let indexPath = ''
          menuRouter.map((menu, i)=>{
            if(menu.path == to.matched[0].path){
              indexPath += i

              if(to.matched.length >= 2 && menu.children.length > 1){
                let childrenPath = to.matched[1].path.split('/').pop()
                menu.children.map((menu, i)=>{
                  if(menu.path == childrenPath){
                    indexPath += '-' + i
                    return false
                  }
                })
              }
              return false
            }
          })

          vm.$store.commit('layout/setMenuIndex', indexPath)
          vm.$store.commit('layout/addTab', to)
        }
      })
    },
    watch:{
      '$route'(to){
        this.$store.commit('layout/addTab', to)
      },
    },
    data(){
      return {
        loading: false,
      }
    },
    created(){
      // 获取用户基本信息
      // this.loading = true
      // this.$api.get('index/getUserInfo')
      //   .then(data=>{
      //     this.$store.commit('saveUser', data)
      //   })
      //   .finally(()=>{
      //     this.loading = false
      //   })
    },
  }
</script>

<style scoped lang="stylus">
  @import "~@/stylus/base"
  .el-container{
    height: 100%;
  }
  .el-header{
    display: flex;
     box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
  }
  .el-main{
    padding 15px
  }
</style>