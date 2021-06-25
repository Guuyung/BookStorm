<template>
  <div v-for="item in a">a:{{item.name}}</div>

  <button @click="a[0]++">x</button>
</template>

<script>
import {ref} from "vue";

export default {
  created() {

  },
  setup() {
    let a=ref([] );
    setTimeout(()=>{
      a.value[0]={name:'yang'};
      a.value[1]={name:'co'};

    },2000)
    return{a}
    }
}
</script>

<style scoped lang="scss">

</style>