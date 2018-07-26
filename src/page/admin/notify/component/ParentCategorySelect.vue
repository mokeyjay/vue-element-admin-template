<template>
  <ObjectSelect v-loading="loading" v-model="value" placeholder="父类型" :object="object" :clearable="true"></ObjectSelect>
</template>

<script>
  import ObjectSelect from 'page/admin/component/ObjectSelect'

  export default {
    components:{ ObjectSelect },
    data(){
      return {
        loading: false,
        object: [],
      }
    },
    methods:{
      getCategory(){
        this.loading = true
        this.$api.post('notify/getParentCategoryListForSelect')
          .then(data=>{
            this.object = data
          })
          .finally(()=>{
            this.loading = false
          })
      },
    },
    props:{
      value:{
        type: Number,
        default: null
      }
    },
    watch:{
      value(v){
        this.$emit('input', v)
      }
    },
    created(){
      this.getCategory()
    }
  }
</script>

<style scoped>

</style>