<template>
  <div >

{{ageTime}}
  hhd
  </div>
</template>

<script>
import {reactive,ref} from "vue";

export default {
  props:['ageTime'],
  data()
  {
    return {

    }
  },
  setup() {
  let a=ref(11);
  let obj=reactive({name:'yyy',age:18})
  const c=()=>{
    console.log("hiiii")}
  return {a,obj,c}
  }
}
</script>

<style scoped lang="scss">

</style>