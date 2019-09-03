<template>
  <div id="menu">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#495060" text-color="#c9cbd0" active-text-color="#2d8cf0"
      :collapse="menuCollapse" unique-opened :default-active="menuIndex"
      @select="menuSelect">
      <el-menu-item class="logo" index="0">
        <img :src="logo" alt="logo">
      </el-menu-item>

      <template v-for="(m,i) in menu" v-if="i>0 && m.meta.show !== false && checkAuth(m.meta.auth)">
        <el-menu-item :index="i" v-if="m.meta.subMenu == false">
          <i :class="m.meta.icon"></i>
          <span slot="title">{{m.meta.title}}</span>
        </el-menu-item>
        <el-submenu :index="i" v-else>
          <template slot="title">
            <i :class="m.meta.icon"></i>
            <span slot="title">{{m.meta.title}}</span>
          </template>
          <el-menu-item v-for="(sm,ii) in m.children"
                        :index="i+'-'+ii" :key="ii"
                        v-if="sm.meta.show !== false && checkAuth(sm.meta.auth)">
            {{sm.meta.title}}
          </el-menu-item>
        </el-submenu>
      </template>

    </el-menu>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { menuRouter } from "@/router/router";

  export default {
    data(){
      return {
        logo: require('img/admin/logo.png'),
        menu: menuRouter
      }
    },
    computed:{
      ...mapGetters('layout', {
        menuCollapse: 'menuCollapse',
        menuIndex: 'menuIndex',
      })
    },
    watch:{
      menuCollapse(collapse){
        this.logo = collapse ? require('img/admin/logo_min.png') : require('img/admin/logo.png')
      },
    },
    methods:{
      menuSelect(index,indexPath){
        let menuIndex1 = indexPath[0]
        let menuIndex2 = 0
        if(indexPath.length == 2){
          let tmp = indexPath[1].split('-')
          menuIndex2 = tmp[1]
        }

        let path = ''
        this.menu.map((menu, i)=>{
          if(i == menuIndex1){
            path += menu.path
            if(menu.children.length == 1){
              path += '/' + menu.children[0].path
              return false
            } else {
              menu.children.map((children, i)=>{
                if(i == menuIndex2){
                  path += '/' + children.path
                  return false
                }
              })
            }
          }
        })

        this.$store.commit('layout/setMenuIndex', indexPath[indexPath.length-1])
        this.$router.push(path).catch(()=>{})
      },

      checkAuth(auth){
        if(auth == undefined) return true

        let userAuth = this.$store.state.user.auth
        for (let i in auth) {
          if(userAuth.indexOf(auth[i]) !== -1) return true
        }
        return false
      }
    }
  }
</script>

<style scoped lang="stylus">
  #menu{
    display: flex;
    flex-direction: column;
    height: 100%;
    .logo{
      text-align: center;
      height: auto;
      padding: 12px 20px;
      img{
        height: 50px;
        width: auto;
        margin: 0 -14px;
      }
    }
    .el-menu{
      height: 100%;
      border-right: none;
      &:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }

      i{
        font-size 16px;
        margin-right 5px;
      }
    }
  }
</style>
