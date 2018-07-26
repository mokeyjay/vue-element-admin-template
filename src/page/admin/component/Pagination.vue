<template>
  <el-pagination
    @current-change="pageChange"
    @size-change="sizeChange"
    :current-page="page"
    :page-sizes="[20, 50, 80, 100]"
    :page-size="listRows"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    v-show="show">
  </el-pagination>
</template>

<script>
  export default {
    props:{
      page:{
        type: Number,
        default: 1,
      },
      listRows: {
        type: Number,
        default: 20,
      },
      total:{
        type: Number,
        default: 0,
      }
    },
    methods:{
      sizeChange(listRows){
        this.$emit('update:listRows', listRows)
        this.$emit('page-change')
      },
      pageChange(page){
        this.$emit('update:page', page)
        this.$emit('page-change')
      }
    },
    computed:{
      show(){
        return this.total > this.listRows
      }
    },
  }
</script>

<style scoped>
  .el-pagination{
    margin-top: 15px;
  }
</style>