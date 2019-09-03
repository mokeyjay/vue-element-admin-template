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

        mockData: {"errCode":0,"errMsg":"","result":[{"label":"通知","options":[{"id":4,"title":"通知"},{"id":7,"title":"物业"},{"id":8,"title":"整改"}]},{"label":"管理规定","options":[{"id":5,"title":"规定"}]},{"label":"资料上传","options":[{"id":6,"title":"资料"}]}],"timestamp":1567522589}
      }
    },
    methods:{
      getCategory(){
        this.list = this.mockData.result
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
