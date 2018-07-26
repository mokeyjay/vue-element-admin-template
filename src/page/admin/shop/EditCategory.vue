<template>
  <el-dialog :title="(form.id?'编辑':'新增')+'品类'" :visible.sync="visible">
    <el-form ref="form" :model="form" label-width="80px" v-loading="loading">
      <el-form-item label="ID">
        {{form.id}}
      </el-form-item>
      <el-form-item label="品类名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="save">{{form.id?'保存':'新增'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props:{
      id: Number,
      visible: Boolean,
    },
    data(){
      return {
        loading: false,
        form:{
          id:0,
          title: '',
        }
      }
    },
    methods:{
      get(id){
        if(id == 0){
          this.form = {id:0, title: ''}
          return
        }

        this.loading = true
        this.$api.post('shop/getCategory', { id })
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
        this.$api.post('shop/saveCategory', this.form)
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
      }
    },
  }
</script>

<style scoped>

</style>