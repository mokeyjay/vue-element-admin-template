<template>
  <el-dialog :title="shopName+' 上传资料汇总'" :visible.sync="visible" width="1200px">
    <el-table :data="list" stripe border v-loading="loading">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="category" label="通知类型"></el-table-column>
      <el-table-column prop="title" label="通知标题"></el-table-column>
      <el-table-column label="预览/下载">
        <template slot-scope="scope">
          <a :href="scope.row.file" target="_blank">
            <el-button type="primary" plain><i class="el-icon-search"></i></el-button>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" plain @click="editRemark(scope.row.id, scope.row.remark)">编辑</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :list-rows.sync="pagination.listRows" :total="pagination.total"
                :page.sync="pagination.page" @page-change="getList"></Pagination>
  </el-dialog>
</template>

<script>
  import Pagination from 'page/admin/component/Pagination'
  export default {
    name: '/shop/category',
    components: { Pagination },
    props:{
      shopId: Number,
      visible: Boolean,
    },
    data(){
      return {
        shopName: 'xxx',
        loading: false,
        list: [],

        pagination:{
          page: 1,
          total: 0,
          listRows: 20,
        },
      }
    },
    methods:{
      getList(){
        this.loading = true
        this.$api.post('shop/getFileList', {
          page: this.pagination.page,
          listRows: this.pagination.listRows,
          shop_id: this.shopId,
        })
          .then(data=>{
            this.pagination.total = data.total
            this.list = data.data
            this.shopName = data.shop_name
          })
          .finally(()=>{
            this.loading = false
          })
      },
      editRemark(id, remark){
        this.$prompt(null, '修改备注', {
          inputValue: remark,
        }).then(({ value }) => {
          this.$api.post('shop/saveFileRemark', {
            id,
            remark: value
          }).then(()=>{
            this.getList()
          })
        })
      }
    },
    watch:{
      visible(v){
        if(v) this.getList()
        this.$emit('update:visible', v)
      },
    },
  }
</script>

<style scoped lang="stylus">
  .el-table{
    margin 15px 0
  }
</style>