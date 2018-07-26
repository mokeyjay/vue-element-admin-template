<template>
  <el-dialog :title="(form.id?'编辑':'新增')+'信息类型'" :visible.sync="visible">
    <el-form ref="form" :model="form" label-width="100px" v-loading="loading">
      <el-form-item label="ID">
        {{form.id}}
      </el-form-item>
      <el-form-item label="父类型">
        <ParentCategorySelect v-model="form.parent_id"></ParentCategorySelect>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.title"></el-input>
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
  import { NOTIFY_CATEGORY_STATUS } from "@/utils/objectList";
  import ObjectSelect from 'page/admin/component/ObjectSelect'
  import ParentCategorySelect from 'page/admin/notify/component/ParentCategorySelect'

  export default {
    components: { ObjectSelect, ParentCategorySelect },
    props:{
      id: Number,
      visible: Boolean,
    },
    data(){
      return {
        loading: false,
        notifyStatus: NOTIFY_CATEGORY_STATUS,
        form:{
          id:0,
          parent_id:null,
          title:'',
          status:'0',
        }
      }
    },
    methods:{
      get(id){
        if(id == 0){
          this.form = {
            id:0,
            parent_id:null,
            title:'',
            status:'0',
          }
          return
        }

        this.loading = true
        this.$api.post('notify/getCategory', { id })
          .then(data => {
            this.form = data
          })
          .finally(()=>{
            this.loading = false
          })
      },
      save(){
        if(this.loading) return

        this.loading = true
        this.$api.post('notify/saveCategory', this.form)
          .then(()=>{
            this.$emit('refresh')
            this.visible = false
            this.$emit('update:visible', this.visible) // 不知为何这里非得手动触发一下，否则无效
          })
          .finally(()=>{
            this.loading = false
          })
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