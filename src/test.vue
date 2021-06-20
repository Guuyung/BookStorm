<template>
  <div>
    <button @click="c++">btn</button>

    c:{{c}}
    d:{{d}}
  </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  setup()
  {
    let c=ref(0);
    let d=ref(0);
    watch([c,d],()=>{

      console.log("changed");
      console.log(c);
      console.log(d);
    })
    return{d,c}
  }


}
</script>
<style scoped>

</style>