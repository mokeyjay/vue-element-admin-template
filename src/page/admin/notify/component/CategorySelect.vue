<template>
  <el-select v-model="value" placeholder="请选择信息类型" filterable :multiple="multiple" v-loading="loading">
    <el-option-group v-for="group in list" :key="group.label" :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.id"
        :label="item.title"
        :value="item.id">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
  export default {
    data(){
      return {
        loading: false,
        list: [],
      }
    },
    methods:{
      getCategory(){
        this.loading = true
        this.$api.post('notify/getCategoryListForSelect')
          .then(data=>{
            this.list = data
          })
          .finally(()=>{
            this.loading = false
          })
      },
    },
    props:{
      value:{
        type: Number,
        default: null
      }
    },
    watch:{
      value(v){
        this.$emit('input', v)
      }
    },
    created(){
      this.getCategory()
    }
  }
</script>

<style scoped>

</style>