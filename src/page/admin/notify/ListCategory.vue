<template>
  <div>
    <el-button type="success" @click="showEdit(0)" plain>新增</el-button>

    <el-table :data="list" stripe border v-loading="loading">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="parent_title" label="父类型"></el-table-column>
      <el-table-column prop="title" label="子类型"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{scope.row.status | notifyCategoryStatus}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" plain @click="showEdit(scope.row.id)">编辑</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <Edit :id="id" :visible.sync="editPop" @refresh="getList"></Edit>
  </div>
</template>

<script>
  import Edit from 'page/admin/notify/EditCategory'
  import { notifyCategoryStatus } from "@/utils/tableFilter";

  export default {
    name: '/notify/category',
    filters:{ notifyCategoryStatus },
    components: { Edit },
    data(){
      return {
        loading: false,
        list: [],

        editPop: false,
      }
    },
    methods:{
      getList(){
        this.loading = true
        this.$api.post('notify/getCategoryList')
          .then(data=>{
            this.list = data
          })
          .finally(()=>{
            this.loading = false
          })
      },
      showEdit(id){
        this.editPop = true
        this.id = id
      },
    },
    created(){
      this.getList()
    },
  }
</script>

<style scoped lang="stylus">
  .el-table{
    margin 15px 0
  }
</style>