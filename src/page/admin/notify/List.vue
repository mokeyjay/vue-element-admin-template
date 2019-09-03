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

  export default {
    name: '/notify/list',
    components: { Pagination, Edit, ObjectSelect, CategorySelect },
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

        mockData: {"errCode":0,"errMsg":"","result":{"total":21,"per_page":20,"current_page":1,"last_page":2,"data":[{"id":23,"category_parent_id":1,"category_id":4,"title":"点击【新增】或【编辑】按钮查看 UEditor 组件","create_time":"2019-05-17 09:41:20","showtime_start":"2019-02-01 00:00:00","showtime_end":"2019-12-31 00:00:00","create_user":93,"status":0,"parent_category":"提示","category":"提示","creater":"作者"},{"id":23,"category_parent_id":1,"category_id":4,"title":"长XXX应知应会精简版","create_time":"2019-05-17 09:41:20","showtime_start":"2019-02-01 00:00:00","showtime_end":"2019-12-31 00:00:00","create_user":93,"status":0,"parent_category":"通知","category":"通知","creater":"潘虹"},{"id":22,"category_parent_id":1,"category_id":4,"title":"长XXX应知应会百道问答","create_time":"2019-03-03 15:35:17","showtime_start":"2019-03-01 00:00:00","showtime_end":"2019-03-31 00:00:00","create_user":4,"status":0,"parent_category":"通知","category":"通知","creater":"管理员"},{"id":21,"category_parent_id":1,"category_id":4,"title":"生活方式品牌分布","create_time":"2019-02-25 16:41:27","showtime_start":"2019-02-25 00:00:00","showtime_end":"2019-03-31 00:00:00","create_user":4,"status":0,"parent_category":"通知","category":"通知","creater":"管理员"},{"id":20,"category_parent_id":2,"category_id":5,"title":"停车政策对客现场话术","create_time":"2019-01-17 18:19:19","showtime_start":"2019-01-01 00:00:00","showtime_end":"2020-02-13 00:00:00","create_user":93,"status":0,"parent_category":"管理规定","category":"规定","creater":"潘虹"},{"id":19,"category_parent_id":2,"category_id":5,"title":"2019年生活方式停车方案","create_time":"2019-01-08 18:07:48","showtime_start":"2019-01-01 00:00:00","showtime_end":"2020-02-14 00:00:00","create_user":93,"status":0,"parent_category":"管理规定","category":"规定","creater":"潘虹"},{"id":18,"category_parent_id":3,"category_id":6,"title":"2019年积分当饭吃活动邀请","create_time":"2019-01-08 17:42:33","showtime_start":"2019-01-01 00:00:00","showtime_end":"2019-01-31 00:00:00","create_user":4,"status":0,"parent_category":"资料上传","category":"资料","creater":"管理员"},{"id":17,"category_parent_id":1,"category_id":8,"title":"整改1","create_time":"2019-01-08 17:40:51","showtime_start":"2019-01-01 00:00:00","showtime_end":"2019-01-31 00:00:00","create_user":4,"status":0,"parent_category":"通知","category":"整改","creater":"管理员"},{"id":16,"category_parent_id":3,"category_id":6,"title":"测试资料上传2","create_time":"2018-11-02 23:47:10","showtime_start":"2019-01-20 00:00:00","showtime_end":"2019-01-21 00:00:00","create_user":4,"status":0,"parent_category":"资料上传","category":"资料","creater":"管理员"},{"id":15,"category_parent_id":3,"category_id":6,"title":"测试资料上传","create_time":"2018-11-01 11:25:04","showtime_start":"2018-11-01 00:00:00","showtime_end":"2018-12-05 00:00:00","create_user":4,"status":0,"parent_category":"资料上传","category":"资料","creater":"管理员"},{"id":14,"category_parent_id":1,"category_id":8,"title":"测试","create_time":"2018-07-24 16:15:15","showtime_start":"2018-07-24 00:00:00","showtime_end":"2018-07-25 00:00:00","create_user":4,"status":1,"parent_category":"通知","category":"整改","creater":"管理员"},{"id":13,"category_parent_id":1,"category_id":7,"title":"物业","create_time":"2018-07-24 15:19:13","showtime_start":"2018-07-01 00:00:00","showtime_end":"2018-07-23 00:00:00","create_user":4,"status":1,"parent_category":"通知","category":"物业","creater":"管理员"},{"id":12,"category_parent_id":1,"category_id":8,"title":"整改","create_time":"2018-07-24 14:23:30","showtime_start":"2018-07-24 00:00:00","showtime_end":"2018-08-26 00:00:00","create_user":4,"status":1,"parent_category":"通知","category":"整改","creater":"管理员"},{"id":11,"category_parent_id":1,"category_id":7,"title":"物业费缴纳通知","create_time":"2018-07-23 10:07:48","showtime_start":"2018-07-01 00:00:00","showtime_end":"2018-08-31 23:59:59","create_user":4,"status":1,"parent_category":"通知","category":"物业","creater":"管理员"},{"id":10,"category_parent_id":2,"category_id":5,"title":"测试","create_time":"2018-07-15 18:18:58","showtime_start":"2018-07-15 00:00:00","showtime_end":"2018-07-16 00:00:00","create_user":4,"status":1,"parent_category":"管理规定","category":"规定","creater":"管理员"},{"id":9,"category_parent_id":1,"category_id":7,"title":"系统测试","create_time":"2018-07-15 17:20:15","showtime_start":"2018-07-15 00:00:00","showtime_end":"2018-07-16 00:00:00","create_user":4,"status":0,"parent_category":"通知","category":"物业","creater":"管理员"},{"id":8,"category_parent_id":3,"category_id":6,"title":"营业执照上传","create_time":"2018-07-02 04:21:15","showtime_start":"2018-07-01 00:00:00","showtime_end":"2018-08-30 00:00:00","create_user":4,"status":0,"parent_category":"资料上传","category":"资料","creater":"管理员"},{"id":7,"category_parent_id":1,"category_id":4,"title":"测试通知2","create_time":"2018-06-18 23:06:46","showtime_start":"2018-06-18 00:00:00","showtime_end":"2018-07-18 00:00:00","create_user":4,"status":0,"parent_category":"通知","category":"通知","creater":"管理员"},{"id":6,"category_parent_id":1,"category_id":4,"title":"测试通知2","create_time":"2018-06-18 23:05:07","showtime_start":"2018-06-18 00:00:00","showtime_end":"2018-07-18 00:00:00","create_user":4,"status":1,"parent_category":"通知","category":"通知","creater":"管理员"},{"id":5,"category_parent_id":1,"category_id":4,"title":"测试通知","create_time":"2018-06-18 23:04:50","showtime_start":"2018-06-18 00:00:00","showtime_end":"2018-07-18 00:00:00","create_user":4,"status":0,"parent_category":"通知","category":"通知","creater":"管理员"},{"id":4,"category_parent_id":1,"category_id":4,"title":"测试通知","create_time":"2018-06-18 22:58:10","showtime_start":"2018-06-18 00:00:00","showtime_end":"2018-07-18 00:00:00","create_user":4,"status":0,"parent_category":"通知","category":"通知","creater":"管理员"}]},"timestamp":1567521131}
      }
    },
    methods:{
      getList(){
        let data = this.mockData.result
        this.pagination.total = data.total
        this.list = data.data
      },
      search(){
        this.pagination.page = 1
        this.getList()
      },
      showEdit(id){
        this.editPop = true
        this.id = id
      },
      exportTable(){
        let data = this.mockData.result
        this.pagination.total = data.total
        this.list = data.data
        JsonExcel.fields = this.exportFields
        JsonExcel.data = data.data
        JsonExcel.generate()
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
