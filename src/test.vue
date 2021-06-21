<template>
  <div>
    <div class="wrapper">
      <div class="content">
        <li>1231</li>
        <li>1232</li>
        <li>1233</li>
        <li>1234</li>
        <li>1235</li>
        <li>1236</li>
        <li>1237</li>
        <li>1238</li>
        <li>1239</li>
        <li>12310</li>
        <li>12311</li>
        <li>12312</li>
        <li>12313</li>
        <li>12314</li>
        <li>12315</li>
        <li>12316</li>
        <li>12317</li>
        <li>12318</li>
        <li>12319</li>
        <li>12320</li>

      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import {onMounted} from "vue";

export default {
  setup() {
    onMounted(() => {
      BScroll.use(Pullup);
      let d = document.querySelector('.wrapper')

      let bs = new BScroll('.wrapper', {
        probeType:3,
        pullUpLoad:true
      });

      function handle() {
        console.log("pulling")

        bs.finishPullUp();
        bs.refresh();
      };

      bs.on('pullingUp', handle)


    })

    return {}

  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 200px;
  background-color: red;
}

li {
  font-size: 20px
}
</style>

