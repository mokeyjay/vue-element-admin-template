<template>
  <el-dialog :title="type?'健康证过期员工列表':'员工列表'" :visible.sync="visible" width="1200px">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="name" clearable>
          <template slot="prepend">姓名</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-date-picker v-model="healthcard_expire" type="daterange" unlink-panels
                        range-separator="至" start-placeholder="健康证" end-placeholder="有效期"
                        format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-if="type==0">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <ObjectSelect v-model="status" placeholder="状态" :object="shopStaffStatus" v-if="type==0"></ObjectSelect>
      </el-col>
      <el-col :span="5">
        <el-button type="info" plain @click="getList">搜索</el-button>
        <el-button type="success" plain v-if="type==0" @click="showEdit(0)">新增</el-button>
        <el-button type="primary" plain @click="exportTable">导出</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" stripe border v-loading="loading">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="shop_name" label="店铺"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="id_number" label="身份证号"></el-table-column>
      <el-table-column prop="healthcard" label="健康证">
        <template slot-scope="scope">
          <a :href="scope.row.healthcard" target="_blank">
            <el-button type="primary" plain><i class="el-icon-search"></i></el-button>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="healthcard_expire" label="健康证有效期"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <el-table-column prop="in_time" label="入职时间"></el-table-column>
      <el-table-column prop="out_time" label="离职时间"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          {{scope.row.sex | shopStaffSex}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{scope.row.status | shopStaffStatus}}
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

    <Edit :id="id" :shop-id="shopId" :visible.sync="editPop" @refresh="getList"></Edit>
  </el-dialog>
</template>

<script>
  import ObjectSelect from 'page/admin/component/ObjectSelect'
  import Edit from 'page/admin/shop/EditStaff'
  import JsonExcel from '@/utils/jsonExcel'
  import { SHOP_STAFF_SEX, SHOP_STAFF_STATUS } from "@/utils/objectList";
  import { shopStaffSex, shopStaffStatus } from '@/utils/tableFilter'

  export default {
    components: { Edit, ObjectSelect },
    filters:{ shopStaffSex, shopStaffStatus },
    props:{
      id: Number,
      visible: Boolean,
      type:{
        type: Number,
        default: 0 // 0=店铺员工列表 1=健康证过期列表
      },
      shopId: Number
    },
    data(){
      return {
        shopStaffSex: SHOP_STAFF_SEX,
        shopStaffStatus: SHOP_STAFF_STATUS,

        loading: false,
        list: [],

        id: 0, // 被编辑的员工id
        name: '',
        healthcard_expire:[],
        status: null,

        editPop: false,

        exportFields: {
          'ID': 'id',
          '姓名': 'name',
          '身份证号': 'id_number',
          '健康证': 'healthcard',
          '健康证有效期': 'healthcard_expire',
          '职位': 'position',
          '入职时间': 'in_time',
          '离职时间': {
            field: 'out_time',
            callback(v){
              return v===null ? '' : v;
            }
          },
          '性别': {
            field: 'sex',
            callback(v){
              return shopStaffSex(v)
            }
          },
          '状态': {
            field: 'status',
            callback(v){
              return shopStaffStatus(v)
            }
          },
        },
      }
    },
    methods:{
      getList(){
        this.loading = true
        this.$api.post('shop/getStaffList', {
          type: this.type,
          shop_id: this.shopId,
          name: this.name,
          healthcard_expire: this.healthcard_expire,
          status: this.status
        })
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
      exportTable(){
        this.loading = true
        this.$api.post('shop/getStaffList', {
          type: this.type,
          shop_id: this.shopId,
          name: this.name,
          healthcard_expire: this.healthcard_expire,
          status: this.status
        })
          .then(data=>{
            JsonExcel.fields = this.exportFields
            JsonExcel.data = data
            JsonExcel.generate()
          })
          .finally(()=>{
            this.loading = false
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