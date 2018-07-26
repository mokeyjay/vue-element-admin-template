<template>
  <ObjectSelect v-loading="loading" v-model="value" placeholder="品类" :multiple="multiple"
                :object="object" :clearable="true"></ObjectSelect>
</template>

<script>
  import ObjectSelect from 'page/admin/component/ObjectSelect'

  export default {
    components:{ ObjectSelect },
    props:{
      value:{
        type: Number,
        default: null
      },
      multiple:{
        type: Boolean,
        default: false
      },
    },
    data(){
      return {
        loading: false,
        object: [],
      }
    },
    methods:{
      getCategory(){
        this.loading = true
        this.$api.post('shop/getCategoryListForSelect')
          .then(data=>{
            this.object = data
          })
          .finally(()=>{
            this.loading = false
          })
      },
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