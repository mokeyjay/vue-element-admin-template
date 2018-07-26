<template>
  <div id="header">
    <div class="left">
    <i :class="['iconfont', 'icon-menu', {collapse: menuCollapse}]"
       @click="$store.commit('layout/menuCollapseToggle')" title="收起/展开导航菜单"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="b in breadcrumb"
                          :key="b.url"
                          :to="b.url"
                          @click.native="breadClick(b.url)">
        {{b.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    </div>
    <div class="right">
      <i class="el-icon-rank" @click="fullscreenToggle" title="全屏"></i>
      <el-dropdown class="faceAndMenu">
        <span class="el-dropdown-link">
          <div class="face">
            <i class="iconfont icon-user"></i>
          </div>
          <span class="username">{{$store.state.user.nickname}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    methods:{
      fullscreenToggle(){
        screenfull.toggle()
      },
      breadClick(url){
        if(url != '') this.$store.commit('layout/clickTab', url)
      },
      logout(){
        this.$api.post('auth/logout')
          .then(()=>{
            this.$router.push('/')
          })
      },
    },
    computed:{
      ...mapGetters({
        menuCollapse: 'layout/menuCollapse',
        breadcrumb: 'layout/breadcrumb',
      })
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@/stylus/base"

  #header{
    display flex
    align-items center
    justify-content space-between
    width 100%

    &>div{
      display flex
      align-items center
    }

    .icon {
      font-size 24px
      transition-ease()
      hover-highlight()
    }

    .left {
      .icon-menu{
        @extend #header .icon
        &.collapse{
          transform rotate(90deg)
        }
      }

      .el-breadcrumb{
        margin-left 30px
      }
    }

    .right{
      .el-icon-rank{
        @extend #header .icon
        transform rotate(45deg)
      }
      .faceAndMenu{
        margin-left 20px

        .el-dropdown-link{
          display flex
          align-items center
          cursor pointer
          &:hover{
            .face, .username{
              color $color-main
              border-color $color-main
            }
          }
          .face{
            transition-ease()
            border 1px solid $color-text-placeholder
            border-radius 50%
            width 40px
            height @width
            display flex
            align-items center
            justify-content center
            i{
              font-size 26px
            }
          }
          .username{
            transition-ease()
            margin-left 10px;
          }
        }
      }
    }
  }

</style>