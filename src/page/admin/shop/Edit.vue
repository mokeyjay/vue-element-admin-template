<template>
  <el-dialog :title="(form.id?'编辑':'新增')+'店铺'" :visible.sync="visible">
    <el-form ref="form" :model="form" label-width="100px" v-loading="loading">
      <el-form-item label="ID">
        {{form.id}}
      </el-form-item>
      <el-form-item label="品类">
        <CategorySelect v-model="form.category_id"></CategorySelect>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="猫酷ID">
        <el-input v-model="form.mallcoo_id"></el-input>
      </el-form-item>
      <el-form-item label="品牌编号">
        <el-input v-model="form.brand_no"></el-input>
      </el-form-item>
      <el-form-item label="第三方编号">
        <el-input v-model="form.third_no"></el-input>
      </el-form-item>
      <el-form-item label="营业面积">
        <el-input v-model="form.area"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺状态">
        <ObjectSelect v-model="form.status" placeholder="状态" :object="shopStatus"></ObjectSelect>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="save">{{form.id?'保存':'新增'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { shopStatus } from '@/utils/tableFilter'
  import {SHOP_STATUS} from "@/utils/objectList";
  import ObjectSelect from 'page/admin/component/ObjectSelect'
  import CategorySelect from 'page/admin/shop/component/CategorySelect'

  export default {
    components: { ObjectSelect, CategorySelect },
    filters:{ shopStatus },
    props:{
      id: Number,
      visible: Boolean,
    },
    data(){
      return {
        loading: false,
        shopStatus: SHOP_STATUS,
        form:{
          id:0,
          category_id: '',
          name:'',
          mallcoo_id: '',
          brand_no: '',
          third_no:'',
          area:'',
          status:'0',
          contact: '',
          phone:'',
        }
      }
    },
    methods:{
      get(id){
        if(id == 0){
          this.form = {
            id:0,
            category_id: '',
            name:'',
            mallcoo_id: '',
            brand_no: '',
            third_no:'',
            area:'',
            status:'0',
            contact: '',
            phone:'',
          }
          return
        }

        this.loading = true
        this.$api.post('shop/get', { id })
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
        this.$api.post('shop/save', this.form)
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