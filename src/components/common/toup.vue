<template>
  <div class="toup" @click="toTop" v-show="isshow" ref="toup">
  </div>
</template>

<script>
import emitter from "@/utils/eventBus";
import {onMounted, ref, watch, watchEffect} from "vue";
export default {
  setup()
  {
    let isshow=ref(false);
    const toTop=()=>{
      emitter.emit('toTop');
    }
    emitter.on('onscroll',(p)=>{
      if((-p.y)>1000)
        isshow.value=true;
      else
        isshow.value=false;
    })
    return {
      toTop,
      isshow,


    }
  }
}
</script>

<style scoped lang="scss">
  .toup {
    background: url("~assets/images/arrow-up.png") no-repeat 0 0/45px;
    position: fixed;
    bottom: 78px;
    right: 15px;
    height: 50px;
    width: 50px;
    z-index: 5;
  }
</style>