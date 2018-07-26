<template>
  <el-dialog :title="(form.id?'编辑':'新增')+'员工'" :visible.sync="visible" :modal="false">
    <el-form ref="form" :model="form" label-width="100px" v-loading="loading">
      <el-form-item label="ID">
        {{form.id}}
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.id_number"></el-input>
      </el-form-item>
      <el-form-item label="健康证号">
        <el-input v-model="form.healthcard"></el-input>
      </el-form-item>
      <el-form-item label="健康证有效期">
        <el-date-picker
          v-model="form.healthcard_expire" type="date" placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker
          v-model="form.in_time" type="date" placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="离职时间">
        <el-date-picker
          v-model="form.out_time" type="date" placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="性别">
        <ObjectSelect v-model="form.sex" placeholder="性别" :object="shopStaffSex"></ObjectSelect>
      </el-form-item>
      <el-form-item label="状态">
        <ObjectSelect v-model="form.status" placeholder="状态" :object="shopStaffStatus"></ObjectSelect>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="save">{{form.id?'保存':'新增'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { SHOP_STAFF_SEX, SHOP_STAFF_STATUS } from "@/utils/objectList";
  import ObjectSelect from 'page/admin/component/ObjectSelect'

  export default {
    components: { ObjectSelect },
    props:{
      id: Number,
      visible: Boolean,
      shopId: Number,
    },
    data(){
      return {
        loading: false,
        shopStaffSex: SHOP_STAFF_SEX,
        shopStaffStatus: SHOP_STAFF_STATUS,
        form:{
          id:0,
          shop_id: this.shopId,
          name:'',
          phone:'',
          id_number:'',
          healthcard:'',
          healthcard_expire:'',
          position:'',
          in_time:'',
          out_time:'',
          sex:'0',
          status:'0',
        }
      }
    },
    methods:{
      get(id){
        if(id == 0){
          this.form = {
            id:0,
            shop_id: this.shopId,
            name:'',
            phone:'',
            id_number:'',
            healthcard:'',
            healthcard_expire:'',
            position:'',
            in_time:'',
            out_time:'',
            sex:'0',
            status:'0',
          }
          return
        }

        this.loading = true
        this.$api.post('shop/getStaff', { id })
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
        this.$api.post('shop/saveStaff', this.form)
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