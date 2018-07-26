<template>
  <el-dialog title="信息详情" :visible.sync="visible" width="1000px">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="name" clearable>
          <template slot="prepend">店铺</template>
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-checkbox v-model="is_confirm" border>确认阅读</el-checkbox>
        <el-checkbox v-model="is_join" border>确认参与</el-checkbox>
        <el-checkbox v-model="is_upload" border>已上传资料</el-checkbox>
      </el-col>
      <el-col :span="6">
        <el-button type="info" plain @click="getList">搜索</el-button>
        <el-button type="primary" plain @click="exportTable">导出</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" stripe border v-loading="loading">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="涉及店铺"></el-table-column>
      <el-table-column prop="is_confirm" label="确认阅读"></el-table-column>
      <el-table-column prop="is_join" label="确认参与"></el-table-column>
      <el-table-column prop="is_upload" label="已上传资料"></el-table-column>
      <el-table-column prop="contact" label="联系人"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import JsonExcel from '@/utils/jsonExcel'

  export default {
    props:{
      id: Number,
      visible: Boolean,
      notifyId: Number
    },
    data(){
      return {
        loading: false,
        list: [],

        id: 0,
        name: '',
        is_confirm: 0,
        is_join: 0,
        is_upload: 0,

        exportFields: {
          'ID': 'id',
          '涉及店铺': 'name',
          '确认阅读': 'is_confirm',
          '确认参与': 'is_join',
          '已上传资料': 'is_upload',
          '联系人': 'contact',
          '联系电话': 'phone',
        },
      }
    },
    methods:{
      getList(){
        this.loading = true
        this.$api.post('notify/getLinkList', {
          notify_id: this.notifyId,
          name: this.name,
          is_confirm: this.is_confirm,
          is_join: this.is_join,
          is_upload: this.is_upload
        })
          .then(data=>{
            this.list = data
          })
          .finally(()=>{
            this.loading = false
          })
      },
      exportTable(){
        this.loading = true
        this.$api.post('notify/getLinkList', {
          notify_id: this.notifyId,
          name: this.name,
          is_confirm: this.is_confirm,
          is_join: this.is_join,
          is_upload: this.is_upload
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