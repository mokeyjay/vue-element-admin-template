<template>
  <el-dialog :title="(form.id?'编辑':'新增')+'信息'" :visible.sync="visible" width="1000px">
    <el-form ref="form" :model="form" label-width="100px" v-loading="loading">
      <el-form-item label="ID">
        {{form.id}}
      </el-form-item>
      <el-form-item label="类型">
        <CategorySelect v-model="form.category_id"></CategorySelect>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="涉及店铺">
        <el-row>
          <el-col :span="2">
            <el-checkbox v-model="shopAll" border @change="shopAllChange">全部</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="显示时间">
        <el-date-picker v-model="form.showtime" type="datetimerange" unlink-panels
                        range-separator="至" start-placeholder="开始" end-placeholder="结束"
                        value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.need_confirm" :true-label="1" :false-label="0">需要确认阅读</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.need_join" :true-label="1" :false-label="0">需要确认参与</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.can_upload" :true-label="1" :false-label="0">允许上传</el-checkbox>
      </el-form-item>
      <el-form-item label="内容">
        <vue-ueditor-wrap @ready="ueditorReady" v-model="form.content"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item label="状态">
        <ObjectSelect v-model="form.status" placeholder="状态" :object="notifyStatus"></ObjectSelect>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="save">{{form.id?'保存':'新增'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { notifyStatus } from '@/utils/tableFilter'
  import { NOTIFY_STATUS } from "@/utils/objectList";
  import ObjectSelect from 'page/admin/component/ObjectSelect'
  import CategorySelect from 'page/admin/notify/component/CategorySelect'

  export default {
    components: { ObjectSelect, CategorySelect, VueUeditorWrap },
    filters:{ notifyStatus },
    props:{
      id: Number,
      visible: Boolean,
    },
    data(){
      return {
        loading: false,
        notifyStatus: NOTIFY_STATUS,
        form:{
          id:0,
          category_id:'',
          title:'',
          shop_id: [],
          showtime: [],
          need_confirm: 0,
          need_join: 0,
          can_upload: 0,
          content: '',
          file: '',
          status:'0',
        },

        shopAll: false,
        ueditor: null,
      }
    },
    methods:{
      ueditorReady(ue){
        this.ueditor = ue
        this.ueditor.setContent(this.form.content)
      },
      shopAllChange(v){
        this.form.shop_id = v ? ['all'] : []
      },
      get(id){
        if(id == 0){
          this.form = {
            id:0,
            category_id:'',
            title:'',
            shop_id: [],
            showtime: [],
            need_confirm: 0,
            need_join: 0,
            can_upload: 0,
            content: '我是内容详情',
            file: '',
            status:'0',
          }
          return
        }

        if(this.ueditor) this.ueditor.setContent('UEditor编辑器内容')
      },
      save(){
        if(this.loading) return

        this.form.content = this.ueditor.getContent()

        this.loading = true
        console.log('已保存')
        this.loading = false
      }
    },
    watch:{
      visible(v){
        if(v) this.get(this.id)
        this.$emit('update:visible', v)
      },
    },
  }
</script>

<style scoped>

</style>
