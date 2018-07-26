<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="name" clearable>
          <template slot="prepend">店铺名称</template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <CategorySelect v-model="category_id"></CategorySelect>
      </el-col>
      <el-col :span="5">
        <ObjectSelect v-model="status" placeholder="店铺状态" :object="shopStatus" :multiple="true"></ObjectSelect>
      </el-col>
      <el-col :span="7">
        <el-button type="info" plain @click="search">搜索</el-button>
        <el-button type="success" plain @click="showEdit(0)">新增</el-button>
        <el-button type="primary" plain @click="exportTable">导出</el-button>
        <el-button type="warning" plain @click="showExpired">健康证过期</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" stripe border v-loading="loading">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="category" label="品类"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="staff_num" label="员工数量">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="showStaff(scope.row.id)">{{scope.row.staff_num}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="brand_no" label="品牌编号"></el-table-column>
      <el-table-column prop="third_no" label="第三方编号"></el-table-column>
      <el-table-column prop="area" label="营业面积"></el-table-column>
      <el-table-column prop="status" label="店铺状态">
        <template slot-scope="scope">
          {{scope.row.status | shopStatus}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" plain @click="showEdit(scope.row.id)">编辑</el-button>
            <el-button type="warning" plain @click="showFile(scope.row.id)">查看资料</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <Edit :id="id" :visible.sync="editPop" @refresh="getList"></Edit>
    <ListStaff :shop-id="id" :type="type" :visible.sync="staffPop" @refresh="getList"></ListStaff>
    <ListFile :shop-id="id" :visible.sync="filePop" @refresh="getList"></ListFile>

    <Pagination :list-rows.sync="pagination.listRows" :total="pagination.total"
                :page.sync="pagination.page" @page-change="getList"></Pagination>
  </div>
</template>

<script>
  import Pagination from 'page/admin/component/Pagination'
  import { shopStatus } from '@/utils/tableFilter'
  import Edit from 'page/admin/shop/Edit'
  import {SHOP_STATUS} from "@/utils/objectList";
  import JsonExcel from '@/utils/jsonExcel'
  import ObjectSelect from 'page/admin/component/ObjectSelect'
  import CategorySelect from 'page/admin/shop/component/CategorySelect'
  import ListStaff from 'page/admin/shop/ListStaff'
  import ListFile from 'page/admin/shop/ListFile'

  export default {
    name: '/shop/list',
    components: { Pagination, Edit, ObjectSelect, CategorySelect, ListStaff, ListFile },
    filters:{ shopStatus },
    data(){
      return {
        shopStatus: SHOP_STATUS,

        pagination:{
          page: 1,
          total: 0,
          listRows: 20,
        },

        loading: false,
        list: [],

        id: 0,
        category_id: '',
        name: '',
        status: ['0', '2'],
        type: 0,

        editPop: false,
        staffPop: false,
        filePop: false,

        exportFields: {
          'ID': 'id',
          '品类': 'category',
          '名称': 'name',
          '员工数量': 'staff_num',
          '品牌编号': 'brand_no',
          '第三方编号': 'third_no',
          '营业面积': 'area',
          '店铺状态': {
            field: 'status',
            callback(v){
              return shopStatus(v)
            }
          },
        },
      }
    },
    methods:{
      getList(){
        this.loading = true
        this.$api.post('shop/getList', {
          page: this.pagination.page,
          listRows: this.pagination.listRows,
          category_id: this.category_id,
          name: this.name,
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
      showExpired(){
        this.type = 1
        this.staffPop = true
      },
      showEdit(id){
        this.editPop = true
        this.id = id
      },
      showStaff(id){
        this.type = 0
        this.staffPop = true
        this.id = id
      },
      showFile(id){
        this.filePop = true
        this.id = id
      },
      exportTable(){
        this.loading = true
        this.$api.post('shop/getList', {
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