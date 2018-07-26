<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="title" clearable>
          <template slot="prepend">标题</template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <CategorySelect v-model="category_id"></CategorySelect>
      </el-col>
      <el-col :span="5">
        <ObjectSelect v-model="status" placeholder="状态" :object="notifyStatus"></ObjectSelect>
      </el-col>
      <el-col :span="5">
        <el-button type="info" plain @click="search">搜索</el-button>
        <el-button type="success" plain @click="showEdit(0)">新增</el-button>
        <el-button type="primary" plain @click="exportTable">导出</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" stripe border v-loading="loading">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="parent_category" label="父类型"></el-table-column>
      <el-table-column prop="category" label="类型"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="showtime" label="显示时间">
        <template slot-scope="scope">
          {{scope.row.showtime_start}}<br>{{scope.row.showtime_end}}
        </template>
      </el-table-column>
      <el-table-column prop="creater" label="上传账号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{scope.row.status | notifyStatus}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-row>
            <el-button type="success" plain @click="showDetail(scope.row.id)">查看</el-button>
            <el-button type="primary" plain @click="showEdit(scope.row.id)">编辑</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <Edit :id="id" :visible.sync="editPop" @refresh="getList"></Edit>
    <Detail :notify-id="id" :visible.sync="detailPop" @refresh="getList"></Detail>

    <Pagination :list-rows.sync="pagination.listRows" :total="pagination.total"
                :page.sync="pagination.page" @page-change="getList"></Pagination>
  </div>
</template>

<script>
  import Pagination from 'page/admin/component/Pagination'
  import { notifyStatus } from '@/utils/tableFilter'
  import Edit from 'page/admin/notify/Edit'
  import { NOTIFY_STATUS } from "@/utils/objectList";
  import JsonExcel from '@/utils/jsonExcel'
  import ObjectSelect from 'page/admin/component/ObjectSelect'
  import CategorySelect from 'page/admin/notify/component/CategorySelect'
  import Detail from 'page/admin/notify/Detail'

  export default {
    name: '/notify/list',
    components: { Pagination, Edit, ObjectSelect, CategorySelect, Detail },
    filters:{ notifyStatus },
    data(){
      return {
        notifyStatus: NOTIFY_STATUS,

        pagination:{
          page: 1,
          total: 0,
          listRows: 20,
        },

        loading: false,
        list: [],

        id: 0,
        category_id: '',
        title: '',
        status: null,

        editPop: false,
        detailPop: false,

        exportFields: {
          'ID': 'id',
          '父类型': 'parent_category',
          '类型': 'category',
          '标题': 'title',
          '创建时间': 'create_time',
          '显示时间/起': 'showtime_start',
          '显示时间/止': 'showtime_end',
          '上传账号': 'creater',
          '状态': {
            field: 'status',
            callback(v){
              return notifyStatus(v)
            }
          },
        },
      }
    },
    methods:{
      getList(){
        this.loading = true
        this.$api.post('notify/getList', {
          page: this.pagination.page,
          listRows: this.pagination.listRows,
          category_id: this.category_id,
          title: this.title,
          status: this.status
        })
          .then(data=>{
            this.pagination.total = data.total
            this.list = data.data
          })
          .finally(()=>{
            this.loading = false
          })
      },
      search(){
        this.pagination.page = 1
        this.getList()
      },
      showEdit(id){
        this.editPop = true
        this.id = id
      },
      showDetail(id){
        this.detailPop = true
        this.id = id
      },
      exportTable(){
        this.loading = true
        this.$api.post('notify/getList', {
          page: 1,
          listRows: 20000,
          category_id: this.category_id,
          name: this.name,
          status: this.status
        })
          .then(data=>{
            JsonExcel.fields = this.exportFields
            JsonExcel.data = data.data
            JsonExcel.generate()
          })
          .finally(()=>{
            this.loading = false
          })
      }
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