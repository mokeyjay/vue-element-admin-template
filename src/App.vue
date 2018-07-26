<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  html, body, #app{
    width: 100%;
    height: 100%;
  }

  /**
   * 用于覆盖组件库生成的DOM样式
   */
  .el-tabs {
    .el-tabs__header {
      margin 0
    }
  }
  // 左侧导航栏的图标颜色
  .el-menu-item, .el-submenu__title{
    .iconfont{
      color #c9cbd0
    }
  }
  // 修复input右侧图表使用iconfont时下沉的问题
  .el-input__suffix{
    align-items: center;
    display: flex;
  }
</style>
