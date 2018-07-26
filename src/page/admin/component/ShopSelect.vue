<template>
  <el-select v-model="value" placeholder="请选择店铺" filterable :multiple="multiple" v-loading="loading" :clearable="clearable">
    <el-option-group v-for="group in list" :key="group.label" :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
  export default {
    props:{
      multiple:{
        type: Boolean,
        default: false
      },
      value:{
        default: null
      },
      clearable:{
        type:Boolean,
        default: false
      },
    },
    data(){
      return {
        loading: false,
        list: [],
      }
    },
    created(){
      this.loading = true
      this.$api.post('shop/getListForSelect')
        .then(data=>{
          this.list = data
        })
        .finally(()=>{
          this.loading = false
        })
    },
    watch:{
      value(v){
        this.$emit('input', v)
      }
    },
  }
</script>

<style scoped lang="stylus">
  .el-select{
    width 100%
  }
</style>