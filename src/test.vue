<template>
  <div>
    <button @click="inc"> clk</button>
    {{data}}
  </div>
</template>

<script>
import {debounce} from "@/utils/debounce";
import {ref} from "vue";
export default {

  data()
  {
    return {

    }
  },
  created() {

  },
  setup() {
    let data=ref(0);
    let inc=debounce(()=>{data.value++},200);
    return {
      inc,data
    }
  }
}
</script>

<style scoped lang="scss">

</style>