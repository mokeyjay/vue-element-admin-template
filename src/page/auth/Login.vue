<template>
  <div id="login" :style="{backgroundImage: 'url('+bingWallpaperUrl+')'}">
    <el-card id="form">
      <div slot="header">
        <span>
          <i class="el-icon-d-arrow-right"></i>
          欢迎登陆
        </span>
      </div>
      <el-input
        placeholder="请输入用户名"
        v-model="username">
        <i slot="suffix" class="iconfont icon-user"></i>
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        type="password"
        @keyup.enter.native="login">
        <i slot="suffix" class="iconfont icon-lock"></i>
      </el-input>
      <el-button type="primary" @click="login" v-loading="loading">登陆</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        bingWallpaperUrl: require('img/auth/bg.jpg'),
        username: '',
        password: '',
        loading: false,
      }
    },
    methods:{
      login(){
        this.loading = true
        this.$api.post('auth/login', {
          username: this.username,
          password: this.password,
        }).then(token=>{
          this.$store.commit('saveToken', token)
          this.$router.push('/')
        }).finally(()=>{
          this.loading = false
        })
      }
    },
    created(){
      // this.$api.get('other/getBingWallpaperUrl')
      //   .then(data=>{
      //     this.bingWallpaperUrl = data;
      //   }).catch(err=>{
      //     this.bingWallpaperUrl = require('img/auth/bg.jpg');
      // });
    }
  }
</script>

<style scoped lang="stylus">
#login{
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;

  #form{
    width: 340px;
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);

    .el-input{
      margin-bottom: 20px;

      .iconfont{
        width: 25px;
        line-height: 40px;
        margin-right: 6px;
      }
    }

    .el-button{
      width: 100%;
    }
  }
}
</style>