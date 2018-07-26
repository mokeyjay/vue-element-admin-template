<template>
  <el-tabs v-model="$store.state.layout.tabs.value" type="card" @edit="tabsDelete" @tab-click="tabsClick">
    <el-tab-pane v-for="tab in $store.state.layout.tabs.list"
                 :key="tab.url"
                 :label="tab.title"
                 :name="tab.url"
                 :closable="tab.url!='/'">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data(){
      return{

      }
    },
    methods:{
      tabsDelete(targetName){
        this.$store.dispatch('layout/closeTab', targetName)
      },
      tabsClick(tab){
        this.$store.commit('layout/clickTab', tab.name)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>