<template>
  <el-select v-model="value" :placeholder="placeholder" :clearable="clearable" :multiple="multiple">
    <el-option v-for="(label, value, i) in object"
               :key="i" :label="label" :value="value"></el-option>
  </el-select>
</template>

<script>
  export default {
    props:{
      value:{
        type: Number,
        default: '',
      },
      placeholder:{
        type: String,
        default: '',
      },
      object:{
        type: Object,
        default: {},
      },
      clearable:{
        type: Boolean,
        default: true
      },
      multiple:{
        type: Boolean,
        default: false
      }
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